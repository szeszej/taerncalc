//Redux
import store from "../store";

//action types
const CHANGE_STAT = "CHANGE_STAT";
const CHANGE_STAT_POINTS = "CHANGE_STAT_POINTS";
const INITIATLIZE_STATS = "INITIATLIZE_STATS";
const RESET_STAT_POINTS = "RESET_STAT_POINTS"
const SET_STAT_POINTS = "SET_STAT_POINTS"

//reducer

export interface StatsState {
  statPts: number,
  strength: number,
  agility: number,
  power: number,
  knowledge: number,
  hp: number,
  endurance: number,
  mana: number
}

const initialStats: StatsState = {
  statPts: 1,
  strength: 10,
  agility: 10,
  power: 10,
  knowledge: 10,
  hp: 200,
  endurance: 200,
  mana: 200,
};

export default function statsReducer(state = initialStats, action: StatsActions): StatsState {
  let newState = { ...state };
  switch (action.type) {
    case CHANGE_STAT:
      ["hp", "endurance", "mana"].includes(action.payload.stat)
        ? (newState[action.payload.stat] += action.payload.value * 10)
        : (newState[action.payload.stat] += action.payload.value);
      newState.statPts -= action.payload.value;
      return newState;
    case CHANGE_STAT_POINTS:
      newState.statPts += action.payload.value
      return newState;
    case SET_STAT_POINTS:
      newState.statPts = action.payload.value
      return newState;
    case INITIATLIZE_STATS:
      return action.payload;
    case RESET_STAT_POINTS:
      return action.payload
    default:
      return state;
  }
}

//action creators
export const changeStat = (payload: ChangeStatPayload): ChangeStatAction => {
  return {
    type: CHANGE_STAT,
    payload: payload
  };
};

export const initializeStats = (payload: InitializePayload): InitializeAction => {
  return {
    type: INITIATLIZE_STATS,
    payload
  };
};

export const changeStatPoints = (payload: ChangePointsPayload): ChangePointsAction  => {
  return {
    type: CHANGE_STAT_POINTS,
    payload
  };
};

export const resetStatPoints = (): ResetPointsAction => {
  let resetStats = {...initialStats}
  resetStats.statPts += store.getState().character.level * 4
  return {
    type: RESET_STAT_POINTS,
    payload: resetStats
  }
}

export const setStatPoints = (payload: ChangePointsPayload): SetPointsAction => {
  return {
    type: SET_STAT_POINTS,
    payload
  }
}

//types
interface InitializePayload {
  statPts: number,
  strength: number,
  agility: number,
  power: number,
  knowledge: number,
  hp: number,
  endurance: number,
  mana: number
}

interface ChangeStatPayload {
  stat: keyof typeof initialStats,
  value: number
}

interface ChangePointsPayload {
  value: number
}

interface InitializeAction {
  type: typeof INITIATLIZE_STATS,
  payload: InitializePayload
}

interface ChangeStatAction {
  type: typeof CHANGE_STAT,
  payload: ChangeStatPayload
}

interface ChangePointsAction {
  type: typeof CHANGE_STAT_POINTS,
  payload: ChangePointsPayload
}

interface SetPointsAction {
  type: typeof SET_STAT_POINTS,
  payload: ChangePointsPayload
}

interface ResetPointsAction {
  type: typeof RESET_STAT_POINTS,
  payload: InitializePayload
}


type StatsActions = ChangeStatAction | InitializeAction | ChangePointsAction | ResetPointsAction | SetPointsAction
