import React from 'react';
import "./Result.css";

const Result = ({questions, score}) => {
  return (
    <div className="result">
        <h2>Your Score is :{score}</h2>
        <div className="questionSummry">
            {questions.map((item,index )=>{
                if(item.userAns && +item.userAns===item.answer){
                return (
                <div className="ans rightAns" key={index}>
                    <h3>Question {index+1}</h3>
                    <h2>{item.questionText}</h2>
                    <p>Your ans is correct :{item.answer}</p>
                </div>
                )
                } else{
                    return (
                    <div className="ans wrongAns" key={index}>
                        <h3>Question {index+1}</h3>
                        <h2>{item.questionText}</h2>
                        <p>Your input :{" "}{item.userAns ? item.userAns:"(No input)" }{"  " } Correct answer is :{item.answer}</p>
                    </div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default Result;