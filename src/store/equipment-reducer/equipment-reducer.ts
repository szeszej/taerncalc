//Model
import { Item } from "../../data/models/item.model.js"

//actions types
const INITIALIZE_EQUIPMENT = "INITIALIZE_EQUIPMENT"
const EQUIP_ITEM = "EQUIP_ITEM"
const UNEQUIP_ITEM = "UNEQUIP_ITEM"
const UNEQUIP_ALL_ITEMS = "UNEQUIP_ALL_ITEMS"

//reducer
const initialEquipment: Equipment = {
  armor: null,
  helmet: null,
  neck: null,
  gloves: null,
  cape: null,
  weapon: null,
  shield: null,
  pants: null,
  belt: null,
  ring1: null,
  ring2: null,
  boots: null,
  special: null
}

interface Equipment {
  armor: Item | null,
  helmet: Item | null,
  neck: Item | null,
  gloves: Item | null,
  cape: Item | null,
  weapon: Item | null,
  shield: Item | null,
  pants: Item | null,
  belt: Item | null,
  ring1: Item | null,
  ring2: Item | null,
  boots: Item | null,
  special: Item | null
}

export default function equipmentReducer (state = initialEquipment, action: EquipmentActions): Equipment {
  let newState = { ...state };
  switch (action.type) {
    case EQUIP_ITEM:
      newState[action.payload.slot] = action.payload.item
      return newState
    case UNEQUIP_ITEM:
      newState[action.payload.slot] = null
      return newState
    case UNEQUIP_ALL_ITEMS:
      newState = initialEquipment
      return newState
    case INITIALIZE_EQUIPMENT:
      return action.payload
    default:
      return state
  }
}

//action creators
export const initializeEquipment = (payload: Equipment): InitializeEquipmentAction => {
  return {
    type: INITIALIZE_EQUIPMENT,
    payload
  }
}

export const equipItem = (payload: EquipItemPayload): EquipItemAction => {
  return {
    type: EQUIP_ITEM,
    payload
  }
}

export const unequipItem = (payload: EquipItemPayload): UnequipItemAction => {
  return {
    type: UNEQUIP_ITEM,
    payload
  }
}

export const unequipAllItems = (): UnequipAllItemsAction => {
  return {
    type: UNEQUIP_ALL_ITEMS
  }
}

//types
interface InitializeEquipmentAction {
  type: typeof INITIALIZE_EQUIPMENT,
  payload: Equipment
}

interface EquipItemPayload {
  slot: keyof Equipment,
  item: Item
}

interface UnequipItemPayload {
  slot: keyof Equipment
}

interface EquipItemAction {
  type: typeof EQUIP_ITEM,
  payload: EquipItemPayload
}

interface UnequipItemAction {
  type: typeof UNEQUIP_ITEM,
  payload: UnequipItemPayload
}

interface UnequipAllItemsAction {
  type: typeof UNEQUIP_ALL_ITEMS
}

type EquipmentActions = InitializeEquipmentAction | EquipItemAction | UnequipItemAction | UnequipAllItemsAction
