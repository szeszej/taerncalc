//action types
export const CHANGE_LEVEL = "CHANGE_LEVEL"
export const INITIATLIZE_CHARACTER = "INITIATLIZE_CHARACTER"

//reducer
const initialCharacter = {
  className: null,
  level: null
}

export default function characterReducer (state = initialCharacter, action) {
  let newState = {...state};
  switch (action.type) {
    case CHANGE_LEVEL:
      newState.level += action.payload.number;
      return newState;
    case INITIATLIZE_CHARACTER:
      return action.payload
    default:
      return state
  }
}

//action creators
export const changeLevel = (payload) => {
  return {
    type: CHANGE_LEVEL,
    payload
  }
}

export const initializeCharacter = (payload) => {
  return {
    type: INITIATLIZE_CHARACTER,
    payload
  }
}
