//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { ItemSlot } from "./equipment-slots/ItemSlot.jsx";
import { SpecialSlot } from "./equipment-slots/SpecialSlot.jsx";
import { PsychoSlot } from "./equipment-slots/PsychoSlot";

//Redux
import { connect } from "react-redux";

//Actions
import {
  equipItem,
  unequipItem,
  unequipAllItems,
  changePsychoLvl,
} from "../../../store/equipment-reducer/equipment-reducer";

export class ConnectedEquipment extends React.Component {
  constructor(props) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
    this.showItemsList = this.showItemsList.bind(this);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.changePsychoLvl = this.changePsychoLvl.bind(this);
    this.state = {
      listToDisplay: "",
      showOtherProperties: false,
    };
  }
  showItemsList(type) {
    ReactGA.event({
      category: "Items",
      action: "Show List",
      label: type,
    });
    this.setState({
      listToDisplay: type,
    });
  }
  hideItemsList() {
    this.setState({
      listToDisplay: "",
    });
  }
  equipItem(item, type) {
    ReactGA.event({
      category: "Items",
      action: "Item Choice",
      label: item.name,
    });
    if (type === "weapon" && item.weaponType === "Dwuręczna") {
      this.props.equipItem(type, item);
      this.props.unequipItem("shield");
    } else if (
      type === "shield" &&
      this.props.equipment.weapon !== null &&
      this.props.equipment.weapon.weaponType === "Dwuręczna"
    ) {
      this.props.unequipItem("weapon");
      this.props.equipItem(type, item);
    } else {
      this.props.equipItem(type, item);
    }
  }
  unequipItem(slot) {
    this.props.unequipItem(slot);
  }
  changePsychoLvl(slot, value) {
    this.props.changePsychoLvl(slot, value);
  }
  unequipItems() {
    if (window.confirm("Czy na pewno chcesz zdjąć wszystkie przedmioty?")) {
      this.props.unequipAllItems();
    }
  }
  calculateTotalDamage(weapon, special) {
    let totalDamage = 0;
    if (weapon) {
      if (weapon.rarity === "Epik") {
        totalDamage += weapon.calculateTotalStat("damage") + this.props.level;
      } else {
        totalDamage += weapon.calculateTotalStat("damage");
      }
    }
    if (special) {
      totalDamage += special.damage;
    }
    return totalDamage;
  }
  render() {
    let classBackground = {
      backgroundImage: `url("images/` + this.props.class + `.svg")`,
    };
    let equipment = Object.keys(this.props.equipment);
    let equipmentSlots = equipment.filter((x) => x !== "special");
    let equipmentSlotComponents = equipmentSlots.map((x) => (
      <ItemSlot
        key={x}
        type={x}
        items={
          x === "ring1" || x === "ring2"
            ? this.props.items.filter((y) => y.type === "ring")
            : this.props.items.filter((y) => y.type === x)
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
        changePsychoLvl={this.changePsychoLvl}
      />
    ));
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <PsychoSlot equipment={this.props.equipment}/>
        <div className="middle" style={classBackground}>
          <button
            className="empty"
            onClick={() => this.unequipItems()}
          ></button>
          {this.props.equipment.weapon ||
          (this.props.equipment.special &&
            this.props.equipment.special.damage) ? (
            <button className="damage">
              <p>Obrażenia</p>
              <p className="totalDamage">
                {this.calculateTotalDamage(
                  this.props.equipment.weapon,
                  this.props.equipment.special
                )}
              </p>
            </button>
          ) : null}
        </div>
        <SpecialSlot
          type={"special"}
          inSlot={this.props.equipment.special}
          listToDisplay={this.state.listToDisplay}
          equipItem={this.equipItem}
          unequipItem={this.unequipItem}
          showItemsList={this.showItemsList}
          hideItemsList={this.hideItemsList}
          changePsychoLvl={this.changePsychoLvl}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    equipment: state.equipment,
    class: state.character.className,
    level: state.character.level,
    strength: state.stats.strength,
    agility: state.stats.agility,
    power: state.stats.power,
    knowledge: state.stats.knowledge,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    equipItem: (slot, item) => dispatch(equipItem({ slot: slot, item: item })),
    unequipItem: (slot) => dispatch(unequipItem({ slot: slot })),
    unequipAllItems: () => dispatch(unequipAllItems()),
    changePsychoLvl: (slot, value) =>
      dispatch(changePsychoLvl({ slot: slot, value: value })),
  };
};

export const Equipment = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedEquipment);
