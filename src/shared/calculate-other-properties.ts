//Models
import { Equipment } from "../store/equipment-reducer/equipment-reducer";

//Shared functionality
import { checkWhichSetsAreEquipped } from "./check-which-sets-are-equipped";

//Data
import { itemSets } from "../data/item-sets";

export function calculateOtherProperties (equipment: Equipment) {
  let setsEquipped = checkWhichSetsAreEquipped(equipment);
  let propertiesOfSets = checkPropertiesOfSets(setsEquipped);
  let propertiesOfEquippedItems = checkOtherPropertiesOfItems(equipment);
  for (let property in propertiesOfSets) {
    if (
      propertiesOfSets.hasOwnProperty(property) &&
      propertiesOfSets[property] !== 0
    ) {
      if (propertiesOfEquippedItems.hasOwnProperty(property)) {
        propertiesOfEquippedItems[property] += propertiesOfSets[property];
      } else {
        propertiesOfEquippedItems[property] = propertiesOfSets[property];
      }
    }
  }
  return propertiesOfEquippedItems
}

function checkOtherPropertiesOfItems(equipment: Equipment) {
    let equipmentTypes = Object.keys(equipment);
    let equippedItems = equipmentTypes.map(
      (x) => equipment[x as keyof Equipment]
    );
    let otherPropertiesOfEquippedItems = equippedItems.reduce(
      (total: { [key: string]: number }, item) => {
        if (
          item !== null &&
          (item.rarity === "Psychorare" || item.rarity === "Epik") && item.psychoLvl
        ) {
          item.otherProperties.forEach((property) => {
            if (total.hasOwnProperty(property[0])) {
              total[property[0]] +=
                property[1] + property[2] * (item.psychoLvl - 1);
            } else {
              total[property[0]] =
                property[1] + property[2] * (item.psychoLvl - 1);
            }
          });
          return total;
        } else {
          return total;
        }
      },
      {}
    );
    return otherPropertiesOfEquippedItems;
  }

  function checkPropertiesOfSets(equippedSets: { [key: string]: number }) {
    let setsProperties: { [key: string]: number } = {};
    if (equippedSets) {
      for (let setName in equippedSets) {
        if (equippedSets.hasOwnProperty(setName)) {
          let set = itemSets.find((x) => x.name === setName);
          let setProperties = set!.getOtherPropertiesValuesDependingOnPiecesAsArray(
            equippedSets[setName]
          );
          setProperties.forEach((property) => {
            if (setsProperties.hasOwnProperty(property[0])) {
              setsProperties[property[0]] += property[1];
            } else {
              setsProperties[property[0]] = property[1];
            }
          });
        }
      }
    }
    return setsProperties;
  }
