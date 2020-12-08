import React, {Component} from 'react';

class QuizButton extends Component{

    render(){
        return(
            <div className="quiz-box">
                <a href ="beep" className="quiz-title">{this.props.name}</a>
                <br></br>
                <span className="quiz-description">{this.props.description}</span>
            </div>
        );
    }
}



export default QuizButton;