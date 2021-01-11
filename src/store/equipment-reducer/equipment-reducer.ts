//Model
import { Item } from "../../data/models/item.model";

//actions types
const INITIALIZE_EQUIPMENT = "INITIALIZE_EQUIPMENT";
const EQUIP_ITEM = "EQUIP_ITEM";
const ENHANCE_ITEM = "ENHANCE_ITEM";
const UNEQUIP_ITEM = "UNEQUIP_ITEM";
const UNEQUIP_ALL_ITEMS = "UNEQUIP_ALL_ITEMS";
const CHANGE_PSYCHO_LVL = "CHANGE_PSYCHO_LVL";

//reducer
export const initialEquipment: Equipment = {
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
  special: null,
  guild: null
};

export interface Equipment {
  armor: Item | null;
  helmet: Item | null;
  neck: Item | null;
  gloves: Item | null;
  cape: Item | null;
  weapon: Item | null;
  shield: Item | null;
  pants: Item | null;
  belt: Item | null;
  ring1: Item | null;
  ring2: Item | null;
  boots: Item | null;
  special: Item | null;
  guild: Item | null
}

export default function equipmentReducer(
  state = initialEquipment,
  action: EquipmentActions
): Equipment {
  let newState = { ...state };
  switch (action.type) {
    case EQUIP_ITEM:
      //This needs to be a new item instance or there is trouble with the same rings
      newState[action.payload.slot] = new Item(action.payload.item);
      return newState;
    case ENHANCE_ITEM:
      if (newState[action.payload.slot]) {
        newState[action.payload.slot]!.enhancements =
          action.payload.enhancements;
      }
      return newState;
    case UNEQUIP_ITEM:
      newState[action.payload.slot] = null;
      return newState;
    case UNEQUIP_ALL_ITEMS:
      newState = initialEquipment;
      return newState;
    case INITIALIZE_EQUIPMENT:
      return action.payload;
    case CHANGE_PSYCHO_LVL:
      if (newState[action.payload.slot]) {
        newState[action.payload.slot]!.psychoLvl += action.payload.value
      }
      return newState;
    default:
      return state;
  }
}

//action creators
export const initializeEquipment = (
  payload: Equipment
): InitializeEquipmentAction => {
  return {
    type: INITIALIZE_EQUIPMENT,
    payload,
  };
};

export const equipItem = (payload: EquipItemPayload): EquipItemAction => {
  return {
    type: EQUIP_ITEM,
    payload,
  };
};

export const enhanceItem = (payload: EnhanceItemPayload): EnhanceItemAction => {
  return {
    type: ENHANCE_ITEM,
    payload,
  };
};

export const unequipItem = (payload: UnequipItemPayload): UnequipItemAction => {
  return {
    type: UNEQUIP_ITEM,
    payload,
  };
};

export const unequipAllItems = (): UnequipAllItemsAction => {
  return {
    type: UNEQUIP_ALL_ITEMS,
  };
};

export const changePsychoLvl = (
  payload: PsychoLvlChangePayload
): ChangePsychoLvlAction => {
  return {
    type: CHANGE_PSYCHO_LVL,
    payload,
  };
};

//types
interface InitializeEquipmentAction {
  type: typeof INITIALIZE_EQUIPMENT;
  payload: Equipment;
}

interface EquipItemPayload {
  slot: keyof Equipment;
  item: Item;
}

interface EnhanceItemPayload {
  slot: keyof Equipment;
  enhancements: {
    strength: number;
    agility: number;
    power: number;
    knowledge: number;
    hp: number;
    mana: number;
    endurance: number;
    damage: number;
  };
}

interface UnequipItemPayload {
  slot: keyof Equipment;
}

interface PsychoLvlChangePayload {
  slot: keyof Equipment;
  value: number;
}

interface EquipItemAction {
  type: typeof EQUIP_ITEM;
  payload: EquipItemPayload;
}

interface EnhanceItemAction {
  type: typeof ENHANCE_ITEM;
  payload: EnhanceItemPayload;
}

interface UnequipItemAction {
  type: typeof UNEQUIP_ITEM;
  payload: UnequipItemPayload;
}

interface UnequipAllItemsAction {
  type: typeof UNEQUIP_ALL_ITEMS;
}

interface ChangePsychoLvlAction {
  type: typeof CHANGE_PSYCHO_LVL;
  payload: PsychoLvlChangePayload;
}

type EquipmentActions =
  | InitializeEquipmentAction
  | EquipItemAction
  | EnhanceItemAction
  | UnequipItemAction
  | UnequipAllItemsAction
  | ChangePsychoLvlAction;
