import React from 'react';

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      armor: null,
      helmet: null,
      neck: null,
      gloves: null,
      cape: null,
      weapon: null,
      special: null,
      shield: null,
      pants: null,
      belt: null,
      ring1: null,
      ring2: null,
      boots: null,
      displayList: false,
      itemsList: null,
    }
  }
  showItemsList (filteredItems) {
    let itemComponents = <div className={"itemsList"}>{filteredItems.map(x => <ItemComponent key={x.name} item={x} />)}</div>;
    console.log(itemComponents);
    this.setState({
      displayList: true,
      itemsList: itemComponents
    })
  }
  render() {
    let classBackground = {
      backgroundImage: `url("/images/` + this.props.class + `.svg")`
    }
    return (
      <div className="equipment">
        {this.state.displayList && this.state.itemsList !== null ? this.state.itemsList : null}
        <div className="armor" onClick={() => this.showItemsList(items.filter(x => x.type === "armor"))}></div>
        <div className="helmet" onClick={() => this.showItemsList(items.filter(x => x.type === "helmet"))}></div>
        <div className="neck" onClick={() => this.showItemsList(items.filter(x => x.type === "neck"))}></div>
        <div className="gloves" onClick={() => this.showItemsList(items.filter(x => x.type === "gloves"))}></div>
        <div className="cape" onClick={() => this.showItemsList(items.filter(x => x.type === "cape"))}></div>
        <div className="weapon" onClick={() => this.showItemsList(items.filter(x => x.type === "weapon"))}></div>
        <div className="special"></div>
        <div className="shield" onClick={() => this.showItemsList(items.filter(x => x.type === "shield"))}></div>
        <div className="pants" onClick={() => this.showItemsList(items.filter(x => x.type === "pants"))}></div>
        <div className="belt" onClick={() => this.showItemsList(items.filter(x => x.type === "belt"))}></div>
        <div className="ring1" onClick={() => this.showItemsList(items.filter(x => x.type === "ring"))}></div>
        <div className="ring2" onClick={() => this.showItemsList(items.filter(x => x.type === "ring"))}></div>
        <div className="boots" onClick={() => this.showItemsList(items.filter(x => x.type === "boots"))}></div>
        <div className="empty"></div>
        <div className="middle" style={classBackground}></div>
      </div>
    );
  }
}

class ItemComponent extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    let itemImage = {
      backgroundImage: `url("/images/items/` + this.props.item.image + `")`
    }
    console.log(itemImage);
    return(
      <div className="itemOnList" style={itemImage}></div>
    )
  }
}

