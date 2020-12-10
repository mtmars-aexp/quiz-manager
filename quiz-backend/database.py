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
    cursor.execute("SELECT * FROM Quizzes ORDER BY quiz_id ASC;")
    return cursor.fetchall()

def get_all_quiz_questions(quiz_id: int):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Questions WHERE quiz_id = :quiz_id ORDER BY quiz_id ASC", {'quiz_id': quiz_id})
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
    cursor.execute("SELECT text, is_correct, answer_id, question_id FROM Answers WHERE question_id = :question_id ORDER BY answer_id ASC", {'question_id': question_id})
    return cursor.fetchall()

def authenticate_user(username, password_hash):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT privilege_level FROM Users WHERE username = :username AND password = :password_hash", {'username': username, 'password_hash': password_hash})
    return cursor.fetchone()

def update_quiz_information(quiz_id, name, description, questions, answers, deleted_questions):
    connection = sqlite3.connect(db_name)
    cursor = connection.cursor()
    cursor.execute("UPDATE Quizzes SET name = :name, description = :description WHERE quiz_id = :quiz_id", {'quiz_id': quiz_id, 'name': name, 'description': description})

    if len(questions) == 0:
        LOGGER.info("NO QUESTIONS ATTACHED TO QUIZ. DELETING QUIZ AND RETURNING EARLY.")
        cursor.execute("DELETE FROM Quizzes WHERE quiz_id = :quiz_id", {'quiz_id': quiz_id}) # Delete the quiz.
        for question in get_all_quiz_questions(quiz_id): # Then delete all questions associated with the quiz.
            for answer in get_all_question_answers(question.get('question_id')): # Then delete all answers associated with those questions.
                cursor.execute("DELETE FROM Answers WHERE answer_id = :answer_id", {'answer_id': answer.get('answer_id')})
            cursor.execute("DELETE FROM Questions WHERE question_id = :question_id", {'question_id': question.get('question_id')})

        connection.commit()
        connection.close()
        return

    for deleted_question_id in deleted_questions:
        LOGGER.info(f"Deleting question {deleted_question_id} from database.")
        cursor.execute("DELETE FROM Questions WHERE question_id = :question_id", {'question_id': deleted_question_id})

    for question_id, answerset in answers.items():
        LOGGER.info(f"New answers for question ID: {question_id}")
        for answer in answerset:
            if answer.get("answer_id") == 0 and answer.get("text") == "":
                LOGGER.info("Ignoring padding object.")
            elif answer.get("answer_id") == 0 and answer.get("text") != "":
                LOGGER.info(f"New answer found. Adding to database. Text: {answer.get('text')}")
                cursor.execute("INSERT INTO Answers(question_id, text, is_correct) VALUES(:question_id, :text, :is_correct);", {'question_id': question_id, 'text': answer.get('text'), 'is_correct': answer.get('is_correct')})
            elif answer.get("answer_id") != 0 and answer.get("text") == "":
                LOGGER.info(f"Answer deleted in frontend. Deleting in backend. ID: {answer.get('answer_id')}")
                cursor.execute("DELETE FROM Answers WHERE answer_id = :answer_id", {'answer_id': answer.get('answer_id')})
            elif answer.get("answer_id") != 0 and answer.get("text") != "":
                LOGGER.info(f"Valid answer provided. Updating in backend. Text: {answer.get('text')}")
                cursor.execute("UPDATE Answers SET text = :text, is_correct = :is_correct WHERE answer_id = :answer_id", {'text': answer.get("text"), 'answer_id': answer.get('answer_id'), 'is_correct': answer.get('is_correct')})

    for question in questions:
        if not question_already_exists(question.get('question_id')) and question.get("text") != "":
            LOGGER.info(f"New question created in frontend. Inserting into database.")
            cursor.execute("INSERT INTO Questions(quiz_id, text) VALUES(:quiz_id, :text);", {'quiz_id': quiz_id, 'text': question.get('text')})
            LOGGER.info("Answers found for question:")
            answerset = (answers[str(question.get('question_id'))])
            LOGGER.info(answerset)
        elif question.get('question_id') != 0 and question.get('text') != "":
            LOGGER.info(f"Updating question ID {question.get('question_id')} with text {question.get('text')}")
            cursor.execute("UPDATE Questions SET text = :text WHERE question_id = :question_id", {'text': question.get('text'), 'question_id': question.get('question_id')})
        elif question.get('question_id') != 0 and question.get('text') == "":
            LOGGER.info(f"No text found for question ID {question.get('question_id')} Deleting it and associated answers.")
            cursor.execute("DELETE FROM Questions WHERE question_id = :question_id", {'question_id': question.get('question_id')})
            cursor.execute("DELETE FROM Answers WHERE question_id = :question_id", {'question_id': question.get('question_id')})
        else:
            LOGGER.info("Unexpected behaviour I forgot to account for.")

    connection.commit()

def question_already_exists(question_id):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT question_id FROM Questions WHERE question_id = :question_id;", {'question_id': question_id})
    return cursor.fetchone() is not None

def get_highest_question_id():
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()
    cursor.execute("SELECT question_id FROM Questions ORDER BY question_id DESC LIMIT 1;")
    return cursor.fetchone()

def add_quiz(name, description, questions, answers):
    connection = sqlite3.connect(db_name)
    connection.row_factory = dict_factory
    cursor = connection.cursor()

    cursor.execute("INSERT INTO Quizzes(name, description) VALUES(:name, :description)", {'name': name, 'description': description})

    new_quiz_id = cursor.execute("SELECT quiz_id from Quizzes ORDER BY quiz_id DESC LIMIT 1;").fetchone()["quiz_id"]

    LOGGER.info(f"New quiz ID: {new_quiz_id}")

    for question in questions:
        LOGGER.info(f"Inserting question {question.get('question_id')}: {question.get('text')}")
        cursor.execute("INSERT INTO Questions(quiz_id, text) VALUES(:quiz_id, :text)", {'quiz_id': new_quiz_id, 'text': question.get('text')})
        for question_id, answerset in answers.items():
            #LOGGER.info(f"Iterating over answersets. Current answerset: {answerset}")
            for answer in answerset:
                if answer.get('text') == "": continue
                if answer.get('question_id') != question.get('question_id'): continue
                LOGGER.info(f"Inserting answer for question {question.get('question_id')}: {answer.get('text')}")
                cursor.execute("INSERT INTO Answers(question_id, text, is_correct) VALUES(:question_id, :text, :is_correct)", {'question_id': question.get('question_id'), 'text': answer.get('text'), 'is_correct': answer.get('is_correct')})

    LOGGER.info("New quiz created.")

    connection.commit()