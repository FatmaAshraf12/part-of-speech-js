import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleScoreChange} from "../redux/actions";
import {useNavigate} from "react-router-dom";
import useAPI from "../hooks/useAPI";

const rankURL = "http://localhost:4000/rank";

const ScoreComp = () => {
  const {score} = useSelector((state) => state);
  const [rank, setRank] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {response, error, loading} = useAPI({
    url: rankURL,
    method: "post",
    body: JSON.stringify({
      score: score,
    }),
  });

  React.useEffect(() => {
    if (response !== null) {
      setRank(response);
    }
  }, [response]);
  /******************************* Handling Reset Quiz***************************************/
  const resetQuiz = () => {
    dispatch(handleScoreChange(0));
    navigate("/", {replace: true});
  };
  return (
    <div>
      <h3 className="result">Your rank is {rank}</h3>
      <button type="submit" onClick={resetQuiz} className="reset">
        Try Again!!
      </button>
    </div>
  );
};
export default ScoreComp;
