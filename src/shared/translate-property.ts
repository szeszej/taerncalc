//Function that translated property names into Polish
export default function translateProperty(property: string): string {
  let inPolish = "";
  switch (property) {
    case "strength":
      inPolish = "Siła";
      break;
    case "agility":
      inPolish = "Zręczność";
      break;
    case "knowledge":
      inPolish = "Wiedza";
      break;
    case "power":
      inPolish = "Moc";
      break;
    case "hp":
      inPolish = "Punkty życia";
      break;
    case "mana":
      inPolish = "Mana";
      break;
    case "endurance":
      inPolish = "Kondycja";
      break;
    case "damage":
      inPolish = "Obrażenia";
      break;
    case "cutRes":
      inPolish = "Odp. na sieczne";
      break;
    case "bluntRes":
      inPolish = "Odp. na obuchowe";
      break;
    case "pierceRes":
      inPolish = "Odp. na kłute";
      break;
    case "fireRes":
      inPolish = "Odp. na ogień";
      break;
    case "frostRes":
      inPolish = "Odp. na zimno";
      break;
    case "curseRes":
      inPolish = "Odp. na uroki";
      break;
    case "energyRes":
      inPolish = "Odp. na energię";
      break;
    case "class":
      inPolish = "Klasa";
      break;
    case "rare":
      inPolish = "Rzadkie";
      break;
    case "psychoRare":
      inPolish = "Psychorar";
      break;
    case "set":
      inPolish = "Zestaw";
      break;
    default:
      inPolish = "błąd";
      break;
  }
  return inPolish;
}
