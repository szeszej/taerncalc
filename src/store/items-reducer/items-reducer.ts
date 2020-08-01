//Data
import itemsDatabase from "../../data/items.js"

//Model
import { Item } from "../../data/models/item.model.js"

//actions types

//reducer
const initialItems: Item[] = [...itemsDatabase]

export default function itemsReducer (state = initialItems, action: any): Item[] {
  switch (action.type) {
    default:
      return state
  }
}

//action creators

//types
