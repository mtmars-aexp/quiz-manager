import sqlite3
import glob
from hashlib import sha256
from logging import getLogger

LOGGER = getLogger("quiz_manager")
db_name = "quiz_manager.sqlite3"

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def extract_filename_from_list(dict_list):
    return dict_list["filename"]

def migrate():

    LOGGER.info("Beginning migration...")

    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Migrations'") # Check if migrations table already exists.
    if cursor.fetchone() is None: # If it doesn't...
        with open("res/CREATE_MIGRATION_TABLE.sql") as create_migration_table: # Create it.
            LOGGER.info("Migration table created.")
            cursor.executescript(create_migration_table.read())
            connection.commit()

    for migration_file in sorted(glob.glob("res/M_*.sql")): # Find all migration files.
        with open(migration_file) as migration_script:
            migration_hash_current = sha256(migration_script.read().encode()).hexdigest()
            migration_hash_saved = cursor.execute("SELECT hash FROM Migrations WHERE filename=:filename", {"filename": migration_file}).fetchone()

            LOGGER.info("---------------------------")
            LOGGER.info(f"Read file: {migration_file}")
            LOGGER.info(f"Current hash: {migration_hash_current}")
            LOGGER.info(f"Hash in database: {migration_hash_saved}")

            if migration_hash_saved is None:
                LOGGER.info("Hash not found in database. Executing script and saving it to migration table.")
                migration_script.seek(0) # Reset IO to start of the file.
                cursor.executescript(migration_script.read())
                cursor.execute("INSERT INTO Migrations VALUES(:filename, :hash);", {'filename': migration_file, 'hash': migration_hash_current})
                connection.commit()
                continue

            # If we've reached this far, then there's definitely a hash in the db.
            migration_hash_saved = migration_hash_saved["hash"]

            if migration_hash_current != migration_hash_saved:
                raise Exception(f"Hash of migration file is not same as known hash. Expected: {migration_hash_saved}, Has: {migration_hash_current}")

    migration_files = list(map(extract_filename_from_list, cursor.execute("SELECT filename FROM Migrations;").fetchall())) # The map file reduces dictionaries to a list of values (rather than a list of key-value pairs.)
    LOGGER.info(f"Migration complete. Migration files: {migration_files}")
    connection.close()

def get_all_quizzes():
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Quizzes;")
    return cursor.fetchall()

def get_all_quiz_questions(quiz_id: int):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Questions WHERE quiz_id = :quiz_id", {'quiz_id': quiz_id})
    return cursor.fetchall()

def get_quiz_info(quiz_id: int):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT name, description FROM Quizzes WHERE quiz_id = :quiz_id", {'quiz_id': quiz_id})
    return cursor.fetchone()

def get_all_question_answers(question_id: int):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT text, is_correct FROM Answers WHERE question_id = :question_id", {'question_id': question_id})
    return cursor.fetchall()

def authenticate_user(username, password_hash):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT privilege_level FROM Users WHERE username = :username AND password = :password_hash", {'username': username, 'password_hash': password_hash})
    return cursor.fetchone()