import { RawSkill, Effect } from "../skills";

export class Skill {
  constructor(rawSkill: RawSkill, number?: number) {
    this.name = rawSkill.name;
    this.description = rawSkill.description;
    this.minLvl = rawSkill.minLvl ? rawSkill.minLvl : 0;
    this.maxLvl = rawSkill.maxLvl ? rawSkill.maxLvl : 7;
    this.level = rawSkill.level ? rawSkill.level : 0;
    this.requiredCharLevelInc = 1;
    this.image = rawSkill.image
    switch (number) {
      case 1:
        this.requiredCharLevel = 2;
        this.initReqLvl = 2;
        break;
      case 2:
        this.requiredCharLevel = 5;
        this.initReqLvl = 5;
        break;
      case 3:
        this.requiredCharLevel = 8;
        this.initReqLvl = 8;
        break;
      case 4:
        this.requiredCharLevel = 12;
        this.initReqLvl = 12;
        break;
      case 5:
        this.requiredCharLevel = 15;
        this.initReqLvl = 15;
        break;
      case 6:
        this.requiredCharLevel = 18;
        this.initReqLvl = 18;
        break;
      case 7:
        this.requiredCharLevel = 22;
        this.initReqLvl = 22;
        break;
      case 8:
        this.requiredCharLevel = 26;
        this.initReqLvl = 26;
        break;
      case 9:
        this.requiredCharLevel = 30;
        this.initReqLvl = 30;
        break;
      default:
        this.requiredCharLevel = rawSkill.requiredCharLevel ? rawSkill.requiredCharLevel : 0;
        this.initReqLvl = rawSkill.initReqLvl ? rawSkill.initReqLvl : 0;
        break;
    }
    this.manaCost = rawSkill.cost.mana ? rawSkill.cost.mana : null
    this.enduranceCost = rawSkill.cost.endurance ? rawSkill.cost.endurance : null
    this.target = rawSkill.target ? rawSkill.target : "single"
    this.damageFormula = rawSkill.damageFormula ? {
      strengthCoeff: rawSkill.damageFormula.strengthCoeff ? rawSkill.damageFormula.strengthCoeff : 0,
      agilityCoeff: rawSkill.damageFormula.agilityCoeff ? rawSkill.damageFormula.agilityCoeff : 0,
      powerCoeff: rawSkill.damageFormula.powerCoeff ? rawSkill.damageFormula.powerCoeff : 0,
      knoCoeff: rawSkill.damageFormula.knoCoeff ? rawSkill.damageFormula.knoCoeff : 0,
      manaCoeff: rawSkill.damageFormula.manaCoeff ? rawSkill.damageFormula.manaCoeff : 0,
      weapon: rawSkill.damageFormula.weapon ? rawSkill.damageFormula.weapon : false,
    } : null
    this.damageMod = rawSkill.damageMod ? rawSkill.damageMod : null
    this.effects = rawSkill.effects ? rawSkill.effects : null
    this.duration = rawSkill.duration ? rawSkill.duration : null
    this.type = rawSkill.type
    this.attackType = rawSkill.attackType ? rawSkill.attackType :  null
    this.hitType = rawSkill.hitType ? rawSkill.hitType : null
    this.hittingMod = rawSkill.hittingMod ? rawSkill.hittingMod : null
    this.healing = rawSkill.healing ? rawSkill.healing : false
    this.difficulty = rawSkill.difficulty ? rawSkill.difficulty : null
  }
}

export interface Skill {
  name: string
  description: string
  image: string
  minLvl: number
  maxLvl: number
  level: number
  requiredCharLevelInc: number
  requiredCharLevel: number
  initReqLvl: number
  manaCost: [number, number, number, number, number, number, number] | null
  enduranceCost: [number, number, number, number, number, number, number] | null
  target: "self" | "single" | "group";
  damageFormula: {
    strengthCoeff: number;
    agilityCoeff: number;
    powerCoeff: number;
    knoCoeff: number;
    manaCoeff: number;
    weapon: boolean;
  } | null
  damageMod: [number, number, number, number, number, number, number] | null;
  effects: Effect[] | null;
  duration: [number, number, number, number, number, number, number] | null;
  type: "attack" | "buff"
  attackType: "melee" | "ranged" | "mental" | null;
  hitType: "agility" | "knowledge" | null;
  hittingMod: [number, number, number, number, number, number, number] | null;
  healing: boolean;
  difficulty: [number, number, number, number, number, number, number] | null;
}
