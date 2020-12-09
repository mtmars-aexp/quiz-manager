import './App.css';
import React from 'react';
import Home from './components/Home'
import Secret from './components/Secret'
import Error from './components/Error'
import QuizPage from './components/QuizPage'
import Navbar from './components/Navbar'
import Login from './components/Login'
import QuizEditPage from './components/QuizEditPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      authenticated: false,
      username: "",
      privilege: 0
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin(username, password){
    console.log("Logging in!");
    fetch("http://127.0.0.1:5000/api/auth/", {method: 'POST', body: JSON.stringify({username: username, password: password}), headers: {'content-type': 'application/json'}})
    .then(result => {
      if(result.ok){
        localStorage.setItem('authenticated', true)
        localStorage.setItem('username', username)
      } else {
        console.log("Logging in failed.")
      }
      return result;
    })
    .then(result => result.text())
    .then(result => {localStorage.setItem('privilege', result); this.forceUpdate()})
    .catch(err => console.log(err))
  }

  handleLogout(){
    console.log("Logging out! Byebye!");
    localStorage.setItem("authenticated", false)
    localStorage.setItem("username", "");
    localStorage.setItem("privilege", "");
    this.forceUpdate();
  }

  render(){

    console.log(localStorage)

    return (
      <Router>
          <div className="App">
            <Navbar handleLogout={this.handleLogout}/>
            {localStorage.getItem("authenticated") === "true" ?
            <Switch>
              <Route path="/" exact component={Home} onEnter={this.requireAuth}/>
              <Route path="/secret" component={Secret} onEnter={this.requireAuth}/>
              <Route path="/quiz/:id" component={QuizPage}/>
              <Route path="/editQuiz/:id" component={QuizEditPage}/>
              <Route component={Error}/>
            </Switch>
            : <Login handleLogin={this.handleLogin}/>}
          </div>
      </Router>
    );
  }
}

export default App;
