//Shared functionality
import { checkWhichSetsAreEquipped } from "./check-which-sets-are-equipped";

//Data
import { itemSets } from "../data/item-sets";

//Types
import { Equipment } from "../store/equipment-reducer/equipment-reducer";
import { Item } from "../data/models/item.model";

//calculating how much total of each stat equipment provides
export function calculateStatsFromItems(
  equipment: Equipment,
  level: number
): StatsFromItems {
  let equipmentTypes = Object.keys(equipment);
  let equippedItems = equipmentTypes.map(
    (x) => equipment[x as keyof Equipment]
  );
  //calculating stats from sets
  let statsFromSets = calculateStateFromSets(equipment);
  let equipmentStats = {
    strength:
      equippedItems.reduce(
        (total, x) =>
          x != null
            ? (total += x.calculateTotalStat("strength"))
            : (total += 0),
        0
      ) + statsFromSets.strength,
    agility:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("agility")) : (total += 0),
        0
      ) + statsFromSets.agility,
    power:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("power")) : (total += 0),
        0
      ) + statsFromSets.power,
    knowledge:
      equippedItems.reduce(
        (total, x) =>
          x != null
            ? (total += x.calculateTotalStat("knowledge"))
            : (total += 0),
        0
      ) + statsFromSets.knowledge,
    hp:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("hp")) : (total += 0),
        0
      ) + statsFromSets.hp,
    endurance:
      equippedItems.reduce(
        (total, x) =>
          x != null
            ? (total += x.calculateTotalStat("endurance"))
            : (total += 0),
        0
      ) + statsFromSets.endurance,
    mana:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("mana")) : (total += 0),
        0
      ) + statsFromSets.mana,
    damage: calculateTotalDamage(equipment.weapon, equipment.special, level),
    fireRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.fireRes) : (total += 0)),
      0
    ),
    frostRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.frostRes) : (total += 0)),
      0
    ),
    energyRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.energyRes) : (total += 0)),
      0
    ),
    curseRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.curseRes) : (total += 0)),
      0
    ),
    pierceRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.pierceRes) : (total += 0)),
      0
    ),
    cutRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.cutRes) : (total += 0)),
      0
    ),
    bluntRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.bluntRes) : (total += 0)),
      0
    ),
  };
  return equipmentStats;
}

//calculating how much total of each stat item sets provide
function calculateStateFromSets(equipment: Equipment): Stats {
  let setsEquipped = checkWhichSetsAreEquipped(equipment);
  let statsFromSets = {
    hp: 0,
    mana: 0,
    endurance: 0,
    strength: 0,
    agility: 0,
    power: 0,
    knowledge: 0,
  };
  if (Object.keys(setsEquipped).length > 0) {
    for (let key in setsEquipped) {
      if (setsEquipped.hasOwnProperty(key)) {
        let equippedSet = itemSets.find((x) => x.name === key);
        let eqippedSetProperties = equippedSet!.getValuesDependingOnPieces(
          setsEquipped[key]
        );
        statsFromSets.hp += eqippedSetProperties.hp;
        statsFromSets.mana += eqippedSetProperties.mana;
        statsFromSets.endurance += eqippedSetProperties.endurance;
        statsFromSets.strength += eqippedSetProperties.strength;
        statsFromSets.agility += eqippedSetProperties.agility;
        statsFromSets.power += eqippedSetProperties.power;
        statsFromSets.knowledge += eqippedSetProperties.knowledge;
      }
    }
  }
  return statsFromSets;
}

function calculateTotalDamage(
  weapon: Item | null,
  special: Item | null,
  level: number
) {
  let totalDamage = 0;
  if (weapon) {
    totalDamage += weapon.calculateTotalDamage(level);
  }
  if (special) {
    totalDamage += special.damage;
  }
  return totalDamage;
}

interface Resists {
  bluntRes: number;
  cutRes: number;
  pierceRes: number;
  fireRes: number;
  energyRes: number;
  curseRes: number;
  frostRes: number;
}

interface Stats {
  hp: number;
  mana: number;
  endurance: number;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
}

interface StatsFromItems extends Resists, Stats {
  damage: number;
}
