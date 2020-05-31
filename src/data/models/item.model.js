export class Item {
  constructor(item) {
    this.name = item.name;
    this.type = item.type;
    this.image = item.image;

    if (item.hasOwnProperty("otherProperties")) {
      this.otherProperties = item.otherProperties;
    } else {
      this.otherProperties = []
    };
    if (item.hasOwnProperty("rarity")) {
      this.rarity = item.rarity
    } else {
      this.rarity = "Rzadki"
    };
    if (item.hasOwnProperty("class")) {
      this.class = item.class
    } else {
      this.class = null
    };
    if (item.hasOwnProperty("set")) {
      this.set = item.set
    } else {
      this.set = null
    };
    if (item.type === "weapon") {
      this.damageType = item.damageType;
      this.weaponType = item.weaponType;
    } else {
      this.damageType = null;
      this.weaponType = null;
    }
    let properties = ["reqLvl", "reqStr", "reqAgi", "reqPow", "reqKno", "strength", "agility", "power", "knowledge", "hp", "mana", "endurance", "cutRes", "bluntRes", "pierceRes", "fireRes", "energyRes", "frostRes", "curseRes", "damage"];
    properties.forEach((itemProperty) => {
      if (item.hasOwnProperty(itemProperty)) {
        this[itemProperty] = item[itemProperty]
      } else {
        this[itemProperty] = 0
      };
    });
  }
}
