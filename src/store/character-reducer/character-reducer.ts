import store from "../store.js"
import { changeStat } from "../stats-reducer/stats-reducer.js"

//action types
const CHANGE_LEVEL = "CHANGE_LEVEL"
const INITIALIZE_CHARACTER = "INITIATLIZE_CHARACTER"

//reducer
const initialCharacter = {
  className: null,
  level: 0
}

export default function characterReducer (state = initialCharacter, action: {type: string, payload: InitializeAction | ChangeLevelAction}) {
  let newState = {...state};
  switch (action.type) {
    case CHANGE_LEVEL:
      newState.level += action.payload.level;
      return newState;
    case INITIALIZE_CHARACTER:
      return action.payload
    default:
      return state
  }
}

//action creators
export const changeLevel = (payload: {number: number}) => {
  store.dispatch(changeStat(payload.number * 4))
  return {
    type: CHANGE_LEVEL,
    payload
  }
}

export const initializeCharacter = (payload: InitializeAction) => {
  return {
    type: INITIALIZE_CHARACTER,
    payload
  }
}

//types
interface InitializeAction {
    className: string,
    level: number
}

interface ChangeLevelAction {
    level: number
}
