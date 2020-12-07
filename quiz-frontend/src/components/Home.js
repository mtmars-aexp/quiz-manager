import React, {Component} from 'react';

class Home extends Component{

    constructor(props){
        super(props)
        this.state = {quizzes: []}
    }

    componentDidMount() {
        console.log("Home page component mounted. Getting available quizzes.")
        fetch("http://127.0.0.1:5000", {headers: { 'Content-Type': 'application/json'}})
        .then(data => console.log(data.json()))
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h1>This is the home page!</h1>
                <h1>You have {this.state.quizzes.length} available.</h1>
            </div>
        )
    }
}

export default Home