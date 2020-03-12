//dodanie customowych itemów po naciśnięciu gwiazdki
//wsparcie dla setów
//wsparcie dla ładowania psychorarów
//wyostrzyć ramki w statach?
//dodawanie i odejmowanie poziomu

import React from 'react';
import {ItemsList, ItemTooltip} from "./Items.js";
import {Item} from "../index.js"

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
    this.showItemsList = this.showItemsList.bind(this);
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
      listToDisplay: "",
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
  showItemsList (type) {
    this.setState({
      listToDisplay: type
    })
  }
  hideItemsList () {
    this.setState({
      listToDisplay: ""
    })
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
      backgroundImage: `url("images/` + this.props.class + `.svg")`
    }
    let equipment = Object.keys(this.state.equipment);
    let equipmentSlots = equipment.filter(x => x !== "special")

    let equipmentSlotComponents = equipmentSlots.map(x => <ItemSlot key={x} type={x} items={x === "ring1" || x === "ring2" ? this.props.items.filter(y => y.type === "ring") : this.props.items.filter(y => y.type === x)} inSlot={this.state.equipment[x]} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} listToDisplay={this.state.listToDisplay} equipItem={this.equipItem} unequipItem={this.unequipItem} showItemsList={this.showItemsList} hideItemsList={this.hideItemsList} isEquivalent={this.isEquivalent} />);
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <div className="empty" onClick={() => this.unequipItems()}></div>
        <div className="middle" style={classBackground}></div>
        <SpecialSlot type={"special"} inSlot={this.state.equipment.special} listToDisplay={this.state.listToDisplay} equipItem={this.equipItem} unequipItem={this.unequipItem} showItemsList={this.showItemsList} hideItemsList={this.hideItemsList} />
      </div>
    );
  }
}

class ItemSlot extends React.Component {
  constructor (props) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.state = {
      displayTooltip: false
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.inSlot && !(this.props.isEquivalent(prevProps, this.props))) {
        if (this.props.level < this.props.inSlot.reqLvl || this.props.strength < this.props.inSlot.reqStr || this.props.agility < this.props.inSlot.reqAgi || this.props.knowledge < this.props.inSlot.reqKno || this.props.power < this.props.inSlot.reqPow) {
        this.props.unequipItem(this.props.type);
      }
    }
  }
  hideTooltipWithListUp (hideTip, showList, type) {
    hideTip();
    showList(type);
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
  clearBackground (image) {
    let itemBackground = {
      backgroundImage: "none"
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
      <div className={this.props.type} onClick={() => this.hideTooltipWithListUp(this.hideTooltip, this.props.showItemsList, this.props.type)} onMouseEnter={this.props.inSlot ? () => this.showTooltip() : null} onMouseLeave={this.props.inSlot ? () => this.hideTooltip() : null} style={this.props.inSlot ? this.clearBackground() : null}>
      {this.props.listToDisplay === this.props.type ? <ItemsList items={this.props.items} type={this.props.type} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} hideItemsList={this.props.hideItemsList} equipItem={this.props.equipItem}/> : null}
      {this.state.displayTooltip && !(this.props.listToDisplay === this.props.type) ? <ItemTooltip item={this.props.inSlot} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} /> : null}
      {this.props.inSlot ? <img src={`images/items/` + this.props.inSlot.image} alt={this.props.inSlot.name} /> : null}
      {this.props.inSlot ? unequipButton : null}
      </div>
    )
  }
}

class SpecialSlot extends React.Component {
  constructor(props) {
    super(props)
  }
  createItem(properties) {
    let specialItem = new Item(properties)
    return specialItem
  }
  render() {
    return (
      <div className="special">
        <form style={{display: "none"}}>
        <input type="number" min="-999" max="999" placeholder="Siła"></input>
        <input class="submit" type="submit" value="Zatwierdź"></input>
        </form>
      </div>
    )
  }
}

export {Equipment};
