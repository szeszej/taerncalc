//Redux
import store from "../store";

//Action creators
import { changeStatPoints } from "../stats-reducer/stats-reducer";
import { setStatPoints } from "../stats-reducer/stats-reducer";
import { initializeSkills } from "../skills-reducer/skills-reducer";
import { changeSkillPoints } from "../skills-reducer/skills-reducer";
import { initializeStats } from "../stats-reducer/stats-reducer";
import { initializeEquipment } from "../equipment-reducer/equipment-reducer"

//Types
import { SkillSet } from "../../data/models/skill-set.model.jsx";
import { StatsState } from "../stats-reducer/stats-reducer"
import { SkillsState } from "../skills-reducer/skills-reducer"
import { Equipment } from "../equipment-reducer/equipment-reducer"

//Data
import database from "../../data/skills.jsx";

//action types
const CHANGE_LEVEL = "CHANGE_LEVEL";
const INITIALIZE_CHARACTER = "INITIALIZE_CHARACTER";

//reducer
interface CharacterState {
  className: string;
  level: number;
}

const initialCharacter: CharacterState = {
  className: "",
  level: 0,
};

export default function characterReducer(
  state = initialCharacter,
  action: CharacterActions
): CharacterState {
  let newState = { ...state };
  switch (action.type) {
    case CHANGE_LEVEL:
      newState.level += action.payload.level;
      return newState;
    case INITIALIZE_CHARACTER:
      return action.payload;
    default:
      return state;
  }
}

//action creators
export const changeLevel = (
  payload: ChangeLevelActionPayload
): ChangeLevelAction => {
  store.dispatch(changeStatPoints({ value: payload.level * 4 }));
  store.dispatch(changeSkillPoints({ value: payload.level * 2 }));
  return {
    type: CHANGE_LEVEL,
    payload,
  };
};

export const initializeCharacter = (
  payload: InitializeActionPayload
): InitializeAction => {
  store.dispatch(setStatPoints({ value: payload.level * 4 + 1 }));
  store.dispatch(
    initializeSkills({
      skillPts: payload.level * 2 - 2,
      skillSet: new SkillSet(payload.className, database),
    })
  );
  return {
    type: INITIALIZE_CHARACTER,
    payload,
  };
};

export const importCharacter = (
  payload: ImportCharacterActionPayload
): InitializeAction => {
  if (payload.hasOwnProperty("stats")) {
    store.dispatch(initializeStats(payload.stats!))
  } else {
    store.dispatch(setStatPoints({ value: payload.level * 4 + 1 }));
  }
  if (payload.hasOwnProperty("equipment")) {
    store.dispatch(initializeEquipment(payload.equipment!))
  }
  if (payload.hasOwnProperty("skills")) {
    store.dispatch(
      initializeSkills({
        skillPts: payload.skills!.skillPts,
        skillSet: payload.skills!.skillSet,
      })
    );
  } else {
    store.dispatch(
      initializeSkills({
        skillPts: payload.level * 2 - 2,
        skillSet: new SkillSet(payload.className, database),
      })
    );
  }
  return {
    type: INITIALIZE_CHARACTER,
    payload: {
      className: payload.className,
      level: payload.level,
    },
  };
};

//types
interface InitializeAction {
  type: typeof INITIALIZE_CHARACTER;
  payload: InitializeActionPayload;
}

interface ChangeLevelAction {
  type: typeof CHANGE_LEVEL;
  payload: ChangeLevelActionPayload;
}

interface InitializeActionPayload {
  className: string;
  level: number;
}

interface ChangeLevelActionPayload {
  level: number;
}

export interface ImportCharacterActionPayload {
  className: string;
  level: number;
  stats?: StatsState;
  skills?: SkillsState;
  equipment?: Equipment;
}

type CharacterActions = InitializeAction | ChangeLevelAction;
