//action types
export const CHANGE_STAT = "CHANGE_STAT"
export const CHANGE_POINTS = "CHANGE_POINTS"
export const INITIATLIZE_STATS = "INITIATLIZE_STATS"

//reducer
const initialStats = {
  statPts: 1,
  strength: 10,
  agility: 10,
  power: 10,
  knowledge: 10,
  hp: 200,
  endurance: 200,
  mana: 200
}

export default function statsReducer (state = initialStats, action) {
  let newState = {...state};
  switch (action.type) {
    case CHANGE_STAT:
      ["hp", "endurance", "mana"].includes(action.payload.stat) ? newState[action.payload.stat] += action.payload.number * 10 : newState[action.payload.stat] += action.payload.number;
      newState.statPts -= action.payload.number;
      return newState;
    case CHANGE_POINTS:
      newState.statPts += action.payload.number
    case INITIATLIZE_STATS:
      return action.payload
    default:
      return state
  }
}

//action creators
export const changeStat = (payload) => {
  return {
    type: CHANGE_STAT,
    payload
  }
}

export const initializeStats = (payload) => {
  return {
    type: INITIATLIZE_STATS,
    payload
  }
}

export const changePoints = (payload) => {
  return {
    type: CHANGE_POINTS,
    payload
  }
}
