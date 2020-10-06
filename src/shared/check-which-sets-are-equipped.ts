import { Equipment } from "../store/equipment-reducer/equipment-reducer"

interface SetsEquipped {
    [key: string]: number
}

export function checkWhichSetsAreEquipped(equipment: Equipment): SetsEquipped {
  let equipmentTypes = Object.keys(equipment);
  let equippedItems = equipmentTypes.map((x) => equipment[x as keyof Equipment]);
  let setsEquipped = equippedItems.reduce((total: SetsEquipped, x) => {
    if (x !== null && x.hasOwnProperty("set") && x.set !== null) {
      if (total.hasOwnProperty(x.set)) {
        (total[x.set]) += 1;
        return total;
      } else {
        total[x.set] = 1;
        return total;
      }
    } else {
      return total;
    }
  }, {});
  return setsEquipped
}
