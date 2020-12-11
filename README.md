# quiz-manager
 
Hello, and welcome to the WebbiSkools Quiz Management Application. This tool was created to ease the creation and distribution of quizzes. Try it today!

If you are viewing this README from an offline archive, consider looking at the online version: https://github.com/mtmars-aexp/quiz-manager

Online, this markdown file has been automatically converted into user-friendly HTML, and my code repository contains a full list of commits (code changes) I have made during this project.

Whether reading this online or offline, please read my development journey located at `Documentation/Development Journey.md` or online [here](https://github.com/mtmars-aexp/quiz-manager/blob/main/Documentation/Development%20Journey.md) for an extensive list of details following the development of this synoptic project.

## Requirements

To run this application you will need the following programs installed on your local machine:

- Python (3.9)
- npm (6.14.8)

## Installation

This program consists of two applications working in tandem, the database endpoint, written in Python and Flask, and the front end user interface, written in React and JavaScript.

### Back End

To run the database application, navigate to the backend directory (`/quiz-manager/quiz-backend/`) and run the following commands in your terminal or command line:
```
python -m pip install -r requirements.txt
```

This will install Flask and Flask-CORS from the internet using the python package manager. 

If you would like to run this components unit tests to ensure everything works, please type:
```
python -m unittest
```

While in the `quiz-backend` directory.

You should now be able to start the application with:

```
python -m flask run
```

### Front end

To install the user interface, make sure the database is running first, then navigate to the frontend directory (`/quiz-manager/quiz-backend/`) and run:

```
npm install
```

To install all required dependencies.

Tests can be ran like on the backend by typing:

```
npm test
```

And pressing "a" to run all available tests.

The application can be started by typing:

```
npm start
```

After a few moments, the application should open in your default web browser of choice.

## Usage

### Start and Logging In

Upon starting the application, you will first be prompted to login. See the pre-entered account details below:

```
Username: "ciel"
Password: "0216"
Permission level: Can create, edit, and take quizzes. Can reveal answers to quiz questions.

Username: "josie"
Password: "0828"
Permission level: Can take quizzes. Can reveal answers to quiz questions.

Username: "chloe"
Password: "7442"
Permission level: Can take quizzes. Cannot reveal answers. Cannot edit or create new quizzes.
```

Please login with a desired permission level and you will be taken to the home page. The home page lists all available quizzes. You can start a quiz by clicking on its name on the top left corner of the grey box.

### Taking A Quiz

The quiz will consist of several boxes each with one to five answers in them. Please click on the button you'd like to choose as your answer.

If you have a permission level of 2 or greater, you may click the "Reveal answer" button to show the correct answer to any question. You can click the button again to hide the answer.

Once you have answered every question, click the `"Count score!"` button at the bottom of the page. You may have to scroll down to see it. Your quiz will then be marked, and the boxes will turn either green or red depending on if you answered correctly or not. A total score will be displayed to the right of the `"Count score!"` button. After your score has been displayed, you can safely return to the home page via your browsers back button or the navigation bar at the top of the page.

### Editing A Quiz

If you have the highest permission level, quizzes on the home page will have an `"edit"` button on the bottom left of the grey selection box. You may click this button to be taken to a quiz editing page. Enter text into the relevant boxes at the top of the page to edit the quizzes name and description. You may edit the question, answers, and correct answer of any question by editing the fields on the page. You may delete questions by clicking the `"delete"` button. Click the `"new question"` button to create another question. It will be automatically added to the end of the quiz.

### Creating A New Quiz

New quizzes can be created by clicking the `"New quiz"` button at the bottom of the home page if you have the highest permission level. A new quiz is identical in function to editing a quiz, though this time without prexisiting data. Enter text into the input fields just like editing a quiz in order to make a new one. You can create new questions, just like in edit mode, by clicking the `"new question"` button.

### Saving Your Changes

Your changes when editing or creating a quiz are not saved automatically. You must click the `"Save changes"` button to save your changes to the system. After you have clicked that button, it will be safe to navigate away from the page.

### Deleting A Quiz

To delete a quiz entirely, please go into edit mode and delete all questions attached to the quiz, then save your changes.