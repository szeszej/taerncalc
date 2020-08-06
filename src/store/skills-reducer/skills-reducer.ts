//Redux
import store from "../store";

//Model
import { SkillSet } from "../../data/models/skill-set.model.jsx";

//Data
import database from "../../data/skills.jsx";

//action types
const CHANGE_SKILL = "CHANGE_SKILL";
const CHANGE_SKILL_POINTS = "CHANGE_SKILL_POINTS";
const INITIATLIZE_SKILLS = "INITIATLIZE_SKILLS";
const RESET_SKILL_POINTS = "RESET_SKILL_POINTS";
const SET_SKILL_POINTS = "SET_SKILL_POINTS";

//reducer
export interface SkillsState {
  skillPts: number;
  skillSet: SkillSet;
}

let initialSkills: SkillsState = {
  skillPts: -2,
  skillSet: new SkillSet("knight", database),
};

export default function skillsReducer(
  state = initialSkills,
  action: SkillActions
): SkillsState {
  let newState = { ...state };
  switch (action.type) {
    case CHANGE_SKILL:
      newState.skillSet[action.payload.skill].level = action.payload.newLvl;
      newState.skillSet[action.payload.skill].requiredCharLevel =
        action.payload.newLvl > action.payload.prevLvl
          ? newState.skillSet[action.payload.skill].requiredCharLevel +
            newState.skillSet[action.payload.skill].requiredCharLevelInc
          : newState.skillSet[action.payload.skill].requiredCharLevel -
            newState.skillSet[action.payload.skill].requiredCharLevelInc;
      newState.skillPts =
        action.payload.newLvl > action.payload.prevLvl
          ? newState.skillPts - action.payload.newLvl
          : newState.skillPts + action.payload.prevLvl;
      return newState;
    case CHANGE_SKILL_POINTS:
      newState.skillPts += action.payload.value;
      return newState;
    case SET_SKILL_POINTS:
      newState.skillPts = action.payload.value;
      return newState;
    case INITIATLIZE_SKILLS:
      return action.payload;
    case RESET_SKILL_POINTS:
      newState.skillPts = action.payload.value;
      for (let key in newState.skillSet) {
        newState.skillSet[key as keyof SkillSet].level =
          newState.skillSet[key as keyof SkillSet].minLvl;
        newState.skillSet[key as keyof SkillSet].requiredCharLevel =
          newState.skillSet[key as keyof SkillSet].initReqLvl;
      }
      return newState;
    default:
      return state;
  }
}

//action creators
export const changeSkill = (payload: ChangeSkillPayload): ChangeSkillAction => {
  return {
    type: CHANGE_SKILL,
    payload: payload,
  };
};

export const initializeSkills = (
  payload: InitializePayload
): InitializeAction => {
  return {
    type: INITIATLIZE_SKILLS,
    payload,
  };
};

export const changeSkillPoints = (
  payload: ChangeSkillPointsPayload
): ChangeSkillPointsAction => {
  return {
    type: CHANGE_SKILL_POINTS,
    payload,
  };
};

export const resetSkillPoints = (): ResetSkillPointsAction => {
  return {
    type: RESET_SKILL_POINTS,
    payload: {
      value: store.getState().character.level * 2 - 2,
    },
  };
};

export const setSkillPoints = (
  payload: ChangeSkillPointsPayload
): SetSkillPointsAction => {
  return {
    type: SET_SKILL_POINTS,
    payload,
  };
};

//types
interface InitializePayload {
  skillPts: number;
  skillSet: SkillSet;
}

interface ChangeSkillPayload {
  prevLvl: number;
  newLvl: number;
  skill: keyof SkillSet;
}

interface ChangeSkillPointsPayload {
  value: number;
}

interface InitializeAction {
  type: typeof INITIATLIZE_SKILLS;
  payload: InitializePayload;
}

interface ChangeSkillAction {
  type: typeof CHANGE_SKILL;
  payload: ChangeSkillPayload;
}

interface ChangeSkillPointsAction {
  type: typeof CHANGE_SKILL_POINTS;
  payload: ChangeSkillPointsPayload;
}

interface SetSkillPointsAction {
  type: typeof SET_SKILL_POINTS;
  payload: ChangeSkillPointsPayload;
}

interface ResetSkillPointsAction {
  type: typeof RESET_SKILL_POINTS;
  payload: ChangeSkillPointsPayload;
}

type SkillActions =
  | ChangeSkillAction
  | InitializeAction
  | ChangeSkillPointsAction
  | ResetSkillPointsAction
  | SetSkillPointsAction;
