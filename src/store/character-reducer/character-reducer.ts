//Redux
import store from "../store"

//Action creators
import { changeStatPoints } from "../stats-reducer/stats-reducer"
import { setStatPoints } from "../stats-reducer/stats-reducer"
import { initializeSkills } from "../skills-reducer/skills-reducer"
import { changeSkillPoints } from "../skills-reducer/skills-reducer"

//Model
import { SkillSet } from "../../data/models/skill-set.model.jsx"

//Data
import database from "../../data/skills.jsx"

//action types
const CHANGE_LEVEL = "CHANGE_LEVEL"
const INITIALIZE_CHARACTER = "INITIALIZE_CHARACTER"

//reducer

interface CharacterState {
  className: string,
  level: number
}

const initialCharacter: CharacterState = {
  className: "",
  level: 0
}

export default function characterReducer (state = initialCharacter, action: CharacterActions): CharacterState {
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
export const changeLevel = (payload: ChangeLevelActionPayload): ChangeLevelAction => {
  store.dispatch(changeStatPoints({value: payload.level * 4}))
  store.dispatch(changeSkillPoints({value: payload.level * 2}))
  return {
    type: CHANGE_LEVEL,
    payload
  }
}

export const initializeCharacter = (payload: InitializeActionPayload): InitializeAction => {
  store.dispatch(setStatPoints({value: payload.level * 4 + 1}))
  store.dispatch(initializeSkills({skillPts: payload.level * 2 - 2, skillSet: new SkillSet(payload.className, database)}))
  return {
    type: INITIALIZE_CHARACTER,
    payload
  }
}

//types
interface InitializeAction {
  type: typeof INITIALIZE_CHARACTER,
  payload: InitializeActionPayload
}

interface ChangeLevelAction {
  type: typeof CHANGE_LEVEL,
  payload: ChangeLevelActionPayload
}

interface InitializeActionPayload {
    className: string,
    level: number
}

interface ChangeLevelActionPayload {
    level: number
}

type CharacterActions = InitializeAction | ChangeLevelAction
