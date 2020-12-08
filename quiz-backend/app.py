import sqlite3
import database as db
import flask
from flask_cors import cross_origin, CORS
import logging
import json

app = flask.Flask(__name__)
CORS(app)

LOGGER = logging.getLogger('quiz_manager')
formatter = logging.Formatter(fmt='%(asctime)s.%(msecs)03d :: %(levelname)s :: %(message)s', datefmt='%Y-%m-%d :: %H:%M:%S')
ch = logging.StreamHandler()
ch.setFormatter(formatter)
fh = logging.FileHandler('quiz_manager_logs.txt')
fh.setFormatter(formatter)
LOGGER.addHandler(fh)
LOGGER.addHandler(ch)
LOGGER.setLevel(logging.INFO)

db.migrate()

@app.route("/")
@cross_origin()
def home():
    response = flask.jsonify(db.get_all_quizzes())
    return response