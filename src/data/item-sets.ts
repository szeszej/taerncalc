import { ItemSet } from "./models/item-set.model"
import { ItemSetProperties } from "./models/item-set.model"

const itemSetData: ItemSetProperties[] = [{
  name: "Resztki Reffa",
  pieces: 3,
  strength: 8,
  otherProperties: [
    ["Regeneracja Many:", 0.12],
    ["Regeneracja Kondycji:", 0.12],
    ["Rozproszenie Holma:", 0.1]
  ]
}]

export const itemSets = itemSetData.map(x => new ItemSet(x))
