import React, {Component} from 'react';

class QuizButton extends Component{
    
    render(){
        return(
            <div>
                <h1>This is a quiz button for a quiz called: {this.props.name}</h1>
            </div>
        );
    }
}



export default QuizButton;