import React from 'react';
import QuizAnswerBox from './QuizAnswerBox'

class QuizPage extends React.Component{

    constructor(props){
        super(props)

        this.state = ({
            quiz_information: {
                name: "",
                description: "",
                questions: []
            }
        })
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/api/questions/" + this.props.match.params.id)
        .then(result => result.json())
        .then(result => this.setState({quiz_information: result}))
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h1>Welcome to the quiz page! Your quiz ID is: {this.props.match.params.id}</h1>
                <h1>Quiz name: {this.state.quiz_information.name}</h1>
                {this.state.quiz_information.questions.map((element, index) => <QuizAnswerBox key={index} text={element.text} question_id={element.question_id}/>)}
            </div>
        )
    }
}

export default QuizPage