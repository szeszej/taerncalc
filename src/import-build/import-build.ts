//Google Analytics
import ReactGA from "react-ga";

//Types
import { SkillSet } from "../data/models/skill-set.model";
import { Item, RawItem } from "../data/models/item.model";
import { ImportCharacterActionPayload } from "../store/character-reducer/character-reducer";
import { StatsState } from "../store/stats-reducer/stats-reducer";
import { Equipment } from "../store/equipment-reducer/equipment-reducer";
import { SkillsState } from "../store/skills-reducer/skills-reducer";

//Data
import { initialStats } from "../store/stats-reducer/stats-reducer";
import { initialEquipment } from "../store/equipment-reducer/equipment-reducer";
import itemsDatabase from "../data/items";

//Importing build from external TaernDatabase
export function importBuildFromDatabase(
  data: ImportedBuild
): ImportCharacterActionPayload {
  //Letting GA know that a build has been imported
  ReactGA.event({
    category: "Form",
    action: "Import",
    label: data.class + " " + data.level,
  });
  //Importing basic character data
  let characterProperties: ImportCharacterActionPayload = {
    level: data.level,
    className: data.class,
  };
  //Importing stats
  let temporaryStats = { ...initialStats };
  let areNewStatsNeeded: boolean = false;
  for (const key in data.stats) {
    if (data.stats && data.stats.hasOwnProperty(key)) {
      if (Object.keys(initialStats).includes(key)) {
        temporaryStats[key as keyof StatsState] = data.stats[
          key as keyof ImportedStats
        ]!;
        areNewStatsNeeded = true;
      }
    }
  }
  if (areNewStatsNeeded) {
    characterProperties.stats! = temporaryStats;
  }
  //Importing skills
  let temporarySkills: SkillsState = {
    skillPts: -2,
    skillSet: new SkillSet(data.class),
  };
  let isNewSkillSetNeeded: boolean = false;
  for (const key in data.skills) {
    if (data.skills && data.skills.hasOwnProperty(key)) {
      if (/skill1?[1-9]/gm.test(key)) {
        temporarySkills.skillSet[key as keyof SkillSet].level = data.skills[
          key as keyof ImportedSkills
        ]!;
        temporarySkills.skillSet[key as keyof SkillSet].requiredCharLevel +=
          (temporarySkills.skillSet[key as keyof SkillSet].level -
            temporarySkills.skillSet[key as keyof SkillSet].minLvl) *
          temporarySkills.skillSet[key as keyof SkillSet].requiredCharLevelInc;
        isNewSkillSetNeeded = true;
      } else if (key === "skillPts") {
        temporarySkills.skillPts = data.skills[key]!;
      }
    }
  }
  if (isNewSkillSetNeeded) {
    characterProperties.skills! = temporarySkills;
  }
  //Importing equipment
  let temporaryEquipment = { ...initialEquipment };
  let isNewEquipmentNeeded: boolean = false;
  for (const key in data.equipment) {
    if (data.equipment && data.equipment.hasOwnProperty(key)) {
      let isItemInDatabase = itemsDatabase.find(
        (item) =>
          item.name === data.equipment[key as keyof ImportedEquipment]!.name
      );
      if (
        isItemInDatabase &&
        !data.equipment[key as keyof ImportedEquipment]!.psychoLvl
      ) {
        temporaryEquipment[key as keyof Equipment] = isItemInDatabase;
      } else {
        if (
          data.equipment[key as keyof ImportedEquipment]!.name ===
          "Aquariusy II"
        ) {
          temporaryEquipment[key as keyof Equipment] = itemsDatabase.find(
            (item) => item.name === "Aquariusy II v1"
          )!;
        } else if (
          data.equipment[key as keyof ImportedEquipment]!.name === "Tsunami II"
        ) {
          temporaryEquipment[key as keyof Equipment] = itemsDatabase.find(
            (item) => item.name === "Tsunami II v1"
          )!;
        } else {
          temporaryEquipment[key as keyof Equipment] = new Item(
            data.equipment[key as keyof ImportedEquipment]!
          );
        }
      }
      temporaryEquipment[key as keyof Equipment]!.enhancements = data.equipment[
        key as keyof ImportedEquipment
      ]!.enhancements
        ? data.equipment[key as keyof ImportedEquipment]!.enhancements!
        : {
            strength: 0,
            agility: 0,
            power: 0,
            knowledge: 0,
            hp: 0,
            mana: 0,
            endurance: 0,
            damage: 0,
          };
      isNewEquipmentNeeded = true;
    }
  }
  if (isNewEquipmentNeeded) {
    characterProperties.equipment! = temporaryEquipment;
  }
  return characterProperties;
}

//Function that converts URL parameters into an object
export function getUrlVars(url: string): { [key: string]: string } {
  var params: { [key: string]: string } = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

//types
export interface ImportedBuild {
  class: string;
  level: number;
  skills: ImportedSkills;
  equipment: ImportedEquipment;
  stats: ImportedStats;
}

export interface ImportedSkills {
  skillPts?: number;
  skill1?: number;
  skill2?: number;
  skill3?: number;
  skill4?: number;
  skill5?: number;
  skill6?: number;
  skill7?: number;
  skill8?: number;
  skill9?: number;
  skill10?: number;
  skill11?: number;
  skill12?: number;
  skill13?: number;
  skill14?: number;
  skill15?: number;
  skill16?: number;
  skill17?: number;
  skill18?: number;
}

export interface ImportedEquipment {
  armor?: RawItem;
  helmet?: RawItem;
  neck?: RawItem;
  gloves?: RawItem;
  cape?: RawItem;
  weapon?: RawItem;
  shield?: RawItem;
  pants?: RawItem;
  belt?: RawItem;
  ring1?: RawItem;
  ring2?: RawItem;
  boots?: RawItem;
  special?: RawItem;
}

export interface ImportedStats {
  statPts?: number;
  strength?: number;
  agility?: number;
  power?: number;
  knowledge?: number;
  hp?: number;
  endurance?: number;
  mana?: number;
}
