import { CHANGE_STAT } from "../constants/action-types.js"

export const addStat = (payload) => {
  return {
    type: CHANGE_STAT,
    payload
  }
}
