import os, json
from flask import Flask, Response

app = Flask(__name__)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    ROOT = 'data'
    DATA = os.path.join(ROOT, 'data.json')
    with open(DATA) as file:
        parsed = json.load(file)
    return parsed