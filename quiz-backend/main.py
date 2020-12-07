import sqlite3
from database import Database
from flask import Flask
import logging

app = Flask(__name__)

logger = logging.getLogger('quiz_manager')
formatter = logging.Formatter(fmt='%(asctime)s.%(msecs)03d :: %(levelname)s :: %(message)s', datefmt='%Y-%m-%d :: %H:%M:%S')
ch = logging.StreamHandler()
ch.setFormatter(formatter)
fh = logging.FileHandler('quiz_manager_logs.txt')
fh.setFormatter(formatter)
logger.addHandler(fh)
logger.addHandler(ch)
logger.setLevel(logging.INFO)

db = Database()
db.migrate()

@app.route("/")
def hello():
    return "Hello, world!"