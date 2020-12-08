import React, {Component} from 'react';

class QuizSelector extends Component{

    render(){
        return(
            <div className="quiz-box">
                <a href ={"/quiz/" + this.props.quiz_id} className="quiz-title">{this.props.name}</a>
                <br></br>
                <span className="quiz-description">{this.props.description}</span>
            </div>
        );
    }
}



export default QuizSelector;