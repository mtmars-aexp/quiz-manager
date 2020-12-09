import React from 'react';
import QuizEditBox from './QuizEditBox'

class QuizEditPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            name: "",
            description: "",
            questions: [],
            answers: {}
            }

        this.handleQuizDetailsChange = this.handleQuizDetailsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/api/questions/" + this.props.match.params.id)
        .then(result => result.json())
        .then(result => {
            this.setState({...result})
            }
            )
        .catch(err => console.log(err))
    }

    handleAnswerChange(question_id, answers){
        console.log("QuizPage has received a change in answers for question " + question_id)
        var updated_answers = this.state.answers
        updated_answers[question_id] = answers
        this.setState({answers: updated_answers})
    }

    handleQuizDetailsChange(event){
        console.log(event.target.name + ": " + event.target.value)
        var quiz_info = this.state
        quiz_info[event.target.name] = event.target.value;
        this.setState({...quiz_info})
    }

    handleQuestionChange(event, question_id){
        console.log(event.target.name + " new question: " + event.target.value)
        this.state.questions.forEach(question => {
            if(question.question_id === question_id){
                question.text = event.target.value
                this.setState(this.state)
            }
        })
    }

    handleSubmit(event){
        console.log("Handling change submit!");
        console.log(JSON.stringify(this.state));
        fetch("http://127.0.0.1:5000/api/quizzes/" + this.props.match.params.id, {method: 'PUT', body: JSON.stringify(this.state), header:{'content-type': 'application/json'}})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    render(){

        console.log("QuizEditPage state:")
        console.log(this.state)

        return(
            <div className="page">
                <h1>Quiz edit page!</h1>
                Quiz Title:<input name = "name" value={this.state.name} onChange={this.handleQuizDetailsChange}></input><br></br>
                Description:<input name = "description" value={this.state.description} onChange={this.handleQuizDetailsChange}></input><br></br>
                <button onClick={this.handleSubmit}>Save changes.</button>

                {this.state.questions.map((element, index) => <QuizEditBox handleQuestionChange={this.handleQuestionChange} handleAnswerChange={this.handleAnswerChange} key={index} question_id={element.question_id} text={element.text}/>)}
            </div>
        );
    }

}

export default QuizEditPage;