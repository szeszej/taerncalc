import { combineReducers } from "redux";
import { SkillSet } from "../../data/models/skill-set.model.jsx"
import skillsDatabase from "../../data/skills.jsx";

import { CHANGE_STAT } from "../constants/action-types.js"

const initialStats = {
  statPts: 0,
  strength: 10,
  agility: 10,
  power: 10,
  knowledge: 10,
  hp: 200,
  endurance: 200,
  mana: 200
}

const statsReducer = (state = initialStats, action) => {
  let newState = {...state};
  switch (action.type) {
    case CHANGE_STAT:
        newState[action.payload.stat] += action.payload.number;
        newState.statPts -= action.payload.number;
        return newState;
    default:
      return state
  }
}

const initialSkills = new SkillSet("knight", skillsDatabase);

const skillsReducer = (state = initialSkills, action) => {
  return state
}

export const rootReducer = combineReducers(
  {
    stats: statsReducer,
    skills: skillsReducer
  }
)
