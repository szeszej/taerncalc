import { ItemSet } from "./models/item-set.model"
import { ItemSetProperties } from "./models/item-set.model"

const itemSetData: ItemSetProperties[] = [{
  name: "Resztki Reffa",
  pieces: 3,
  strength: 8,
  otherProperties: [
    ["Regeneracja Many:", 12],
    ["Regeneracja Kondycji:", 12],
    ["Rozproszenie Holma:", 10]
  ]
},
{
  name: "Okowy Snu",
  pieces: 3,
  hp: 50,
  otherProperties: [
    ["Szansa na trafienie krytyczne:", 8]
  ]
},
{
  name: "Światła Tellabagu",
  pieces: 3,
  hp: 100,
  otherProperties: [
    ["Modyfikator obrażeń fizycznych:", 10],
    ["Modyfikator obrażeń magicznych:", 10]
  ]
},
{
  name: "Przebranie Ludobójcy",
  pieces: 4,
  otherProperties: [
    ["Skok Farida:", 10],
    ["Szansa na podwójny atak:", 6]
  ]
},
{
  name: "Zbroja Pinari",
  pieces: 3,
  hp: 40,
  otherProperties: [
    ["Odporność na korzenie:", 35],
    ["Szansa na podwójny atak:", 8]
  ]
}]

export const itemSets = itemSetData.map(x => new ItemSet(x))
