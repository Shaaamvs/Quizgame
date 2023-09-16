import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10); 

  useEffect(() => {
  
    axios.get('https://api.punkapi.com/v2/beers')
      .then(response => {
        const fetchedQuestions = response.data.slice(0, 10);
        console.log(fetchedQuestions,"fectquestion")
        setQuestions(fetchedQuestions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  useEffect(() => {
  
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
          handleSubmitAnswer();
    }
  }, [timer]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswers(prevSelectedAnswers => {
      if (prevSelectedAnswers.includes(answer)) {
        return prevSelectedAnswers.filter(a => a !== answer);
      } else {
        return [...prevSelectedAnswers, answer];
      }
    });
  };

  const handleSubmitAnswer = () => {
    const correctAnswers = questions[currentQuestion].food_pairing;

    const isCorrect = correctAnswers.every(answer => selectedAnswers.includes(answer));

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedAnswers([]);
      setTimer(10); 
    } else {
        }
  };

  const currentQuestionData = questions[currentQuestion];

  if (!currentQuestionData) {
    return <p>Loading...</p>;
  }

  const choices = currentQuestionData.food_pairing || [];

  return (
    <div className='container text-center'>
      <h3 className='btn btn-success'> <p className='display-4'> Quiz Game!....
        </p></h3>
      <br/>
      {currentQuestionData && (
        <div>
          <h2 className="display-5" >Question {currentQuestion + 1}</h2>
          <p  type="button" className="btn btn-dark h1" >what is {currentQuestionData.name}</p>
          <ul className="list-group">
            {choices.map((choice, index) => (
              <li className="list-group-item"
                key={index}
                onClick={() => handleAnswerClick(choice)}
              >
                <input
                  type="checkbox"
                  checked={selectedAnswers.includes(choice)}
                  onChange={() => {}}
                className='mx-3'
                />
                {choice}
              </li>
            ))}
          </ul>
          <br/>
          <div>
            <p className='h5'>Time Remaining: <span type="button" className="btn btn-danger mx-3">{timer} seconds </span></p>
            <button onClick={handleSubmitAnswer}
            type="button" className="btn btn-primary">Submit Answer</button>

          </div>
        </div>
      )}
      <div>
        <br/>
        <h2>Final Score</h2>
        <br/>
        <h1 type="button" className="btn btn-success">{score}</h1>
      </div>
    </div>
  );
}

export default Quiz;
