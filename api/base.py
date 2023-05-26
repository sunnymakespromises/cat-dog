import os, json
import numpy as np
from flask import Flask, request
from werkzeug.utils import secure_filename
from PIL import Image
from imageai.Classification.Custom import CustomImageClassification

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/uploads'

@app.route('/getdata')
def main():
    ROOT = 'data'
    DATA = os.path.join(ROOT, 'data.json')
    with open(DATA) as file:
        parsed = json.load(file)
    return parsed

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    response = {'status': True, 'message': '', 'data': None}
    def file_is_allowed(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}
    
    if request.method == 'POST':
        if 'file' not in request.files:
            response['status'] = False
            response['message'] = 'No file uploaded.'
            return response
        file = request.files['file']
        if file.filename == '':
            response['status'] = False
            response['message'] = 'No file uploaded.'
            return response
        if file and file_is_allowed(file.filename):
            filename = secure_filename(file.filename)
            print(filename)
            img = np.array(Image.open(file.stream))
            prediction = CustomImageClassification()
            prediction.setModelTypeAsDenseNet121()
            prediction.setModelPath('data/models/model.pt')
            prediction.setJsonPath('data/models/classes.json')
            prediction.loadModel()
            predictions, probabilities = prediction.classifyImage(img, result_count = 3)
            probabilities_dict = dict(zip(predictions, probabilities))
            category = sorted(probabilities_dict, key = probabilities_dict.get, reverse = True)[0]
            response['data'] = {
                'name': 'your image',
                'probabilities': probabilities_dict,
                'category': category
            }
        return response
    else:
        return response
    

if __name__ == "__main__":
    app.run(debug=True)