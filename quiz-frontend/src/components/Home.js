import React, {Component} from 'react';
import QuizSelector from './QuizSelector';

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {quiz_data: [], quizzes: []}
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/api/quizzes")
        .then(result => result.json())
        .then(result_json => this.setState({quiz_data: result_json}))
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div className = "page">
                <h1>This is the home page!</h1>
                <h1>You have {this.state.quiz_data.length} quizzes available.</h1>
                {this.state.quiz_data.map((element, index) => <QuizSelector key={index} name={element.name} description={element.description} quiz_id={element.quiz_id}/>)}
            </div>
        )
    }
}

export default Home