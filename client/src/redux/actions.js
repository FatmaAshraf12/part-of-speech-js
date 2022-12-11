import {CHANGE_SCORE} from "./types";
export const handleScoreChange = (payload) => ({
  type: CHANGE_SCORE,
  payload,
});
