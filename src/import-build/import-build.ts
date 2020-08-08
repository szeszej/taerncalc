//Google Analytics
import ReactGA from "react-ga";

//Types
import { SkillSet } from "../data/models/skill-set.model.jsx";
import { Item } from "../data/models/item.model.js";
import skillsDatabase from "../data/skills.jsx";
import { ImportCharacterActionPayload } from "../store/character-reducer/character-reducer";
import { StatsState } from "../store/stats-reducer/stats-reducer";
import { initialStats } from "../store/stats-reducer/stats-reducer";
import { Equipment } from "../store/equipment-reducer/equipment-reducer";
import { initialEquipment } from "../store/equipment-reducer/equipment-reducer";
import { SkillsState } from "../store/skills-reducer/skills-reducer";

export function importBuild(
  database: TaernDatabase
): ImportCharacterActionPayload | void {
  //Getting properties from URL parameters
  let propertiesFromUrl = getUrlVars(window.location.href);
  //Letting GA know that a build has been imported
  if (Object.keys(propertiesFromUrl).length > 1) {
    ReactGA.event({
      category: "Form",
      action: "Import",
      label: propertiesFromUrl.className + " " + propertiesFromUrl.level,
    });
    //Importing basic character data
    let characterProperties: ImportCharacterActionPayload = {
      level: parseInt(propertiesFromUrl.level),
      className: propertiesFromUrl.className,
    };
    //Importing stats
    let temporaryStats = { ...initialStats };
    let areNewStatsNeeded: boolean = false;
    for (const key in propertiesFromUrl) {
      if (propertiesFromUrl.hasOwnProperty(key)) {
        if (
          Object.keys(initialStats).includes(key)
        ) {
          temporaryStats[key as keyof StatsState] = +propertiesFromUrl[key];
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
      skillSet: new SkillSet(characterProperties.className, database.skills),
    };
    let isNewSkillSetNeeded: boolean = false;
    for (const key in propertiesFromUrl) {
      if (propertiesFromUrl.hasOwnProperty(key)) {
        if (/skill1?[1-9]/gm.test(key)) {
          temporarySkills.skillSet[
            key as keyof SkillSet
          ].level = +propertiesFromUrl[key];
          temporarySkills.skillSet[key as keyof SkillSet].requiredCharLevel +=
            (temporarySkills.skillSet[key as keyof SkillSet].level -
              temporarySkills.skillSet[key as keyof SkillSet].minLvl) *
            temporarySkills.skillSet[key as keyof SkillSet]
              .requiredCharLevelInc;
          isNewSkillSetNeeded = true;
        } else if (key === "skillPts") {
          temporarySkills.skillPts = +propertiesFromUrl[key];
        }
      }
    }
    if (isNewSkillSetNeeded) {
      characterProperties.skills! = temporarySkills;
    }
    //Importing equipment
    let temporaryEquipment = { ...initialEquipment };
    let isNewEquipmentNeeded: boolean = false;
    let isThereSpecialItem: boolean = false;
    for (const key in propertiesFromUrl) {
      if (propertiesFromUrl.hasOwnProperty(key)) {
        //Normal items
        if (Object.keys(initialEquipment).includes(key) && propertiesFromUrl[key] !== "null") {
          let itemFound: Item | undefined = database.items.find(
            (x) => x.name === propertiesFromUrl[key].replace("+", " ")
          );
          temporaryEquipment[key as keyof Equipment] = itemFound ? itemFound : null;
          isNewEquipmentNeeded = true;
        }
        //Special slot requires special treatment
        if (Object.keys(propertiesFromUrl).some((x) => /^special+/.test(x)) && !isThereSpecialItem) {
          let special: Special = {type: "special"};
          propertiesFromUrl.hasOwnProperty("specialname")
            ? (special.name = propertiesFromUrl.specialname)
            : (special.name = "");
          propertiesFromUrl.hasOwnProperty("specialimage")
            ? (special.image = propertiesFromUrl.specialimage)
            : (special.image = "");
          propertiesFromUrl.hasOwnProperty("specialstrength")
            ? (special.strength = parseInt(propertiesFromUrl.specialstrength))
            : (special.strength = 0);
          propertiesFromUrl.hasOwnProperty("specialagility")
            ? (special.agility = parseInt(propertiesFromUrl.specialagility))
            : (special.agility = 0);
          propertiesFromUrl.hasOwnProperty("specialknowledge")
            ? (special.knowledge = parseInt(propertiesFromUrl.specialknowledge))
            : (special.knowledge = 0);
          propertiesFromUrl.hasOwnProperty("specialpower")
            ? (special.power = parseInt(propertiesFromUrl.specialpower))
            : (special.power = 0);
          propertiesFromUrl.hasOwnProperty("specialhp")
            ? (special.hp = parseInt(propertiesFromUrl.specialhp))
            : (special.hp = 0);
          propertiesFromUrl.hasOwnProperty("specialmana")
            ? (special.mana = parseInt(propertiesFromUrl.specialmana))
            : (special.mana = 0);
          propertiesFromUrl.hasOwnProperty("specialendurance")
            ? (special.endurance = parseInt(propertiesFromUrl.specialendurance))
            : (special.endurance = 0);
          propertiesFromUrl.hasOwnProperty("specialcutRes")
            ? (special.cutRes = parseInt(propertiesFromUrl.specialcutRes))
            : (special.cutRes = 0);
          propertiesFromUrl.hasOwnProperty("specialbluntRes")
            ? (special.bluntRes = parseInt(propertiesFromUrl.specialbluntRes))
            : (special.bluntRes = 0);
          propertiesFromUrl.hasOwnProperty("specialpierceRes")
            ? (special.pierceRes = parseInt(propertiesFromUrl.specialpierceRes))
            : (special.pierceRes = 0);
          propertiesFromUrl.hasOwnProperty("specialdamage")
            ? (special.damage = parseInt(propertiesFromUrl.specialdamage))
            : (special.damage = 0);
          propertiesFromUrl.hasOwnProperty("specialfireRes")
            ? (special.fireRes = parseInt(propertiesFromUrl.specialfireRes))
            : (special.fireRes = 0);
          propertiesFromUrl.hasOwnProperty("specialfrostRes")
            ? (special.frostRes = parseInt(propertiesFromUrl.specialfrostRes))
            : (special.frostRes = 0);
          propertiesFromUrl.hasOwnProperty("specialenergyRes")
            ? (special.energyRes = parseInt(propertiesFromUrl.specialenergyRes))
            : (special.energyRes = 0);
          propertiesFromUrl.hasOwnProperty("specialcurseRes")
            ? (special.curseRes = parseInt(propertiesFromUrl.specialcurseRes))
            : (special.curseRes = 0);
          isThereSpecialItem = true
          temporaryEquipment.special = new Item(special);
        }
      }
    }
    if (isNewEquipmentNeeded) {
      characterProperties.equipment! = temporaryEquipment;
    }
    return characterProperties;
  }
}

//Function that converts URL parameters into an object
function getUrlVars(url: string): { [key: string]: string } {
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
interface TaernDatabase {
  items: Item[];
  skills: typeof skillsDatabase;
}

interface Special {
  name?: string
  image?: string
  type: "special"
  damage?: number
  strength?: number
  agility?: number
  knowledge?: number
  power?: number
  hp?: number
  mana?: number
  endurance?: number
  cutRes?: number
  bluntRes?: number
  pierceRes?: number
  fireRes?: number
  frostRes?: number
  energyRes?: number
  curseRes?: number
}
