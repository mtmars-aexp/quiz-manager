import React from 'react';

class QuizEditBox extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            answers: []
        }

        this.handleAnswerBoxChange = this.handleAnswerBoxChange.bind(this)
        this.handleQuestionChange = this.handleQuestionChange.bind(this)
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/api/answers/" + this.props.question_id)
        .then(result => result.json())
        .then(result => {

            for(var i = 0; i < 5; i++){
                if(result[i] == undefined){
                    result[i] = {
                        is_correct: 0,
                        text: "",
                        answer_id: 0,
                        question_id: 0
                    }
                }
            }
            this.setState({answers: result})
        })
        .catch(err => console.log(err))
    }

    handleAnswerBoxChange(event){
        console.log("Changing text in box: " + event.target + ": " + event.target.value)
        var answers = this.state.answers
        answers[event.target.name].text = event.target.value
        this.setState({answers: answers})
        console.log("About to send answer change to parent.")
        console.log(this.state.answers)
        this.props.handleAnswerChange(this.props.question_id, this.state.answers)
    }

    handleCorrectAnswerChange(event){

    }

    handleQuestionChange(event){
        this.props.handleQuestionChange(event, this.props.question_id)
    }

    render(){
        return(
            <div className="quiz-box">
                Question: <input name={this.props.question_id} value={this.props.text} onChange={this.handleQuestionChange}/>
                {this.state.answers.map((element, index) => <div> <input name={index} onChange={this.handleAnswerBoxChange} value={element.text}/><br/></div>)}
            </div>
        )
    }
}

export default QuizEditBox;