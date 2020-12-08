INSERT INTO Quizzes(quiz_id, name, description) VALUES(1, "Alpha quiz!","Beep boop!"), (2, "Beta quiz!","Boop beep?? :O");
INSERT INTO Questions(question_id, quiz_id, text) VALUES(1,1,"Who's a good girl??"), (2,2,"Are you a robot?");
INSERT INTO Answers(answer_id, question_id, text) VALUES(1,1,"Wruff!"),(2,1,"Me me me!!"),(3,2,"Yes!"),(4,2,"Absolutely!");