# quiz-manager
 
Hello, and welcome to the WebbiSkools Quiz Management Application. This tool was created to ease the creation and distribution of quizzes. Try it today!

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
Permission level: Can take quizzes. Cannot view answers. Cannot edit or create new quizzes.
```

Please login with a desired permission level and you will be taken to the home page. The home page lists all available quizzes. You can start a quiz by clicking on its name on the top left corner of the box.

### Taking A Quiz

