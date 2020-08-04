//Google Analytics
import ReactGA from 'react-ga';

//Types
import { SkillSet } from "../data/models/skill-set.model.jsx"
import { Item } from "../data/models/item.model.js"
import skillsDatabase from "../data/skills.jsx"
import { ImportCharacterActionPayload } from "../store/character-reducer/character-reducer"
import { StatsState } from "../store/stats-reducer/stats-reducer"

interface TaernDatabase {
  items: Item[],
  skills: typeof skillsDatabase
}

function importBuild(database: TaernDatabase): ImportCharacterActionPayload | void {
  let propertiesFromUrl = getUrlVars(window.location.href);
  if (Object.keys(propertiesFromUrl).length > 1) {
    ReactGA.event({
      category: 'Form',
      action: 'Import',
      label: (propertiesFromUrl.className + " " + propertiesFromUrl.level)
    });
    let characterProperties: ImportCharacterActionPayload = {
      level: parseInt(propertiesFromUrl.level),
      className: propertiesFromUrl.className,
    }
    for (const key in propertiesFromUrl) {
      if (propertiesFromUrl.hasOwnProperty(key)) {
        if (["hp", "endurance", "mana", "strength", "agility", "power", "knowledge", "statPts"]) {
          characterProperties.stats![key as keyof StatsState] = +propertiesFromUrl[key]
        }

      }
    }
    // let initialStats = {};
    // initialStats.statPts = parseInt(initialProperties.statPts);
    // initialStats.strength = parseInt(initialProperties.strength);
    // initialStats.agility = parseInt(initialProperties.agility);
    // initialStats.power = parseInt(initialProperties.power);
    // initialStats.knowledge = parseInt(initialProperties.knowledge);
    // initialStats.hp = parseInt(initialProperties.hp);
    // initialStats.endurance = parseInt(initialProperties.endurance);
    // initialStats.mana = parseInt(initialProperties.mana);
    // let initialEquipment = {};
    // if (initialProperties.armor !== "null") {
    //   initialEquipment.armor = database.items.filter(
    //     x => x.name === initialProperties.armor
    //   )[0];
    // } else {
    //   initialEquipment.armor = null;
    // }
    // if (initialProperties.helmet !== "null") {
    //   initialEquipment.helmet = database.items.filter(
    //     x => x.name === initialProperties.helmet
    //   )[0];
    // } else {
    //   initialEquipment.helmet = null;
    // }
    // if (initialProperties.neck !== "null") {
    //   initialEquipment.neck = database.items.filter(
    //     x => x.name === initialProperties.neck
    //   )[0];
    // } else {
    //   initialEquipment.neck = null;
    // }
    // if (initialProperties.gloves !== "null") {
    //   initialEquipment.gloves = database.items.filter(
    //     x => x.name === initialProperties.gloves
    //   )[0];
    // } else {
    //   initialEquipment.gloves = null;
    // }
    // if (initialProperties.cape !== "null") {
    //   initialEquipment.cape = database.items.filter(
    //     x => x.name === initialProperties.cape
    //   )[0];
    // } else {
    //   initialEquipment.cape = null;
    // }
    // if (initialProperties.weapon !== "null") {
    //   initialEquipment.weapon = database.items.filter(
    //     x => x.name === initialProperties.weapon
    //   )[0];
    // } else {
    //   initialEquipment.weapon = null;
    // }
    // if (initialProperties.shield !== "null") {
    //   initialEquipment.shield = database.items.filter(
    //     x => x.name === initialProperties.shield
    //   )[0];
    // } else {
    //   initialEquipment.shield = null;
    // }
    // if (initialProperties.pants !== "null") {
    //   initialEquipment.pants = database.items.filter(
    //     x => x.name === initialProperties.pants
    //   )[0];
    // } else {
    //   initialEquipment.pants = null;
    // }
    // if (initialProperties.belt !== "null") {
    //   initialEquipment.belt = database.items.filter(
    //     x => x.name === initialProperties.belt
    //   )[0];
    // } else {
    //   initialEquipment.belt = null;
    // }
    // if (initialProperties.ring1 !== "null") {
    //   initialEquipment.ring1 = database.items.filter(
    //     x => x.name === initialProperties.ring1
    //   )[0];
    // } else {
    //   initialEquipment.ring1 = null;
    // }
    // if (initialProperties.ring2 !== "null") {
    //   initialEquipment.ring2 = database.items.filter(
    //     x => x.name === initialProperties.ring2
    //   )[0];
    // } else {
    //   initialEquipment.ring2 = null;
    // }
    // if (initialProperties.boots !== "null") {
    //   initialEquipment.boots = database.items.filter(
    //     x => x.name === initialProperties.boots
    //   )[0];
    // } else {
    //   initialEquipment.boots = null;
    // }
    // if (Object.keys(initialProperties).some(x => /^special+/.test(x))) {
    //   let special = {};
    //   initialProperties.hasOwnProperty("specialname") ?
    //     (special.name = initialProperties.specialname) :
    //     (special.name = "");
    //   initialProperties.hasOwnProperty("specialimage") ?
    //     (special.image = initialProperties.specialimage) :
    //     (special.image = "");
    //   special.type = "special";
    //   initialProperties.hasOwnProperty("specialstrength") ?
    //     (special.strength = parseInt(initialProperties.specialstrength)) :
    //     (special.strength = 0);
    //   initialProperties.hasOwnProperty("specialagility") ?
    //     (special.agility = parseInt(initialProperties.specialagility)) :
    //     (special.agility = 0);
    //   initialProperties.hasOwnProperty("specialknowledge") ?
    //     (special.knowledge = parseInt(initialProperties.specialknowledge)) :
    //     (special.knowledge = 0);
    //   initialProperties.hasOwnProperty("specialpower") ?
    //     (special.power = parseInt(initialProperties.specialpower)) :
    //     (special.power = 0);
    //   initialProperties.hasOwnProperty("specialhp") ?
    //     (special.hp = parseInt(initialProperties.specialhp)) :
    //     (special.hp = 0);
    //   initialProperties.hasOwnProperty("specialmana") ?
    //     (special.mana = parseInt(initialProperties.specialmana)) :
    //     (special.mana = 0);
    //   initialProperties.hasOwnProperty("specialendurance") ?
    //     (special.endurance = parseInt(initialProperties.specialendurance)) :
    //     (special.endurance = 0);
    //   initialProperties.hasOwnProperty("specialcutRes") ?
    //     (special.cutRes = parseInt(initialProperties.specialcutRes)) :
    //     (special.cutRes = 0);
    //   initialProperties.hasOwnProperty("specialbluntRes") ?
    //     (special.bluntRes = parseInt(initialProperties.specialbluntRes)) :
    //     (special.bluntRes = 0);
    //   initialProperties.hasOwnProperty("specialpierceRes") ?
    //     (special.pierceRes = parseInt(initialProperties.specialpierceRes)) :
    //     (special.pierceRes = 0);
    //   initialProperties.hasOwnProperty("specialdamage") ?
    //     (special.damage = parseInt(initialProperties.specialdamage)) :
    //     (special.damage = 0);
    //   initialProperties.hasOwnProperty("specialfireRes") ?
    //     (special.fireRes = parseInt(initialProperties.specialfireRes)) :
    //     (special.fireRes = 0);
    //   initialProperties.hasOwnProperty("specialfrostRes") ?
    //     (special.frostRes = parseInt(initialProperties.specialfrostRes)) :
    //     (special.frostRes = 0);
    //   initialProperties.hasOwnProperty("specialenergyRes") ?
    //     (special.energyRes = parseInt(initialProperties.specialenergyRes)) :
    //     (special.energyRes = 0);
    //   initialProperties.hasOwnProperty("specialcurseRes") ?
    //     (special.curseRes = parseInt(initialProperties.specialcurseRes)) :
    //     (special.curseRes = 0);
    //   initialEquipment.special = new Item(special);
    // } else {
    //   initialEquipment.special = null;
    // }
    // let skillSet = new SkillSet(
    //   initialProperties.className,
    //   database.skills
    // );
    // for (let i = 1; i < 18; i++) {
    //   skillSet["skill" + i].level = parseInt(initialProperties["skill" + i]);
    //   skillSet["skill" + i].requiredCharLevel += (skillSet["skill" + i].level - skillSet["skill" + i].minLvl) * skillSet["skill" + i].requiredCharLevelInc
    // }
    // let initialSkills = {};
    // initialSkills.skillPts = parseInt(initialProperties.skillPts);
    // let characterProperties = {
    //   level: parseInt(initialProperties.level),
    //   skillSet: skillSet,
    //   className: initialProperties.className,
    //   initialStats: initialStats,
    //   initialEquipment: initialEquipment,
    //   initialSkills: initialSkills
    // }
    return characterProperties
  }
};

function getUrlVars(url: string): { [key: string]: string } {
  	var params: { [key: string]: string } = {};
  	var parser = document.createElement('a');
  	parser.href = url;
  	var query = parser.search.substring(1);
  	var vars = query.split('&');
  	for (var i = 0; i < vars.length; i++) {
  		var pair = vars[i].split('=');
  		params[pair[0]] = decodeURIComponent(pair[1]);
  	}
  	return params;
  };

export { importBuild }
