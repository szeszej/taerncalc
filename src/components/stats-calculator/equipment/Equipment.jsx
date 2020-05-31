import React from "react";
import ReactGA from 'react-ga';

import { ItemSlot } from "./equipment-slots/ItemSlot.jsx";
import { SpecialSlot } from "./equipment-slots/SpecialSlot.jsx";

export class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
    this.showItemsList = this.showItemsList.bind(this);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.state = {
      equipment: {
        armor: null,
        helmet: null,
        neck: null,
        gloves: null,
        cape: null,
        weapon: null,
        shield: null,
        pants: null,
        belt: null,
        ring1: null,
        ring2: null,
        boots: null,
        special: null
      },
      listToDisplay: "",
      statsFromItems: {}
    };
  }
  componentDidMount() {
    if (this.props.initialEquipment) {
      this.setState({
        equipment: {
          armor: this.props.initialEquipment.armor,
          helmet: this.props.initialEquipment.helmet,
          neck: this.props.initialEquipment.neck,
          gloves: this.props.initialEquipment.gloves,
          cape: this.props.initialEquipment.cape,
          weapon: this.props.initialEquipment.weapon,
          shield: this.props.initialEquipment.shield,
          pants: this.props.initialEquipment.pants,
          belt: this.props.initialEquipment.belt,
          ring1: this.props.initialEquipment.ring1,
          ring2: this.props.initialEquipment.ring2,
          boots: this.props.initialEquipment.boots,
          special: this.props.initialEquipment.special
        }
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let equipmentTypes = Object.keys(this.state.equipment);
    let equipment = equipmentTypes.map(x => this.state.equipment[x]);
    let equipmentStats = {
      strength: equipment.reduce(
        (total, x) => (x != null ? (total += x.strength) : (total += 0)),
        0
      ),
      agility: equipment.reduce(
        (total, x) => (x != null ? (total += x.agility) : (total += 0)),
        0
      ),
      power: equipment.reduce(
        (total, x) => (x != null ? (total += x.power) : (total += 0)),
        0
      ),
      knowledge: equipment.reduce(
        (total, x) => (x != null ? (total += x.knowledge) : (total += 0)),
        0
      ),
      hp: equipment.reduce(
        (total, x) => (x != null ? (total += x.hp) : (total += 0)),
        0
      ),
      endurance: equipment.reduce(
        (total, x) => (x != null ? (total += x.endurance) : (total += 0)),
        0
      ),
      mana: equipment.reduce(
        (total, x) => (x != null ? (total += x.mana) : (total += 0)),
        0
      ),
      damage: equipment.reduce(
        (total, x) => (x != null ? (total += x.damage) : (total += 0)),
        0
      ),
      fireRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.fireRes) : (total += 0)),
        0
      ),
      frostRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.frostRes) : (total += 0)),
        0
      ),
      energyRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.energyRes) : (total += 0)),
        0
      ),
      curseRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.curseRes) : (total += 0)),
        0
      ),
      pierceRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.pierceRes) : (total += 0)),
        0
      ),
      cutRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.cutRes) : (total += 0)),
        0
      ),
      bluntRes: equipment.reduce(
        (total, x) => (x != null ? (total += x.bluntRes) : (total += 0)),
        0
      )
    };
    if (this.isEquivalent(prevState.statsFromItems, equipmentStats) === false) {
      this.setState({ statsFromItems: equipmentStats });
      this.props.addStatsFromEquipment(equipmentStats);
    }
    let stateForExport = {};
    // eslint-disable-next-line
    equipmentTypes.map(x => {
      if (x === "special") {
        if (this.state.equipment.special !== null) {
          stateForExport[x] = this.state.equipment.special;
        }
      } else {
        this.state.equipment[x] !== null
          ? (stateForExport[x] = this.state.equipment[x].name)
          : (stateForExport[x] = null);
      }
    });

    this.props.getStateForExport(stateForExport, "equipment");
  }
  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
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
  showItemsList(type) {
    ReactGA.event({
      category: 'Items',
      action: 'Show List',
      label: type
    });
    this.setState({
      listToDisplay: type
    });
  }
  hideItemsList() {
    this.setState({
      listToDisplay: ""
    });
  }
  equipItem(item, type) {
    ReactGA.event({
      category: 'Items',
      action: 'Item Choice',
      label: item.name
    });
    if (type === "weapon" && item.weaponType === "Dwuręczna") {
      this.setState(prevState => {
        let newState = prevState;
        newState.equipment.shield = null;
        newState.equipment[type] = item;
        return newState;
      });
    } else if (
      type === "shield" &&
      this.state.equipment.weapon !== null &&
      this.state.equipment.weapon.weaponType === "Dwuręczna"
    ) {
      this.setState(prevState => {
        let newState = prevState;
        newState.equipment.weapon = null;
        newState.equipment[type] = item;
        return newState;
      });
    } else {
      this.setState(prevState => {
        let newState = prevState;
        newState.equipment[type] = item;
        return newState;
      });
    }
  }
  unequipItem(slot) {
    this.setState(prevState => {
      let newState = prevState;
      newState.equipment[slot] = null;
      return newState;
    });
  }
  unequipItems() {
    if (window.confirm("Czy na pewno chcesz zdjąć wszystkie przedmioty?")) {
      this.setState({
        equipment: {
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
      });
    }
  }
  render() {
    let classBackground = {
      backgroundImage: `url("images/` + this.props.class + `.svg")`
    };
    let equipment = Object.keys(this.state.equipment);
    let equipmentSlots = equipment.filter(x => x !== "special");
    let equipmentSlotComponents = equipmentSlots.map(x => (
      <ItemSlot
        key={x}
        type={x}
        items={
          x === "ring1" || x === "ring2"
            ? this.props.items.filter(y => y.type === "ring")
            : this.props.items.filter(y => y.type === x)
        }
        inSlot={this.state.equipment[x]}
        class={this.props.class}
        level={this.props.level}
        strength={this.props.strength}
        agility={this.props.agility}
        power={this.props.power}
        knowledge={this.props.knowledge}
        listToDisplay={this.state.listToDisplay}
        equipItem={this.equipItem}
        unequipItem={this.unequipItem}
        showItemsList={this.showItemsList}
        hideItemsList={this.hideItemsList}
        isEquivalent={this.isEquivalent}
      />
    ));
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <div className="empty" onClick={() => this.unequipItems()}></div>
        <div className="middle" style={classBackground}></div>
        <SpecialSlot
          type={"special"}
          inSlot={this.state.equipment.special}
          listToDisplay={this.state.listToDisplay}
          equipItem={this.equipItem}
          unequipItem={this.unequipItem}
          showItemsList={this.showItemsList}
          hideItemsList={this.hideItemsList}
          isEquivalent={this.isEquivalent}
        />
      </div>
    );
  }
}
