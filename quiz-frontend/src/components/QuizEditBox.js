import React from 'react';

class QuizEditBox extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            answers: []
        }

        this.handleAnswerBoxChange = this.handleAnswerBoxChange.bind(this)
        this.handleQuestionChange = this.handleQuestionChange.bind(this)
        this.handleQuestionDelete = this.handleQuestionDelete.bind(this)
        this.handleCorrectAnswerChange = this.handleCorrectAnswerChange.bind(this);
    }

    componentDidMount(){
        console.log("Fetching answers for " + this.props.question_id)
        fetch("http://127.0.0.1:5000/api/answers/" + this.props.question_id)
        .then(result => result.json())
        .then(result => {

            for(var i = 0; i < 5; i++){
                if(result[i] == undefined){
                    result[i] = {
                        is_correct: 0,
                        text: "",
                        answer_id: 0,
                        question_id: this.props.question_id
                    }

                if(i == 0 && result[0].text == ""){
                    result[0].text = "Answer."
                }
                
                }
            }

            // Now make sure the first answer is the correct one if there isn't an is_correct yet present
            var is_correct_found = false
            
            result.forEach(result => {if(result.is_correct === 1){
                is_correct_found = true
            }})

            if(!is_correct_found){
                result[0].is_correct = 1
            }

            this.setState({answers: result})
            this.props.handleAnswerChange(this.props.question_id, this.state.answers)
        })
        .catch(err => console.log(err))
    }

    handleAnswerBoxChange(event){
        var answers = this.state.answers
        answers[event.target.name].text = event.target.value
        this.setState({answers: answers})
        this.props.handleAnswerChange(this.props.question_id, this.state.answers)
    }

    handleCorrectAnswerChange(event){
        console.log("ITS HAPPENING")
        this.props.handleCorrectAnswerChange(event.target.id, event.target.value)
    }

    handleQuestionChange(event){
        this.props.handleQuestionChange(event, this.props.question_id)
    }

    handleQuestionDelete(event){
        this.props.handleQuestionDelete(this.props.question_id)
    }

    render(){

        var correct_answer_text = ""
        this.state.answers.forEach(answer => {if(answer.is_correct === 1){correct_answer_text=answer.text}})

        return(
            <div className="quiz-box">
                Question: <input name={this.props.question_id} value={this.props.text} onChange={this.handleQuestionChange}/>
                {this.state.answers.map((element, index) => <div> <input name={index} onChange={this.handleAnswerBoxChange} value={element.text}/><br/></div>)}
                <a href = '#' onClick={this.handleQuestionDelete} className="quiz-edit">Delete</a>
                Correct answer: <select onChange={this.handleCorrectAnswerChange} id={this.props.question_id}>
                    {this.state.answers.filter(answer => answer.text !== "").map((element, index) => <option value={element.text}>{element.text}</option>)}
                </select>
            </div>
        )
    }
}

export default QuizEditBox;