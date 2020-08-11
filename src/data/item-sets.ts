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
},
{
  name: "Gniew Żywiołów",
  pieces: 4,
  mana: 160,
  otherProperties: [
    ["Modyfikator obrażeń fizycznych:", 15],
    ["Modyfikator obrażeń magicznych:", 15]
  ]
},
{
  name: "Żądło Bogów",
  pieces: 4,
  agility: 16,
  otherProperties: [
    ["Regeneracja many:", 12],
    ["Regeneracja kondycji:", 12],
    ["Szansa na trafienie krytyczne:", 8]
  ]
},
{
  name: "Ryk Północy",
  pieces: 5,
  agility: 16,
  otherProperties: [
    ["Modyfikator obrażeń fizycznych:", 10],
    ["Szansa na trafienie krytyczne:", 10]
  ]
},
{
  name: "Sztorm Haugura",
  pieces: 4,
  hp: 160,
  otherProperties: [
    ["Zużycie kondycji:", -8],
    ["Szansa na trafienie krytyczne:", 10]
  ]
},
{
  name: "Ostrze Równowagi",
  pieces: 4,
  hp: 160,
  otherProperties: [
    ["Regeneracja many:", 12],
    ["Szansa na podwójny atak:", 10]
  ]
},
{
  name: "Ukazanie Killarasuna",
  pieces: 4,
  hp: 190,
  otherProperties: [
    ["Zużycie Many:", -10],
    ["Szansa na podwójny atak:", 8]
  ]
},
{
  name: "Szaty Płynnego Ognia",
  pieces: 4,
  mana: 160,
  otherProperties: [
    ["Modyfikator obrażeń magicznych:", 10],
    ["Szansa na podwójny atak:", 5]
  ]
},
{
  name: "Pancerz Vorlingów",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Rozproszenie Holma:", 9],
    ["Obrona wręcz:", 10],
    ["Odporność na trafienie krytyczne:", 9],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
},
{
  name: "Dusza Świata",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Rozproszenie Holma:", 9],
    ["Modyfikator trafień fizycznych:", 15],
    ["Szansa na podwójny atak:", 5],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
},
{
  name: "Oko Bogów",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Rozproszenie Holma:", 9],
    ["Modyfikator trafień fizycznych:", 15],
    ["Modyfikator trafień dystansowych:", 15],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
},
{
  name: "Pancerz Nieśmiertelności",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Rozproszenie Holma:", 9],
    ["Modyfikator obrażeń fizycznych:", 15],
    ["Modyfikator trafień fizycznych:", 15],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
},
{
  name: "Pancerz Żywiołów",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Skok Farida:", 7],
    ["Przełamanie dymków:", 9],
    ["Modyfikator obrażeń magicznych:", 15],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
},
{
  name: "Pocałunek Miliona Gwiazd",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Skok Farida:", 7],
    ["Modyfikator obrażeń fizycznych:", 15],
    ["Modyfikator obrażeń magicznych", 15],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
},
{
  name: "Zasłona Śmierci",
  pieces: 5,
  hp: 250,
  otherProperties: [
    ["Skok Farida:", 7],
    ["Modyfikator trafień magicznych:", 15],
    ["Przełamanie dymków:", 9],
    ["Dodatkowe PA:", 1],
    ["Oszukać przeznaczenie:", 1]
  ]
}]

export const itemSets = itemSetData.map(x => new ItemSet(x))
