import React from 'react';
import QuizEditBox from './QuizEditBox'

class QuizEditPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            name: "",
            description: "",
            questions: [],
            answers: {},
            deleted_questions: [],
            highest_known_question_id: 0
            }

        this.handleQuizDetailsChange = this.handleQuizDetailsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.handleCorrectAnswerChange = this.handleCorrectAnswerChange.bind(this);
    }

    componentDidMount(){
        if(this.props.mode === "edit"){
            fetch("http://127.0.0.1:5000/api/questions/" + this.props.match.params.id)
            .then(result => result.json())
            .then(result => {
                this.setState({...result})
                }
                )
            .catch(err => console.log(err))
        } else {
            this.setState({name: "New quiz."})
        }
    }

    handleAnswerChange(question_id, answers){
        var updated_answers = this.state.answers
        updated_answers[question_id] = answers
        this.setState({answers: updated_answers})
    }

    handleQuizDetailsChange(event){
        var quiz_info = this.state
        quiz_info[event.target.name] = event.target.value;
        this.setState({...quiz_info})
    }

    handleQuestionDelete(question_id){
        this.setState({questions: this.state.questions.filter(question => question.question_id !== question_id)})
        var deleted_questions = this.state.deleted_questions;
        deleted_questions.push(question_id)
        this.setState({deleted_questions: deleted_questions})
    }

    handleQuestionChange(event, question_id){
        this.state.questions.forEach(question => {
            if(question.question_id === question_id){
                question.text = event.target.value
                this.setState(this.state)
            }
        })
    }

    handleCorrectAnswerChange(updated_question_id, new_correct_answer_text){
        this.state.answers[updated_question_id].forEach(answer => {answer.is_correct = 0; if(answer.text === new_correct_answer_text){ answer.is_correct = 1;}})
        console.log(this.state.answers[updated_question_id])
    }

    handleSubmit(event){
        console.log("Submitting state to database.")
        console.log(this.state)
        if(this.props.mode === "edit"){
        fetch("http://127.0.0.1:5000/api/quizzes/" + this.props.match.params.id, {method: 'PUT', body: JSON.stringify(this.state), header:{'content-type': 'application/json'}})
        .catch(err => console.log(err))
        } else {
            fetch("http://127.0.0.1:5000/api/quizzes", {method: 'POST', body: JSON.stringify(this.state), header:{'content-type': 'application/json'}})
        }
    }

    handleNewQuestion(){
        var new_question = {
            question_id: 0,
            text: ""
        }

        if(this.state.highest_known_question_id === 0){
            console.log("Getting highest known ID.")
            fetch("http://127.0.0.1:5000/api/questions/highest")
            .then(result => result.text())
            .then(result => {
                var highest_known_question_id = parseInt(result) + 1
                this.setState({highest_known_question_id: highest_known_question_id})
                new_question.question_id = this.state.highest_known_question_id
                var questions = this.state.questions
                questions.push(new_question)
                this.setState({questions: questions})
                console.log("New question added from within async fetch. ID is " + new_question.question_id + ". Printing questions:")
                console.log(this.state.questions)
            })
            .catch(err => console.log(err))
        } else {
            console.log("Highest known ID already known.")
            console.log(this.state.highest_known_question_id)
            console.log("Incrementing by one.")
            console.log("Before:")
            console.log(this.state.highest_known_question_id)
            console.log("After:")
            console.log(this.state.highest_known_question_id + 1)
            var highest_known_question_id = this.state.highest_known_question_id + 1
            console.log(highest_known_question_id)
            new_question.question_id = highest_known_question_id;
            var questions = this.state.questions
            questions.push(new_question)
            this.setState({questions: questions})
            this.setState({highest_known_question_id: new_question.question_id})
            console.log("New question added. New ID is " + new_question.question_id + ". Printing questions:")
            console.log(this.state.questions)
        }

    }

    render(){
        return(
            <div className="page">
                <h1>Quiz edit page!</h1>
                Quiz Title:<input name = "name" value={this.state.name} onChange={this.handleQuizDetailsChange}></input><br></br>
                Description:<input name = "description" value={this.state.description} onChange={this.handleQuizDetailsChange}></input><br></br>
                <button onClick={this.handleSubmit}>Save changes.</button>

                {this.state.questions.map((element, index) => <QuizEditBox handleCorrectAnswerChange = {this.handleCorrectAnswerChange} handleQuestionDelete = {this.handleQuestionDelete} handleQuestionChange={this.handleQuestionChange} handleAnswerChange={this.handleAnswerChange} key={index} question_id={element.question_id} text={element.text}/>)}

                <button onClick={this.handleNewQuestion}>New question.</button>

            </div>
        );
    }

}

export default QuizEditPage;