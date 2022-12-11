import React from "react";
import useAPI from "../hooks/useAPI";
import {useDispatch, useSelector} from "react-redux";
import {handleScoreChange} from "../redux/actions";
import {useNavigate} from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const wordsURL = "http://localhost:4000/words";

const QuizComp = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const options = ["noun", "verb", "adverb", "adjective"];
  const {score} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /******************************* Fetching APIS ***************************************/
  const {response, error, loading} = useAPI({url: wordsURL, method: "get"});

  React.useEffect(() => {
    if (response?.length) {
      const question = response[currentQuestion];
    }
    let btns = document.querySelectorAll(".btns button");
    for (let i = 0; i < btns.length; i++)
      btns[i].style.backgroundColor = "transparent";
  }, [response, currentQuestion]);

  if (loading) return <h3>loading</h3>;
  if (error) return <h3>error</h3>;

  /******************************* Handling Answers ***************************************/
  const handleAnswer = (e) => {
    const question = response[currentQuestion];
    if (e.target.textContent === question.pos) {
      dispatch(handleScoreChange(score + 10));
      e.target.style.backgroundColor = "red";
    } else {
      e.target.style.backgroundColor = "blue";
    }
    const timer = setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion == response.length) navigate("/score", {replace: true});
      else setCurrentQuestion(nextQuestion);
    }, 1000);
    return () => clearTimeout(timer);
  };

  ///////////// Rendering
  return (
    <div className="quiz-container">
      <div>
        <div className="progress">
          <ProgressBar completed={(currentQuestion / response.length) * 100} />
        </div>
        <div className="q-container">
          <h2>
            Question {currentQuestion + 1} of {response.length}
          </h2>
          <div className="questions">
            <div className="question-num title">
              <h1>{response[currentQuestion].word}</h1>
            </div>
            <div className="btns">
              {options.map((data, id) => (
                <button key={id} onClick={handleAnswer}>
                  {data}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComp;
