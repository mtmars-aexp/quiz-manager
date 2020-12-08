import './App.css';
import Home from './components/Home'
import Secret from './components/Secret'
import Error from './components/Error'
import QuizPage from './components/QuizPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/secret" component={Secret}/>
            <Route path="/quiz/:id" component={QuizPage}/>
            <Route component={Error}/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
