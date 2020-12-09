import sqlite3
import database as db
import flask
from flask import request
from flask_cors import cross_origin, CORS
import logging
import json
from hashlib import sha256

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

@app.route("/api/questions/<quiz_id>", methods = ['GET'])
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

@app.route("/api/auth/", methods = ['POST'])
@cross_origin()
def auth():

    json = request.get_json()

    username = json.get('username')
    password = json.get('password')

    if username is None or password is None:
        return "Login form incomplete", 400

    password_hash = sha256(password.encode()).hexdigest().upper()

    result = db.authenticate_user(username, password_hash)

    if result is None:
        return "Incorrect credentials", 401

    return str(result.get('privilege_level')), 200

@app.route("/api/quizzes/<quiz_id>", methods = ['PUT'])
@cross_origin()
def update_quiz(quiz_id):
    LOGGER.info(f"Updating quiz {quiz_id}")

    json = request.get_json(force=True)

    LOGGER.info(json)

    if json is None:
        return "Something sucks about your request.", 400

    name = json.get('name')
    description = json.get('description')
    questions = json.get('questions')
    answers = json.get('answers')

    LOGGER.info(f"Quiz name is: {name}")
    LOGGER.info(f"Description is: {description}")
    LOGGER.info(f"Questions are: {questions}")
    LOGGER.info(f"Answers are: {answers}")

    db.update_quiz_information(quiz_id, name, description, questions, answers)

    return "LGTM!", 200