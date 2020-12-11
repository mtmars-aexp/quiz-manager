DELETE FROM Quizzes;
DELETE FROM Questions;
DELETE FROM Answers;

INSERT INTO Quizzes(quiz_id, name, description) VALUES
(1, "The dog quiz!", "This is a quiz for dog lovers of all kinds.");

INSERT INTO Questions(quiz_id, question_id, text) VALUES
(1, 1, "Where are a dog's sweat glands located?"),
(1, 2, "What breed is Scooby Doo?"),
(1, 3, "Which dog breed has a black tongue?"),
(1, 4, "Which human organ do dogs lack?"),
(1, 5, "Which dog's name translates to 'dwarf dog?'");

INSERT INTO Answers(question_id, text, is_correct) VALUES
(1,"Tail",0),
(1,"Paws",1),
(1,"Nose",0),
(1,"Neck",0),
(2,"Dalmation",0),
(2,"German Shepherd",0),
(2,"Great Dane",1),
(2,"Airedale Terrier",0),
(3,"Bloodhound",0),
(3,"Rat Terrier",0),
(3,"Chow chow",1),
(4,"Appendix",1),
(4,"Pancreas",0),
(5,"Mastiff",0),
(5,"Corgi",1),
(5,"Chiuahua",0),
(5,"Dachshund",0),
(5,"Pomeranian",0);

