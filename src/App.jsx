import { useState, useEffect } from "react";
import questions from "./questions.json";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (start === true && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      setStart("finished");
    }
  }, [seconds, start]);

  const checkAnswer = (option) => {
    if (option === questions[index].answer) {
      setScore(score + 1);
    }
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setStart("finished");
    }
  };

  const startExam = () => {
    if (!name || !family) {
      alert("Enter name and family!");
      return;
    }
    setStart(true);
  };

  return (
    <div className="container">
      {!start && (
        <div className="start">
          <h1>Exam App</h1>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Family" onChange={(e) => setFamily(e.target.value)} />
          <button onClick={startExam}>Start Exam</button>
        </div>
      )}

      {start === true && (
        <div className="quiz">
          <div className="timer">Time Left: {seconds}s</div>
          <div className="box">
            <h2>{questions[index].question}</h2>
            <div className="option">
              {questions[index].options.map((opt, i) => (
                <button key={i} onClick={() => checkAnswer(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {start === "finished" && (
        <div className="result">
          <h1>Exam Finished</h1>
          <p>Name: {name} {family}</p>
          <h2>Score: {score} / {questions.length}</h2>

        </div>
      )}
    </div>
  );
}

export default App;
