import React from 'react';

class QuizAnswerBox extends React.Component{

    constructor(props){
        super(props)

        this.state = ({
            answers: []
        })
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/api/answers/" + this.props.question_id)
        .then(result => result.json())
        .then(result => this.setState({answers: result}))
        .catch(err => console.log(err))
    }

    render(){

        console.log("Answers are: ")
        console.log(this.state.answers)

        return(
        <div>
            <p>{this.props.text}</p>
        </div>
        );
    }
}

export default QuizAnswerBox