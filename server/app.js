const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let jsonData = require("./TestData.json");

/********************************* HELPER FUNCTIONS  *********************************/

///// select random index
const selectIndx = (count) => Math.floor(count * Math.random());

///// function to check if indeces are exist then return words
const selectWords = (array, wordsNum) => {
  if (wordsNum > array.length) return;
  const result = [];
  const wordSet = new Set();
  while (result.length < wordsNum) {
    const index = selectIndx(wordsNum);
    if (wordSet.has(index)) continue;

    const element = array[index];
    wordSet.add(index);
    result.push(element);
    if (
      !result.some((e) => e.pos == "noun") ||
      !result.some((e) => e.pos == "verb") ||
      !result.some((e) => e.pos == "adjective") ||
      !result.some((e) => e.pos == "adverb")
    )
      continue;
  }
  return result;
};

//////  return total number of values which are below score
const valuesBelowScore = (arr, num) => {
  return arr.reduce((acc, val) => {
    val < num ? acc++ : acc;
    return acc;
  }, 0);
};

/*************************** END POINTS ****************************/
app.get("/words", (req, res) => {
  let words = jsonData.wordList;
  const element = selectWords(words, 10);
  res.json(element);
});

app.post("/rank", (req, res) => {
  const score = req.body.score;
  let scores = jsonData.scoresList;
  let output = valuesBelowScore(scores, score);
  //Rank = (number of values below score) ÷ (total number of scores) x 100
  let rank = (output / scores.length) * 100;
  res.json(Number(rank.toFixed(2)));
});

/********************************** LISTENING TO PORT  ******************************/
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
