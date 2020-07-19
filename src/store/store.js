import { createStore } from "redux";
import { rootReducer } from "./reducers/reducers.js"

import { addStat } from "./actions/actions.js"

const store = createStore(rootReducer)

export default store;

console.log(store.getState())

store.dispatch(addStat({
  stat: "strength",
  number: 5
}))

console.log(store.getState())
