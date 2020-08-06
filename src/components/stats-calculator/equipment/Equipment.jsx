//React
import React from "react";
import ReactGA from 'react-ga';

//Components
import { ItemSlot } from "./equipment-slots/ItemSlot.jsx";
import { SpecialSlot } from "./equipment-slots/SpecialSlot.jsx";

//Redux
import { connect } from "react-redux";

//Actions
import { equipItem } from "../../../store/equipment-reducer/equipment-reducer"
import { unequipItem } from "../../../store/equipment-reducer/equipment-reducer"
import { unequipAllItems } from "../../../store/equipment-reducer/equipment-reducer"

export class ConnectedEquipment extends React.Component {
  constructor(props) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
    this.showItemsList = this.showItemsList.bind(this);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.state = {
      listToDisplay: "",
    };
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
      this.props.equipItem(type, item)
      this.props.unequipItem("shield")
    } else if (
      type === "shield" &&
      this.props.equipment.weapon !== null &&
      this.props.equipment.weapon.weaponType === "Dwuręczna"
    ) {
      this.props.unequipItem("weapon");
      this.props.equipItem(type, item)
    } else {
      this.props.equipItem(type, item)
    }
  }
  unequipItem(slot) {
    this.props.unequipItem(slot)
  }
  unequipItems() {
    if (window.confirm("Czy na pewno chcesz zdjąć wszystkie przedmioty?")) {
      this.props.unequipAllItems()
    }
  }
  render() {
    let classBackground = {
      backgroundImage: `url("images/` + this.props.class + `.svg")`
    };
    let equipment = Object.keys(this.props.equipment);
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
        inSlot={this.props.equipment[x]}
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
      />
    ));
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <div className="empty" onClick={() => this.unequipItems()}></div>
        <div className="middle" style={classBackground}></div>
        <SpecialSlot
          type={"special"}
          inSlot={this.props.equipment.special}
          listToDisplay={this.state.listToDisplay}
          equipItem={this.equipItem}
          unequipItem={this.unequipItem}
          showItemsList={this.showItemsList}
          hideItemsList={this.hideItemsList}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    equipment: state.equipment,
    class: state.character.className,
    level: state.character.level,
    strength: state.stats.strength,
    agility: state.stats.agility,
    power: state.stats.power,
    knowledge: state.stats.knowledge,
    items: state.items
   };
};

const mapDispatchToProps = dispatch => {
  return {
    equipItem: (slot, item) => dispatch(equipItem({slot: slot, item: item})),
    unequipItem: (slot) => dispatch(unequipItem({slot: slot})),
    unequipAllItems: () => dispatch(unequipAllItems()),
  }
}


export const Equipment = connect(mapStateToProps, mapDispatchToProps)(ConnectedEquipment);
