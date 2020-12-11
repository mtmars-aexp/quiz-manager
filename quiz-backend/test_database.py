import unittest
from unittest.mock import Mock, patch
import database

class TestDatabase(unittest.TestCase):

    @patch("database.get_cursor")
    def test_get_all_quizzes(self, get_cursor):

        expected = {"quiz_id": 1, "name": "Test quiz!", "description": "Beep boop!"}

        mockedCursor = Mock()
        mockedCursor.fetchall.return_value = expected
        get_cursor.return_value = mockedCursor

        self.assertEqual(database.get_all_quizzes(), expected)

    @patch("database.get_cursor")
    def test_get_all_quiz_questions(self, get_cursor):

        expected = [{'question_id': 1, 'text': 'Who is a good puppie?'}, {'question_id': 2, 'text': 'Is it you?'}]
        mockedCursor = Mock()
        mockedCursor.fetchall.return_value = expected
        get_cursor.return_value = mockedCursor

        self.assertEqual(database.get_all_quiz_questions(1), expected)

    @patch("database.get_cursor")
    def test_get_quiz_info(self, get_cursor):

        expected = {'name': 'The best quiz ever', 'description': 'This quiz is about bees.'}
        mockedCursor = Mock()
        mockedCursor.fetchone.return_value = expected
        get_cursor.return_value = mockedCursor

        self.assertEqual(database.get_quiz_info(1), expected)

    @patch("database.get_cursor")
    def test_get_highest_question_id(self, get_cursor):

        expected = {'question_id': 216}
        mockedCursor = Mock()
        mockedCursor.fetchone.return_value = expected
        get_cursor.return_value = mockedCursor

        self.assertEqual(database.get_highest_question_id(), expected)

    @patch("database.get_cursor")
    def test_question_already_exists_when_true(self, get_cursor):

        expected = {'question_id', 216}
        mockedCursor = Mock()
        mockedCursor.fetchone.return_value = expected
        get_cursor.return_value = mockedCursor

        self.assertEqual(database.question_already_exists(216), True)

    @patch("database.get_cursor")
    def test_question_already_exists_when_false(self, get_cursor):

        expected = None
        mockedCursor = Mock()
        mockedCursor.fetchone.return_value = expected
        get_cursor.return_value = mockedCursor

        self.assertEqual(database.question_already_exists(216), False)

    # @patch("database.get_cursor")
    # def test_(self, get_cursor):

    #     expected = {}
    #     mockedCursor = Mock()
    #     mockedCursor.fetchall.return_value = expected
    #     get_cursor.return_value = mockedCursor

    #     self.assertEqual(database.(), expected)




        