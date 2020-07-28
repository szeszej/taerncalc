//action types
const CHANGE_STAT = "CHANGE_STAT";
const CHANGE_POINTS = "CHANGE_POINTS";
const INITIATLIZE_STATS = "INITIATLIZE_STATS";

//reducer
const initialStats = {
  statPts: 1,
  strength: 10,
  agility: 10,
  power: 10,
  knowledge: 10,
  hp: 200,
  endurance: 200,
  mana: 200,
};

export default function statsReducer(state = initialStats, action: StatsActions) {
  let newState = { ...state };
  switch (action.type) {
    case CHANGE_STAT:
      ["hp", "endurance", "mana"].includes(action.payload.stat)
        ? (newState[action.payload.stat] += action.payload.number * 10)
        : (newState[action.payload.stat] += action.payload.number);
      newState.statPts -= action.payload.number;
      return newState;
    case CHANGE_POINTS:
      return newState.statPts += action.payload.number;
    case INITIATLIZE_STATS:
      return action.payload;
    default:
      return state;
  }
}

//action creators
export const changeStat = (payload: ChangeStatPayload) => {
  return {
    type: CHANGE_STAT,
    payload: payload,
  };
};

export const initializeStats = (payload: InitializePayload) => {
  return {
    type: INITIATLIZE_STATS,
    payload,
  };
};

export const changePoints = (payload: ChangePointsPayload)  => {
  return {
    type: CHANGE_POINTS,
    payload,
  };
};

//types
interface InitializePayload {
  statPts: number,
  strength: number,
  agility: number,
  power: number,
  knowledge: number,
  hp: number,
  endurance: number,
  mana: number,
}

interface ChangeStatPayload {
  stat: keyof typeof initialStats,
  number: number
}

interface ChangePointsPayload {
  number: number
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
  type: typeof CHANGE_POINTS,
  payload: ChangePointsPayload
}


type StatsActions = ChangeStatAction | InitializeAction | ChangePointsAction
