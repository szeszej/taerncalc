//Data
import itemsDatabase from "../../data/items"

//Model
import { Item } from "../../data/models/item.model"

//actions types
const ADD_ITEM = "ADD_ITEM"

//reducer
const initialItems: Item[] = [...itemsDatabase]

export default function itemsReducer (state = initialItems, action: any): Item[] {
  let newState = [...state]
  switch (action.type) {
    case ADD_ITEM:
      newState.push(action.payload.item)
      return newState
    default:
      return state
  }
}

//action creators
export const addItem = (payload: AddItemPayload): AddItemAction => {
  return {
    type: ADD_ITEM,
    payload
  }
}

//types
interface AddItemPayload {
  item: Item
}

interface AddItemAction {
  type: typeof ADD_ITEM
  payload: AddItemPayload
}
