import { createStore } from "redux";
import { combineReducers } from "redux";

import characterReducer from "./character-reducer/character-reducer"
import statsReducer from "./stats-reducer/stats-reducer"
import skillsReducer from "./skills-reducer/skills-reducer"
import equipmentReducer from "./equipment-reducer/equipment-reducer.js"
import itemsReducer from "./items-reducer/items-reducer.js"

export const rootReducer = combineReducers(
  {
    character: characterReducer,
    stats: statsReducer,
    skills: skillsReducer,
    equipment: equipmentReducer,
    items: itemsReducer
  }
)

const store = createStore(rootReducer);


export default store;
