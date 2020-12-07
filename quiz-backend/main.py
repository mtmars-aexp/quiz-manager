import sqlite3
import database as db
from flask import Flask
import logging
import json

app = Flask(__name__)

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
def home():
    quizzes = db.get_all_quizzes()
    LOGGER.info(quizzes)
    return json.dumps(quizzes)