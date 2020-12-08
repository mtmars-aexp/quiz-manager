import './App.css';
import Home from './components/Home'
import Secret from './components/Secret'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home}/>
        <Route path="/secret" component={Secret}/>
      </div>
    </Router>
  );
}

export default App;