class Item {
  constructor (item) {
    this.name = item.name;
    this.type = item.type;
    this.image = item.image;
    this.otherProperties = item.otherProperties;
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

const itemDatabase = [
  {
    name: "Trójząb Admiralski",
    type: "weapon",
    image: "[www.taernopedia.pl][372]TrC3B3jzC485b20Admiralski.png",
    rarity: "Psychorare",
    reqLvl: 115,
    reqPow: 115,
    damageType: "Obuchowe",
    weaponType: "Jednoręczna",
    damage: 165,
    power: 26,
    knowledge: 32,
    hp: 170,
    mana: 50,
    otherProperties: ["Szansa na trafienie krytyczne 4% (+1% co poziom)", "Modyfikator obrażeń magicznych 4% (+1% na poziom)"]
  },
  {
    name: "Ból",
    type: "weapon",
    image: "[www.taernopedia.pl][34]BC3B3l.png",
    rarity: "Psychorare",
    reqLvl: 120,
    reqPow: 120,
    reqKno: 120,
    damageType: "Kłute",
    weaponType: "Jednoręczna",
    damage: 150,
    power: 17,
    knowledge: 22,
    hp: 80,
    mana: 80,
    endurance: 50,
    otherProperties: ["Szansa na trafienie krytyczne 2% (+1% co poziom)", "Szansa na podwójny atak 2% (+1% na poziom)"]
  },
  {
    name: "Cierń",
    type: "weapon",
    image: "[www.taernopedia.pl][491]CierC584.png",
    rarity: "Psychorare",
    reqLvl: 115,
    reqStr: 115,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: 250,
    strength: 15,
    agility: 21,
    hp: 170,
    endurance: 70,
    otherProperties: ["Szansa na trafienie krytyczne 4% (+1% co poziom)", "Dodatkowe obrażenia od energii: 5% (+1% na poziom)"]
  },
  {
    name: "Attawa",
    type: "weapon",
    image: "[www.taernopedia.pl][335]Attawa.png",
    rarity: "Epik",
    class: "voodoo",
    reqLvl: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: "100 + poziom",
    power: 10,
    knowledge: 20,
    hp: 50,
    mana: 50,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Modyfikator obrażeń magicznych: 12% (+1% na poziom)"]
  },
  {
    name: "Żmij",
    type: "weapon",
    image: "[www.taernopedia.pl][695]C5BBmij.png",
    rarity: "Epik",
    class: "firemage",
    reqLvl: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: "100 + poziom",
    power: 20,
    knowledge: 10,
    hp: 100,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Szansa na podwójny atak: 10% (+1% na poziom)"]
  },
  {
    name: "Latarnia Życia",
    type: "weapon",
    image: "[www.taernopedia.pl][762]Latarnia20C5BBycia.png",
    rarity: "Epik",
    class: "druid",
    reqLvl: 60,
    damageType: "Obuchowe",
    weaponType: "Dwuręczna",
    damage: "100 + poziom",
    power: 10,
    knowledge: 20,
    hp: 50,
    mana: 50,
    otherProperties: ["Dodatkowe PA: 1", "Wyssanie many: 8% (+1% na poziom)", "Szansa na trafienie krytyczne: 9% (+1% na poziom)"]
  },
  {
    name: "Imisindo",
    type: "weapon",
    image: "[www.taernopedia.pl][584]Imisindo.png",
    rarity: "Epik",
    class: "archer",
    reqLvl: 60,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: "85 + poziom",
    strength: 10,
    agility: 10,
    hp: 150,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Modyfikator trafień dystansowych: 20% (+2% na poziom)"]
  },
  {
    name: "Washi",
    type: "weapon",
    image: "[www.taernopedia.pl][457]Washi.png",
    rarity: "Epik",
    class: "sheed",
    reqLvl: 60,
    damageType: "Kłute",
    weaponType: "Dwuręczna",
    damage: "95 + poziom",
    strength: 10,
    agility: 10,
    hp: 150,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Szansa na trafienie krytyczne: 9% (+1% na poziom)", "Modyfikator obrażeń fizycznych: 12% (+1% na poziom)"]
  },
  {
    name: "Gorthdar",
    type: "weapon",
    image: "[www.taernopedia.pl][272]Gorthdar.png",
    rarity: "Epik",
    class: "barbarian",
    reqLvl: 60,
    damageType: "Sieczne",
    weaponType: "Dwuręczna",
    damage: "110 + poziom",
    strength: 15,
    agility: 10,
    hp: 100,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Dodatkowe obrażenia od ognia: 12% (+1% na poziom)", "Szansa na trafienie krytyczne: 9% (+1% na poziom)"]
  },
  {
    name: "Allenor",
    type: "weapon",
    image: "[www.taernopedia.pl][377]Allenor.png",
    rarity: "Epik",
    class: "knight",
    reqLvl: 60,
    damageType: "Sieczne",
    weaponType: "Jednoręczna",
    damage: "80 + poziom",
    strength: 10,
    agility: 10,
    knowledge: 5,
    hp: 100,
    endurance: 50,
    otherProperties: ["Dodatkowe PA: 1", "Modyfikator obrażeń fizycznych: 12% (+1% na poziom)", "Szansa na trafienie krytyczne: 9% (+1% na poziom)"]
  },
  {
    name: "Kil",
    type: "shield",
    image: "[www.taernopedia.pl][849]Kil.png",
    reqLvl: 110,
    reqStr: 120,
    reqAgi: 110,
    strength: 15,
    agility: 20,
    hp: 270,
    mana: 80,
    endurance: 100,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40
  },
  {
    name: "Karapaks",
    type: "shield",
    image: "[www.taernopedia.pl][903]Karapaks.png",
    reqLvl: 85,
    reqStr: 90,
    reqAgi: 90,
    strength: 10,
    agility: 10,
    hp: 200,
    endurance: 100,
    cutRes: 40,
    bluntRes: 40,
    pierceRes: 40
  },
  {
  name: "Smuga",
  type: "shield",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][736]Smuga.png",
  reqLvl: 75,
  reqStr: 50,
  reqPow: 80,
  power: 10,
  knowledge: 15,
  hp: 200,
  mana: 50,
  cutRes: 32,
  bluntRes: 30,
  pierceRes: 33
  },
  {
  name: "Pamięć Morany",
  type: "helmet",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][503]PamiC499C48720Morany.png",
  reqLvl: 120,
  reqStr: 115,
  reqAgi: 120,
  strength: 23,
  agility: 33,
  hp: 270,
  mana: 20,
  endurance: 100,
  cutRes: 40,
  bluntRes: 40,
  pierceRes: 40,
  curseRes: 15,
  fireRes: 15,
  energyRes: 15,
  frostRes: 15,
  otherProperties: ["Modyfikator obrażeń fizycznych: 7% (+1% co poziom)", "Obrona przeciw urokom: 3% (+2% na poziom)", "Odporność na zamrożenie: 10% (+2% co poziom)"]
  },
  {
  name: "Miłość Morany",
  type: "helmet",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][434]MiC582oC59BC48720Morany.png",
  reqLvl: 120,
  reqPow: 115,
  reqKno: 120,
  power: 23,
  knowledge: 28,
  hp: 310,
  mana: 130,
  cutRes: 40,
  bluntRes: 40,
  pierceRes: 40,
  curseRes: 15,
  fireRes: 15,
  energyRes: 15,
  frostRes: 15,
  otherProperties: ["Modyfikator obrażeń magicznych: 7% (+1% co poziom)", "Obrona wręcz: 3% (+2% na poziom)", "Odporność na zamrożenie: 10% (+2% co poziom)"]
  },
  {
  name: "Htagan",
  type: "helmet",
  image: "[www.taernopedia.pl][1]Htagan.png",
  reqLvl: 100,
  reqPow: 105,
  power: 20,
  knowledge: 15,
  hp: 250,
  mana: 50,
  cutRes: 35,
  bluntRes: 35,
  pierceRes: 35,
  curseRes: 10
  },
  {
  name: "Zalla",
  type: "armor",
  rarity: "Psychorare",
  image: "Zalla.png",
  reqLvl: 135,
  reqPow: 50,
  reqKno: 50,
  power: 22,
  knowledge: 37,
  hp: 280,
  mana: 100,
  endurance: 30,
  cutRes: 45,
  bluntRes: 45,
  pierceRes: 45,
  curseRes: 20,
  fireRes: 20,
  energyRes: 20,
  frostRes: 20,
  otherProperties: ["Podwójne losowanie obrony: 2% (+2% co poziom)", "Redukcja otrzymanych obrażeń: 2% (+1% na poziom)", "Obrona wręcz: 2% (+2% co poziom)"]
  },
  {
  name: "Salmurn",
  type: "armor",
  rarity: "Psychorare",
  image: "Salmurn.png",
  reqLvl: 135,
  reqStr: 50,
  reqAgi: 50,
  strength: 25,
  agility: 34,
  hp: 230,
  endurance: 100,
  mana: 80,
  cutRes: 50,
  bluntRes: 50,
  pierceRes: 50,
  curseRes: 15,
  fireRes: 15,
  energyRes: 15,
  frostRes: 15,
  otherProperties: ["Podwójne losowanie obrony: 2% (+2% co poziom)", "Redukcja otrzymanych obrażeń: 2% (+1% na poziom)", "Obrona przeciw urokom: 2% (+2% co poziom)"]
  },
  {
  name: "Dmorlung",
  type: "armor",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][932]Dmorlung.png",
  reqLvl: 95,
  reqStr: 100,
  strength: 18,
  agility: 18,
  hp: 150,
  endurance: 120,
  mana: 20,
  cutRes: 40,
  bluntRes: 40,
  pierceRes: 40,
  frostRes: 15
  },
  {
  name: "Cień Tarula",
  type: "cape",
  rarity: "Psychorare",
  image: "Cień_Tarula.png",
  reqLvl: 130,
  reqPow: 130,
  power: 26,
  knowledge: 24,
  hp: 200,
  mana: 80,
  endurance: 20,
  otherProperties: ["Podwójne losowanie trafienia: 4% (+1% co poziom)", "Redukcja otrzymanych obrażeń krytycznych: 7% (+4% na poziom)", "Zużycie many: -2% (-2% co poziom)"]
  },
  {
  name: "Admiralski gronostaj",
  type: "cape",
  image: "[www.taernopedia.pl][869]Admiralski20Gronostaj.png",
  reqLvl: 115,
  reqStr: 100,
  strength: 15,
  agility: 32,
  hp: 170,
  mana: 80,
  endurance: 130,
  otherProperties: ["Podwójne losowanie trafienia: +2% (+1% co poziom)", "Szansa na odczarowanie: +7% (+1% na poziom)"]
  },
  {
  name: "Hańba Seleny",
  type: "cape",
  image: "[www.taernopedia.pl][5]HaC584ba20Seleny.png",
  reqLvl: 115,
  reqPow: 100,
  power: 12,
  knowledge: 20,
  hp: 250,
  mana: 180,
  endurance: 20,
  curseRes: 15,
  fireRes: 15,
  energyRes: 15,
  frostRes: 15
  },
  {
  name: "Ziraki",
  type: "pants",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][91]Ziraki.png",
  reqLvl: 130,
  reqStr: 130,
  strength: 27,
  agility: 23,
  hp: 180,
  endurance: 80,
  mana: 40,
  cutRes: 30,
  bluntRes: 30,
  pierceRes: 30,
  otherProperties: ["Podwójne losowanie trafienia: 4% (+1% co poziom)", "Redukcja otrzymanych obrażeń krytycznych: 7% (+4% na poziom)", "Zużycie kondycji: -2% (-2% co poziom)"]
  },
  {
  name: "Temary II",
  type: "pants",
  rarity: "Psychorare",
  image: "Temary.png",
  reqLvl: 125,
  reqPow: 50,
  reqKno: 50,
  knowledge: 25,
  hp: 750,
  cutRes: 45,
  bluntRes: 45,
  pierceRes: 45,
  curseRes: 20,
  fireRes: 20,
  energyRes: 20,
  frostRes: 20,
  otherProperties: ["Redukcja otrzymanych obrażeń biernych: 1% (+2% co poziom)", "Szansa na odczarowanie: 1% (+1% na poziom)"]
  },
  {
  name: "Udręki",
  type: "pants",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][131]UdrC499ki.png",
  reqLvl: 110,
  reqPow: 100,
  power: 10,
  knowledge: 30,
  hp: 250,
  mana: 110,
  cutRes: 39,
  bluntRes: 39,
  pierceRes: 39,
  otherProperties: ["Modyfikator obrażeń magicznych: 4% (+1% co poziom)", "Przełamanie odporności na urok: 4% (+1% na poziom)"]
  },
  {
  name: "Arhauty II",
  type: "boots",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][361]Arhauty20II.png",
  reqLvl: 125,
  reqStr: 50,
  reqAgi: 50,
  agility: 25,
  hp: 750,
  cutRes: 50,
  bluntRes: 50,
  pierceRes: 50,
  curseRes: 15,
  fireRes: 15,
  energyRes: 15,
  frostRes: 15,
  otherProperties: ["Redukcja otrzymanych obrażeń biernych: 1% (+2% co poziom)", "Szansa na odczarowanie: 1% (+1% na poziom)"]
  },
  {
  name: "Envile",
  type: "boots",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][637]Envile.png",
  reqLvl: 120,
  reqPow: 100,
  power: 25,
  knowledge: 28,
  hp: 160,
  mana: 110,
  cutRes: 30,
  bluntRes: 30,
  pierceRes: 30,
  otherProperties: ["Szansa na podwójny atak: +2% (+1% co poziom)", "Modyfikator obrażeń magicznych: 2% (+1% na poziom)"]
  },
  {
  name: "Cierpiętniki",
  type: "boots",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][134]CierpiC499tniki.png",
  reqLvl: 110,
  reqStr: 100,
  reqAgi: 50,
  strength: 22,
  agility: 28,
  hp: 240,
  endurance: 110,
  cutRes: 40,
  bluntRes: 40,
  pierceRes: 40,
  otherProperties: ["Modyfikator obrażeń fizycznych: 4% (+1% co poziom)", "Modyfikator trafień fizycznych: 10% (+2% na poziom)"]
  },
  {
  name: "Objęcia Morany",
  type: "belt",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][202]ObjC499cia20Morany.png",
  reqLvl: 115,
  reqPow: 100,
  reqKno: 125,
  power: 22,
  knowledge: 29,
  hp: 230,
  mana: 160,
  otherProperties: ["Obrona wręcz: 5% (+2% co poziom)", "Obrona dystansowa: 3% (+2% na poziom)", "Obrona przeciw urokom: 1% (+2% co poziom)"]
  },
  {
  name: "Nienawiść Draugula",
  type: "belt",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][67]NienawiC59BC48720Draugula.png",
  reqLvl: 120,
  reqStr: 100,
  strength: 21,
  agility: 32,
  hp: 170,
  mana: 30,
  endurance: 50,
  otherProperties: ["Szansa na podwójny atak: +2% (+1% co poziom)", "Modyfikator obrażeń fizycznych: 2% (+1% na poziom)"]
  },
  {
  name: "Groza Seleny",
  type: "belt",
  image: "[www.taernopedia.pl][281]Groza20Seleny.png",
  reqLvl: 110,
  reqStr: 100,
  strength: 20,
  agility: 45,
  hp: 150,
  endurance: 50,
  frostRes: 10
  },
  {
  name: "Disolver",
  type: "ring",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][959]Disolver.png",
  reqLvl: 100,
  frostRes: 45,
  curseRes: 45,
  otherProperties: ["Odporność na zamrożenie: 20% (+2% co poziom)"]
  },
  {
  name: "Zagłada Ludów",
  type: "ring",
  image: "[www.taernopedia.pl][474]ZagC582ada20LudC3B3w.png",
  reqLvl: 110,
  reqStr: 100,
  strength: 30,
  agility: 30,
  hp: 100,
  mana: 20,
  endurance: 30
  },
  {
  name: "Przysięga Draugula",
  type: "ring",
  image: "[www.taernopedia.pl][409]PrzysiC499ga20Draugula.png",
  reqLvl: 110,
  reqPow: 100,
  power: 30,
  knowledge: 30,
  hp: 100,
  mana: 30,
  endurance: 20
  },
  {
  name: "Ortasis",
  type: "neck",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][392]Ortasis.png",
  reqLvl: 130,
  power: 20,
  knowledge: 20,
  hp: 100,
  mana: 70,
  endurance: 30,
  fireRes: 10,
  energyRes: 30,
  otherProperties: ["Modyfikator obrażeń magicznych: 3% (+1% co poziom)", "Szansa na odczarowanie: 3% (+1% co poziom)", "Redukcja otrzymanych obrażeń biernych: 6% (+2% co poziom)"]
  },
  {
  name: "Dorbis",
  type: "neck",
  rarity: "Psychorare",
  image: "Dorbis.png",
  reqLvl: 130,
  strength: 20,
  agility: 20,
  hp: 100,
  mana: 30,
  endurance: 70,
  fireRes: 10,
  energyRes: 30,
  otherProperties: ["Modyfikator obrażeń fizycznych: 3% (+1% co poziom)", "Szansa na odczarowanie: 3% (+1% co poziom)", "Redukcja otrzymanych obrażeń biernych: 6% (+2% co poziom)"]
  },
  {
  name: "Serce Seleny",
  type: "neck",
  image: "[www.taernopedia.pl][369]Serce20Seleny.png",
  reqLvl: 115,
  hp: 200,
  mana: 50,
  endurance: 50,
  curseRes: 50,
  fireRes: 50,
  energyRes: 50,
  frostRes: 50
  },
  {
  name: "Aeterus Passio",
  type: "gloves",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][750]Aeterus20Passio.png",
  reqLvl: 115,
  reqStr: 110,
  reqAgi: 125,
  strength: 30,
  agility: 30,
  hp: 250,
  endurance: 50,
  otherProperties: ["Obrona wręcz: 1% (+2% co poziom)", "Obrona dystansowa: 3% (+2% co poziom)", "Obrona przeciw urokom: 5% (+2% co poziom)"]
  },
  {
  name: "Skry Utoru",
  type: "gloves",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][45]Skry20Utoru.png",
  reqLvl: 115,
  reqPow: 100,
  power: 23,
  knowledge: 27,
  hp: 190,
  mana: 160,
  otherProperties: ["Modyfikator trafień dystansowych: +10% (+2% co poziom)", "Szansa na odczarowanie: +7% (+1% co poziom)"]
  },
  {
  name: "Szpony Seimhi",
  type: "gloves",
  rarity: "Psychorare",
  image: "[www.taernopedia.pl][348]Szpony20Seimhi.png",
  reqLvl: 115,
  reqPow: 100,
  power: 23,
  knowledge: 27,
  hp: 190,
  mana: 160,
  otherProperties: ["Modyfikator trafień magicznych: +10% (+2% co poziom)", "Szansa na odczarowanie: +7% (+1% co poziom)"]
  }
]

const items = itemDatabase.map(item => new Item(item));

export {Equipment};
