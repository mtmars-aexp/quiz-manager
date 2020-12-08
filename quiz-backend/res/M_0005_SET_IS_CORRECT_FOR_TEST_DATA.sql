UPDATE Answers SET is_correct = 0;
UPDATE Answers SET is_correct = 1 WHERE answer_id = 1 OR answer_id = 3;