import React, {Component} from 'react';
import QuizButton from './QuizButton';

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {quiz_data: [], quizzes: []}
    }

    componentDidMount() {
        console.log("Home page component mounted. Getting available quizzes.")
        fetch("http://127.0.0.1:5000")
        .then(result => result.json())
        .then(result_json => this.setState({quiz_data: result_json}))
        .catch(err => console.log(err))
    }

    render(){
        console.log("There are " + this.state.quiz_data.length + " quizzes available.")
        return (
            <div>
                <h1>This is the home page!</h1>
                <h1>You have {this.state.quiz_data.length} quizzes available.</h1>
                {this.state.quiz_data.map((element, index) => <QuizButton name={element.name} description={element.description}/>)}
            </div>
        )
    }
}

export default Home