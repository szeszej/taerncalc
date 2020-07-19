import { createStore } from "redux";
import { combineReducers } from "redux";

import characterReducer from "./character-reducer/character-reducer.js"
import statsReducer from "./stats-reducer/stats-reducer.js"
import skillsReducer from "./skills-reducer/skills-reducer.js"
import equipmentReducer from "./equipment-reducer/equipment-reducer.js"

export const rootReducer = combineReducers(
  {
    character: characterReducer,
    stats: statsReducer,
    skills: skillsReducer,
    equipment: equipmentReducer
  }
)

const store = createStore(rootReducer);


export default store;
