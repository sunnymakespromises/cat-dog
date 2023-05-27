import os, shutil
import json
from imageai.Classification.Custom import ClassificationModelTrainer
from imageai.Classification.Custom import CustomImageClassification

ROOT = 'data'
MODELS = os.path.join(ROOT, 'models')
SAMPLES = os.path.join(ROOT, 'samples')
TRAIN = os.path.join(ROOT, 'train')
TEST = os.path.join(ROOT, 'test')
ARCHIVE = os.path.join(ROOT, 'archive')
TRAIN_DOG, TRAIN_CAT, TRAIN_SNAKE = os.path.join(TRAIN, 'dog'), os.path.join(TRAIN, 'cat'), os.path.join(TRAIN, 'snake')
TEST_DOG, TEST_CAT, TEST_SNAKE = os.path.join(TEST, 'dog'), os.path.join(TEST, 'cat'), os.path.join(TEST, 'snake')


if os.path.exists(os.path.join(MODELS, 'model.pt')): # if there is a trained model, get the classification from the sample outputs and output them in a json file
    SAMPLE_LIMIT = 10
    animals = []

    prediction = CustomImageClassification()
    prediction.setModelTypeAsDenseNet121()
    prediction.setModelPath('data/models/model.pt')
    prediction.setJsonPath('data/models/classes.json')
    prediction.loadModel()

    for animal in os.listdir(SAMPLES):
        animal_path = os.path.join(SAMPLES, animal)
        if os.path.isdir(animal_path):
            dog_probs = []
            cat_probs = []
            snake_probs = []
            for image in os.listdir(animal_path)[:SAMPLE_LIMIT]:
                predictions, probabilities = prediction.classifyImage(os.path.join(animal_path, image), result_count = 3)
                probabilities_dict = dict(zip(predictions, probabilities))
                dog_probs.append(probabilities_dict['dog'])
                cat_probs.append(probabilities_dict['cat'])
                snake_probs.append(probabilities_dict['snake'])
            probabilities = {
                'dog': sum(dog_probs) / len(dog_probs),
                'cat': sum(cat_probs) / len(cat_probs),
                'snake': sum(snake_probs) / len(snake_probs)
            }
            obj = {
                'name': animal,
                'probabilities': probabilities,
                'category': sorted(probabilities, key = probabilities.get, reverse = True)[0]
            }
            print(obj)
            animals.append(obj)
    with open(os.path.join(ROOT, 'data.json'), 'w') as file:
        json.dump(animals, file)

else: # if no model exists, train the model.
    model_trainer = ClassificationModelTrainer() # creates a new ClassificationModelTrainer instance
    model_trainer.setModelTypeAsDenseNet121() # sets the model type to MobileNetV2
    model_trainer.setDataDirectory(ROOT) # sets the directory for the data to ROOT
    model_trainer.trainModel(num_experiments = 100, batch_size = 32) # trains the model for 10 epochs in batches of 32