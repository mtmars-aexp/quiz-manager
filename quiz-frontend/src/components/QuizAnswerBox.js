import React from 'react';

class QuizAnswerBox extends React.Component{

    constructor(props){
        super(props)

        this.state = ({
            answers: [],
            selected_answer_correct: "0"
        })

        this.onButtonClick = this.onButtonClick.bind(this);
        this.toggleAnswerVisibility = this.toggleAnswerVisibility.bind(this);
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/api/answers/" + this.props.question_id)
        .then(result => result.json())
        .then(result => this.setState({answers: result}))
        .catch(err => console.log(err))
    }

    onButtonClick(event){
        this.props.updateQuizAnswer(event.target.name, event.target.value)
        this.setState({selected_answer_correct: event.target.value})
    }

    toggleAnswerVisibility(event){
        var answer = document.getElementById("answer-" + event.target.id)
        if (answer.style.display === "none"){
            answer.style.display = "block";
        } else {
            answer.style.display = "none";
        }
    }

    render(){

        var correct_answer_text = "";
        this.state.answers.forEach(function(answer){
            if(answer.is_correct === 1){
                correct_answer_text = answer.text;
            }
        })


        return(
        <div className = {`quiz-box ${this.props.finished ? this.state.selected_answer_correct === "1" ? "correct" : "incorrect" : ""}`}>

            <h1>{this.props.text}</h1>

            {this.state.answers.map((element, index) =>
                <div key={index}><input type="radio"
                onChange={this.onButtonClick}
                key={index}
                name={this.props.question_id}
                value={element.is_correct}
                />{element.text}</div>
                )}


            {parseInt(localStorage.getItem('privilege')) >= 2 ?
            <div>
                <button onClick={this.toggleAnswerVisibility} id={this.props.question_id}>Reveal answer</button>
                <p id={"answer-" + this.props.question_id} style={{display: 'none'}}>{"The correct answer is: " + correct_answer_text}</p>
            </div>
            : "" }

        </div>
        );
    }
}

export default QuizAnswerBox