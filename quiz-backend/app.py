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

@app.route("/api/quizzes")
@cross_origin()
def home():
    response = flask.jsonify(db.get_all_quizzes())
    return response

@app.route("/api/questions/<quiz_id>")
@cross_origin()
def quiz(quiz_id):
    quiz_info = db.get_quiz_info(quiz_id)
    response = flask.jsonify({'questions': db.get_all_quiz_questions(quiz_id), 'name': quiz_info['name'], 'description': quiz_info['description']})
    return response

@app.route("/api/answers/<question_id>")
@cross_origin()
def answers(question_id):
    response = flask.jsonify(db.get_all_question_answers(question_id))
    return response