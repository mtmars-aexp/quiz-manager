import sqlite3
import glob
from hashlib import sha256
from logging import getLogger

LOGGER = getLogger("quiz_manager")

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def extract_filename_from_list(dict_list):
    return dict_list["filename"]

class Database():

    connection = None
    cursor = None
    default_db_name = "quiz_manager.sqlite3"

    def __init__(self, db_name = None):
        if Database.connection is None:
            # Create new connection.
            Database.connection = sqlite3.connect(Database.default_db_name if db_name is None else db_name)
            Database.connection.row_factory = dict_factory # I don't like tuples so this makes it give me dictionaries instead. Much nicer.
            self.connection = Database.connection
        if Database.cursor is None:
            # Create new cursor if none found.
            Database.cursor = Database.connection.cursor()
            self.cursor = Database.cursor

    def migrate(self):

        LOGGER.info("Beginning migration...")

        self.cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Migrations'") # Check if migrations table already exists.
        if self.cursor.fetchone() is None: # If it doesn't...
            with open("res/CREATE_MIGRATION_TABLE.sql") as create_migration_table: # Create it.
                LOGGER.info("Migration table created.")
                self.cursor.executescript(create_migration_table.read())
                self.connection.commit()

        for migration_file in sorted(glob.glob("res/M_*.sql")): # Find all migration files.
            with open(migration_file) as migration_script:
                migration_hash_current = sha256(migration_script.read().encode()).hexdigest()
                migration_hash_saved = self.cursor.execute("SELECT hash FROM Migrations WHERE filename=:filename", {"filename": migration_file}).fetchone()

                LOGGER.info("---------------------------")
                LOGGER.info(f"Read file: {migration_file}")
                LOGGER.info(f"Current hash: {migration_hash_current}")
                LOGGER.info(f"Hash in database: {migration_hash_saved}")

                if migration_hash_saved is None:
                    LOGGER.info("Hash not found in database. Executing script and saving it to migration table.")
                    migration_script.seek(0) # Reset IO to start of the file.
                    self.cursor.executescript(migration_script.read())
                    self.cursor.execute("INSERT INTO Migrations VALUES(:filename, :hash);", {'filename': migration_file, 'hash': migration_hash_current})
                    self.connection.commit()
                    continue

                # If we've reached this far, then there's a in the db.
                migration_hash_saved = migration_hash_saved["hash"]

                if migration_hash_current != migration_hash_saved:
                    raise Exception(f"Hash of migration file is not same as known hash. Expected: {migration_hash_saved}, Has: {migration_hash_current}")

        migration_files = list(map(extract_filename_from_list, self.cursor.execute("SELECT filename FROM Migrations;").fetchall())) # The map file reduces dictionaries to a list of values (rather than a list of key-value pairs.)
        LOGGER.info(f"Migration complete. Migration files: {migration_files}")