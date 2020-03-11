//dodanie customowych itemów po naciśnięciu gwiazdki
//wsparcie dla setów
//wsparcie dla ładowania psychorarów
//wyostrzyć ramki w statach?
//odekwipowanie jak item nie spełnia wymagań

import React from 'react';
import {ItemsList, ItemTooltip} from "./Items.js";

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
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
  equipItem (item, type) {
    if (type === "weapon" && item.weaponType === "Dwuręczna") {
      this.setState(prevState => {
        let newState = prevState;
        newState.equipment.shield = null;
        newState.equipment[type] = item;
        return newState
      })
    } else if (type === "shield" && this.state.equipment.weapon !== null && this.state.equipment.weapon.weaponType === "Dwuręczna") {
      this.setState(prevState => {
        let newState = prevState;
        newState.equipment.weapon = null;
        newState.equipment[type] = item;
        return newState
      })
    } else {
      this.setState(prevState => {
        let newState = prevState;
        newState.equipment[type] = item;
        return newState
      })
    }
  }
  unequipItem(slot) {
    this.setState(prevState => {
      let newState = prevState;
      newState.equipment[slot] = null;
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
    let equipmentSlots = Object.keys(this.state.equipment);
    let equipmentSlotComponents = equipmentSlots.map(x => <ItemSlot key={x} type={x} items={x === "ring1" || x === "ring2" ? this.props.items.filter(y => y.type === "ring") : this.props.items.filter(y => y.type === x)} inSlot={this.state.equipment[x]} equipItem={this.equipItem} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} unequipItem={this.unequipItem} />);
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <div className="empty" onClick={() => this.unequipItems()}></div>
        <div className="middle" style={classBackground}></div>
      </div>
    );
  }
}

class ItemSlot extends React.Component {
  constructor (props) {
    super(props);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.state = {
      displayList: false,
      displayTooltip: false,
    }
  }
  showItemsList () {
    this.setState({
      displayList: true,
      displayTooltip: false
    })
  }
  hideItemsList () {
    this.setState({
      displayList: false
    })
  }
  showTooltip() {
    this.setState({
      displayTooltip: true
    })
  }
  hideTooltip() {
    this.setState({
      displayTooltip: false
    })
  }
  setItemBackground (image) {
    let itemBackground = {
      backgroundImage: `url("/images/items/` + image + `")`
    }
    return itemBackground
  }
  handleChildClick(event, functionToRun) {
    event.stopPropagation();
    this.setState({
      displayTooltip: false
    })
    functionToRun(this.props.type);
  }
  render() {
    let unequipButton = <button className={"unequipButton"} onClick={(event) => this.handleChildClick(event, this.props.unequipItem)}>×</button>;
    return (
      <div className={this.props.type} onClick={() => this.showItemsList()} onMouseEnter={this.props.inSlot && !this.state.displayList ? () => this.showTooltip() : null} onMouseLeave={this.props.inSlot ? () => this.hideTooltip() : null} style={this.props.inSlot ? this.setItemBackground(this.props.inSlot.image) : null}>
      {this.state.displayList ? <ItemsList items={this.props.items} type={this.props.type} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} hideItemsList={this.hideItemsList} equipItem={this.props.equipItem}/> : null}
      {this.state.displayTooltip ? <ItemTooltip item={this.props.inSlot} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} /> : null}
      {this.props.inSlot ? unequipButton : null}
      </div>
    )
  }
}

export {Equipment};
