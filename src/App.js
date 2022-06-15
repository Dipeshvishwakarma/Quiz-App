import { useRef, useState } from 'react';
import './App.css';
import Home from "./components/Home/Home";





function App() {
  const numberOfQuestions = useRef(20);
  const OperandsLimit = useRef(20);
  const [start, setStart] = useState(false)
  return (
    <div className="App">
      {!start && 
      <div className="quizCustomization">
        <label>How many question do you want to practice?</label>
        <input type="number" ref={numberOfQuestions} />
        <label>Choose Operands limit?</label>
        <input type="number" ref={OperandsLimit} />
        <button onClick={()=>setStart(!start)}>Start the Quiz</button>
      </div>}
       {start && 
       
       <Home 
          numberOfQuestions={+numberOfQuestions.current.value}
          OperandsLimit={+OperandsLimit.current.value}
       />}
    </div>
  );
}

export default App;
