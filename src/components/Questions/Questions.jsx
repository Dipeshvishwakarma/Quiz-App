import React, { useEffect, useRef, useState } from 'react';
import "./Questions.css";
import Result from "../Results/Result"
// import data from "../data";

const getquestionObject=(OperandsLimit)=>{
     let ans;
     let numberOne = Math.floor(Math.random()*10); 
      let numberTwo = Math.floor(Math.random()*10);
      let Operator = Math.floor(Math.random()*4) 
  switch (Operator) {
      case 0:
              ans = numberOne + numberTwo;
              return {
                  questionText : `Calculate ${numberOne} + ${numberTwo} ?`,
                  answer: ans,
                  userAns: ""
                   };
      case 1:
              ans = numberOne - numberTwo;
              return {
                  questionText : `Calculate ${numberOne} - ${numberTwo} ?`,
                  answer: ans,
                  userAns: ""
                };
      case 2:
              ans = Math.round(numberOne * numberTwo);
              return {
                  questionText : `Calculate ${numberOne} * ${numberTwo} ?`,
                  answer: ans,
                  userAns: ""
                };
      case 3:
              ans = Math.round(numberOne / numberTwo);
              return {
                  questionText : `Calculate ${numberOne} / ${numberTwo} ?`,
                  answer: ans,
                  userAns: ""
                };
      default: return {};          
  }
}

const Questions = ({ questions, score, setScore, setQuestions,numberOfQuestions,OperandsLimit }) => {
  const [currQues, setCurrQues] = useState(0);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(20);
  const timer = useRef();

  const handleNext = () => {
    if (currQues < numberOfQuestions) {
      clearInterval(timer.current);
      setCounter(20);  const prevQuestions = questions.map((item, i) => {
        if (i === currQues)
          return { ...item, userAns: input };
        else
          return item;
      });
      const newQuestion = getquestionObject(OperandsLimit);
      setQuestions([...prevQuestions,newQuestion]);
  
      if (input && +input === questions[currQues].answer) {
        setScore(score + 1);
      }
      setCurrQues(currQues + 1);
      setInput("");

    } else {
      clearInterval(timer.current);
      localStorage.clear();
      return;
    }
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      if (counter === 0) {
        handleNext();
      } else
        setCounter(counter - 1);
    }, 500)
    return () => {
      clearInterval(timer.current);
    }
  }, [counter, currQues])
  
  const restart =()=>{
    localStorage.clear();;
    setQuestions([getquestionObject(OperandsLimit)]);
    clearInterval(timer.current);
    //console.log(getquestionObject());
    setScore(0);
    setCurrQues(0);
    setCounter(20);

  }     

  return (
    <div className='container'>
      <button onClick={restart} className="restart">Reset</button>
      <div className='inner-container'>
      {currQues < numberOfQuestions ? (
        <div className="question">
          <div className="info">
            {currQues < numberOfQuestions ?
              <h3>00:{counter < 10 ? "0" + counter : counter}</h3> : ""}
          </div>
          {questions[currQues] && <div className='main'>
            <h2>Question {currQues + 1}</h2>
            <h1>{questions[currQues].questionText}</h1>
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>}
          <button onClick={ currQues<numberOfQuestions-1?handleNext:setCurrQues(currQues+1)} > {currQues >= numberOfQuestions-1 ? "Submit" : "Next Question"}</button>
          <div className="score">
          <h3>Your current score is :{" "}{score}</h3>
          </div>
        </div>
      )
        :
        (
          <Result
            score={score}
            questions={questions}
          />
        )}
    </div> 
    </div>
  )
}

export default Questions;