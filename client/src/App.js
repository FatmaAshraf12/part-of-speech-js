import "./App.css";
import QuizComp from "./Components/QuizComp";
import ScoreComp from "./Components/ScoreComp";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {Component} from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" exact element={<QuizComp />}></Route>
            <Route path="/score" element={<ScoreComp />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
