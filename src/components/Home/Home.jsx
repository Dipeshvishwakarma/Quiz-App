import React, { useEffect, useState } from 'react';
import Questions from "../Questions/Questions"
import "./Home.css";


function getquestionObject(OperandsLimit){
  let ans;
  let numberOne = Math.floor(Math.random()*OperandsLimit); 
   let numberTwo = Math.floor(Math.random()*OperandsLimit);
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


const Home = ({numberOfQuestions,OperandsLimit}) => {
   
    const [startQuiz1, setStartQuiz1] = useState(false);
    const [startQuiz2, setStartQuiz2] = useState(false);
    const [questions1, setQuestions1] = useState(JSON.parse(localStorage.getItem("questions1"))|| [getquestionObject(OperandsLimit)]);
    const [questions2, setQuestions2] = useState(JSON.parse(localStorage.getItem("questions2"))|| [getquestionObject(OperandsLimit)]);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
     console.log(getquestionObject(OperandsLimit));
     console.log("questions1",questions1);
     console.log("questions2",questions2);

    useEffect(() => {
      localStorage.setItem("questions1",JSON.stringify(questions1));
      }, [questions1])

      useEffect(() => {  
        localStorage.setItem("questions2",JSON.stringify(questions2));
        }, [questions2])
    
  
  return (
    <div className='quiz'>
    <div className="quiz1">
    {!startQuiz1 && <button className="startbtn"  onClick={()=>setStartQuiz1(!startQuiz1)}>Start the Quiz</button>}
    {startQuiz1 && 
   
    <Questions 
        questions={questions1}
        score={score1}
        setScore = {setScore1}
        setQuestions = {setQuestions1}
        numberOfQuestions={numberOfQuestions}
        OperandsLimit={OperandsLimit}  

    />
    }
    </div>
    <div className="quiz2">
    {!startQuiz2 && <button className="startbtn"  onClick={()=>setStartQuiz2(!startQuiz2)}>Start the Quiz</button>}
    {startQuiz2 && 
    <Questions 
        questions={questions2}
        score={score2}
        setScore = {setScore2}
        setQuestions = {setQuestions2}
        numberOfQuestions={numberOfQuestions}
        OperandsLimit={OperandsLimit}   
    /> 
    }
    </div>
    </div>
  )
}

export default Home;