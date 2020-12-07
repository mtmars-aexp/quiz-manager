CREATE TABLE Quizzes (
	quiz_id integer PRIMARY KEY,
	name text NOT NULL,
	description text
);

CREATE TABLE Questions (
	question_id integer PRIMARY KEY,
	quiz_id integer,
	text text NOT NULL
);

CREATE TABLE Answers (
	answer_id integer PRIMARY KEY,
	question_id integer,
	text text NOT NULL
);