DROP TABLE Quizzes;
DROP TABLE Questions;
DROP TABLE Answers;

CREATE TABLE Quizzes (
	quiz_id integer PRIMARY KEY AUTOINCREMENT,
	name text NOT NULL,
	description text
);

CREATE TABLE Questions (
	question_id integer PRIMARY KEY AUTOINCREMENT,
	quiz_id integer,
	text text NOT NULL
);

CREATE TABLE Answers (
	answer_id integer PRIMARY KEY AUTOINCREMENT,
	question_id integer,
	text text NOT NULL
);