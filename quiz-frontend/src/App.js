import logo from './logo.svg';
import './App.css';
import QuizButton from './components/QuizButton'

async function getTestData(){
  var data = await fetch("http://localhost:5000").then(data => {return data.json()}).catch(err => {return "oh no"});
  console.log(data)
  return data
}

function App() {

  var test_data = getTestData();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <QuizButton/>
    </div>
  );
}

export default App;
