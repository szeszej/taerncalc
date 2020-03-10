// lista itemów ma się pojawiać bliżej slotu
//dodanie customowych itemów po naciśnięciu gwiazdki
//wsparcie dla setów
//wsparcie dla ładowania psychorarów
//tooltipy na liscie wyboru i w ekwipunku
//wyostrzyć ramki w statach?
//pierścionki nie działają
//sprawdzenie wymagań przedmiotu

import React from 'react';
import {ItemsList} from "./Items.js";

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.state = {
      equipment:{
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
      boots: null
    },
      displayList: false,
      itemsList: null,
      statsFromItems: {}
    }
  }
  componentDidUpdate(prevProps, prevState) {
      let equipmentTypes = Object.keys(this.state.equipment);
      let equipment = equipmentTypes.map(x => this.state.equipment[x]);
      let equipmentStats = {
        strength: equipment.reduce((total, x) => x != null ? total += x.strength : total += 0, 0),
        agility: equipment.reduce((total, x) => x != null ? total += x.agility : total += 0, 0),
        power: equipment.reduce((total, x) => x != null ? total += x.power : total += 0, 0),
        knowledge: equipment.reduce((total, x) => x != null ? total += x.knowledge : total += 0, 0),
        hp: equipment.reduce((total, x) => x != null ? total += x.hp : total += 0, 0),
        endurance: equipment.reduce((total, x) => x != null ? total += x.endurance : total += 0, 0),
        mana: equipment.reduce((total, x) => x != null ? total += x.mana : total += 0, 0),
        damage: equipment.reduce((total, x) => x != null ? total += x.damage : total += 0, 0),
        fireRes: equipment.reduce((total, x) => x != null ? total += x.fireRes : total += 0, 0),
        frostRes: equipment.reduce((total, x) => x != null ? total += x.frostRes : total += 0, 0),
        energyRes: equipment.reduce((total, x) => x != null ? total += x.energyRes : total += 0, 0),
        curseRes: equipment.reduce((total, x) => x != null ? total += x.curseRes : total += 0, 0),
        pierceRes: equipment.reduce((total, x) => x != null ? total += x.pierceRes : total += 0, 0),
        cutRes: equipment.reduce((total, x) => x != null ? total += x.cutRes : total += 0, 0),
        bluntRes: equipment.reduce((total, x) => x != null ? total += x.bluntRes : total += 0, 0)
      }
      if (this.isEquivalent(prevState.statsFromItems, equipmentStats) === false) {
        this.setState({statsFromItems: equipmentStats})
        this.props.addStatsFromEquipment(equipmentStats)
      }
  }
  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
          return false;
      }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
  showItemsList (filteredItems) {
    this.setState({
      displayList: true,
      itemsList: filteredItems
    })
  }
  hideItemsList () {
    this.setState({
      displayList: false,
      itemsList: null
    })
  }
  setItemBackground (image) {
    let itemBackground = {
      backgroundImage: `url("/images/items/` + image + `")`
    }
    return itemBackground
  }
  equipItem (item) {
    this.setState(prevState => {
      let newState = prevState;
      newState.equipment[item.type] = item;
      newState.displayList = false;
      newState.itemsList = null;
      return newState
    })
  }
  unequipItems() {
    this.setState({
        equipment:{
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
          boots: null
        }
      }
    )
  }
  render() {
    let classBackground = {
      backgroundImage: `url("/images/` + this.props.class + `.svg")`
    }
    return (
      <div className="equipment">
        {this.state.displayList && this.state.itemsList !== null ? <ItemsList filteredItems={this.state.itemsList} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} hideItemsList={this.hideItemsList} /> : null}
        <div className="armor" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "armor"))} style={this.state.equipment.armor ? this.setItemBackground(this.state.equipment.armor.image) : null}></div>
        <div className="helmet" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "helmet"))} style={this.state.equipment.helmet ? this.setItemBackground(this.state.equipment.helmet.image) : null}></div>
        <div className="neck" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "neck"))} style={this.state.equipment.neck ? this.setItemBackground(this.state.equipment.neck.image) : null}></div>
        <div className="gloves" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "gloves"))} style={this.state.equipment.gloves ? this.setItemBackground(this.state.equipment.gloves.image) : null}></div>
        <div className="cape" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "cape"))} style={this.state.equipment.cape ? this.setItemBackground(this.state.equipment.cape.image) : null}></div>
        <div className="weapon" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "weapon"))} style={this.state.equipment.weapon ? this.setItemBackground(this.state.equipment.weapon.image) : null}></div>
        <div className="special"></div>
        <div className="shield" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "shield"))} style={this.state.equipment.shield ? this.setItemBackground(this.state.equipment.shield.image) : null}></div>
        <div className="pants" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "pants"))} style={this.state.equipment.pants ? this.setItemBackground(this.state.equipment.pants.image) : null}></div>
        <div className="belt" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "belt"))} style={this.state.equipment.belt ? this.setItemBackground(this.state.equipment.belt.image) : null}></div>
        <div className="ring1" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "ring"))} style={this.state.equipment.ring1 ? this.setItemBackground(this.state.equipment.ring1.image) : null}></div>
        <div className="ring2" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "ring"))} style={this.state.equipment.ring2 ? this.setItemBackground(this.state.equipment.ring2.image) : null}></div>
        <div className="boots" onClick={() => this.showItemsList(this.props.items.filter(x => x.type === "boots"))} style={this.state.equipment.boots ? this.setItemBackground(this.state.equipment.boots.image) : null}></div>
        <div className="empty" onClick={() => this.unequipItems()}></div>
        <div className="middle" style={classBackground}></div>
      </div>
    );
  }
}

export {Equipment};
