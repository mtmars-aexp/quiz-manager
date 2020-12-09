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
            },
            selected_answers: {},
            score: 0,
            finished: false
        })

        this.updateQuizAnswer = this.updateQuizAnswer.bind(this);
        this.countScore = this.countScore.bind(this);

    }

    countScore(){
        var final_score = 0
        for (let is_correct of Object.values(this.state.selected_answers)){
            if(is_correct === "1"){
                final_score ++;
            }
        }
        this.setState({score: final_score, finished: true});
    }

    updateQuizAnswer(question_id, is_correct){
        var selected_answers = this.state.selected_answers
        selected_answers[question_id] = is_correct
        this.setState({selected_answers: selected_answers})
    }

    componentDidMount(){
        fetch("http://127.0.0.1:5000/api/questions/" + this.props.match.params.id)
        .then(result => result.json())
        .then(result => this.setState({quiz_information: result}))
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div className = "page">
                <h1>Welcome to the quiz page! Your quiz ID is: {this.props.match.params.id}</h1>
                <h1>Quiz name: {this.state.quiz_information.name}</h1>
                {this.state.quiz_information.questions.map((element, index) => 
                <QuizAnswerBox
                key={index}
                text={element.text}
                question_id={element.question_id}
                updateQuizAnswer={this.updateQuizAnswer}
                finished={this.state.finished}/>)}

                <div>
                    <button disabled = {this.state.finished} onClick={this.countScore}>Count score!</button>
                </div>

                <div>
                    <h1>Score: {this.state.score}/{this.state.quiz_information.questions.length}</h1>
                </div>
            </div>
        )
    }
}

export default QuizPage