import React from 'react';

class Equipment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="equipment">
        <div className="armor"></div>
        <div className="helmet"></div>
        <div className="neck"></div>
        <div className="gloves"></div>
        <div className="cape"></div>
        <div className="weapon"></div>
        <div className="special"></div>
        <div className="shield"></div>
        <div className="pants"></div>
        <div className="belt"></div>
        <div className="ring1"></div>
        <div className="ring2"></div>
        <div className="boots"></div>
        <div className="empty"></div>
        <div className="middle"></div>
      </div>
    );
  }
}

class Item {
  constructor (item) {
    this.name = item.name;
    this.type = item.type;
    this.image = item.image;
    if (item.hasOwnProperty("rarity")) {
      this.rarity = item.rarity
    } else {
      this.rarity = "Rzadki"
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
    let properties = ["reqLvl", "reqStr", "reqAgi", "reqPow", "reqKnow", "strength", "agility", "power", "knowledge", "hp", "mana", "endurance", "cutRes", "bluntRes", "pierceRes", "fireRes", "energyRes", "frostRes", "curseRes", "damage"];
    properties.forEach((itemProperty) => {
      if (item.hasOwnProperty(itemProperty)) {
        this[itemProperty] = item[itemProperty]
      } else {
        this[itemProperty] = 0
      };
    });
  }
}

const itemDatabase = [
  {
    name: "Trójząb Admiralski",
    type: "weapon",
    image: "[www.taernopedia.pl][372]TrC3B3jzC485b20Admiralski.png",
    reqLvl: 115,
    reqPow: 115,
    damageType: "Obuchowe",
    weaponType: "Jednoręczna",
    damage: 165,
    power: 26,
    knowledge: 32,
    hp: 170,
    mana: 50
  },
  {
    name: "Ból",
    type: "weapon",
    image: "[www.taernopedia.pl][34]BC3B3l.png",
    reqLvl: 120,
    reqPow: 120,
    reqKnow: 120,
    damageType: "Kłute",
    weaponType: "Jednoręczna",
    damage: 150,
    power: 17,
    knowledge: 22,
    hp: 80,
    mana: 80,
    endurance: 50
  }
]

const items = itemDatabase.map(item => new Item(item));
console.log(items);

export {Equipment};
