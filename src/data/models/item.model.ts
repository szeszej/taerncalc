export class Item {
  constructor(item: RawItem | Item) {
    this.name = item.name;
    this.type = item.type;
    this.image = item.image;
    this.otherProperties = item.otherProperties ? item.otherProperties : [];
    this.rarity = item.rarity ? item.rarity : "Rzadki";
    this.class = item.class ? item.class : null;
    this.set = item.set ? item.set : null;
    this.damageType = item.damageType ? item.damageType : null;
    this.weaponType = item.weaponType ? item.weaponType : null;
    this.psychoLvl = item.psychoLvl ? item.psychoLvl : item.rarity === "Psychorare" || item.rarity === "Epik" ? 1 : 0;
    let properties: (keyof NumericItemValues)[] = [
      "reqLvl",
      "reqStr",
      "reqAgi",
      "reqPow",
      "reqKno",
      "strength",
      "agility",
      "power",
      "knowledge",
      "hp",
      "mana",
      "endurance",
      "cutRes",
      "bluntRes",
      "pierceRes",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
      "damage",
    ];
    properties.forEach((itemProperty) => {
      this[itemProperty] = item[itemProperty] ? item[itemProperty]! : 0;
    });
    this.isCustom = item.hasOwnProperty("isCustom") ? true : false;
    this.randomStats = (item.hasOwnProperty("randomStats") && item.randomStats === true) || (item.set && item.reqLvl === 100) ? true : false;
    this.enhancements = item.enhancements
      ? item.enhancements
      : {
          strength: 0,
          agility: 0,
          power: 0,
          knowledge: 0,
          hp: 0,
          mana: 0,
          endurance: 0,
          damage: 0
        };
    this.calculateTotalStat = this.calculateTotalStat.bind(this)
  }
  calculateTotalStat(stat: keyof Enhancements) {
    return this[stat as keyof Enhancements] + this.enhancements[stat as keyof Enhancements]
  }
  calculateTotalDamage(charLevel: number): number {
    let damage = 0
    if (this.rarity === "Epik" && this.weaponType === "Dwuręczna") {
      damage = this.psychoLvl ? this.damage + charLevel + this.enhancements.damage + (this.psychoLvl - 1) * 3 : this.damage + charLevel + this.enhancements.damage
    } else if (this.rarity === "Epik" && this.weaponType === "Jednoręczna") {
      damage = this.damage + charLevel + this.enhancements.damage + (this.psychoLvl - 1) * 2
    } else if (this.rarity === "Psychorare" && this.weaponType === "Dwuręczna") {
      damage = this.damage + this.enhancements.damage + (this.psychoLvl - 1) * 3
    } else if (this.rarity === "Psychorare" && this.weaponType === "Jednoręczna") {
      damage = this.damage + this.enhancements.damage + (this.psychoLvl - 1) * 2
    } else {
      damage = this.damage + this.enhancements.damage
    }
    return damage
  }
}

export interface Item extends NumericItemValues {
  name: string
  type: ItemTypes
  image: string
  rarity: string
  class: string | null
  set: string | null
  damageType: string | null
  weaponType: string | null
  psychoLvl: number
  isCustom: boolean
  randomStats: boolean
  enhancements: Enhancements
  calculateTotalStat(stat: keyof Enhancements): number
  otherProperties: [string, number, number][]
}

export interface Enhancements {
  strength: number
  agility: number
  power: number
  knowledge: number
  hp: number
  mana: number
  endurance: number
  damage: number
}

export interface NumericItemValues {
  reqLvl: number
  reqStr: number
  reqAgi: number
  reqPow: number
  reqKno: number
  strength: number
  agility: number
  power: number
  knowledge: number
  hp: number
  mana: number
  endurance: number
  cutRes: number
  bluntRes: number
  pierceRes: number
  fireRes: number
  energyRes: number
  frostRes: number
  curseRes: number
  damage: number
}

export interface RawItem {
    name: string
    type: ItemTypes
    image: string
    rarity?: string
    class?: string
    set?: string
    damageType?: string
    weaponType?: string
    psychoLvl? : number
    reqLvl?: number
    reqStr?: number
    reqAgi?: number
    reqPow?: number
    reqKno?: number
    strength?: number
    agility?: number
    power?: number
    knowledge?: number
    hp?: number
    mana?: number
    endurance?: number
    cutRes?: number
    bluntRes?: number
    pierceRes?: number
    fireRes?: number
    energyRes?: number
    frostRes?: number
    curseRes?: number
    damage?: number
    isCustom?: boolean
    randomStats?: boolean
    enhancements?: Enhancements
    otherProperties?: [string, number, number][]
}

export type ItemTypes = "armor" |  "helmet"  | "neck" | "gloves" |  "cape" | "weapon" | "shield" | "pants" | "belt" | "ring" | "boots" | "special"
