//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { ItemSlot } from "./equipment-slots/ItemSlot";
import { SpecialSlot } from "./equipment-slots/SpecialSlot";
import { PsychoSlot } from "./equipment-slots/PsychoSlot";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";

//Actions
import {
  equipItem,
  unequipItem,
  unequipAllItems,
  changePsychoLvl,
} from "../../../store/equipment-reducer/equipment-reducer";

//Shared functionality
import { confirmAlert } from "react-confirm-alert";

//Types
import { Equipment } from "../../../store/equipment-reducer/equipment-reducer"
import { Item } from "../../../data/models/item.model"

class ConnectedEquipment extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
    this.showItemsList = this.showItemsList.bind(this);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.changePsychoLvl = this.changePsychoLvl.bind(this);
    this.checkIfAnyItemIsEquipped = this.checkIfAnyItemIsEquipped.bind(this);
    this.state = {
      listToDisplay: "",
      showOtherProperties: false,
    };
  }
  showItemsList(type: keyof Equipment) {
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
  equipItem(item: Item, type: keyof Equipment) {
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
  unequipItem(slot: keyof Equipment) {
    this.props.unequipItem(slot);
  }
  changePsychoLvl(slot: keyof Equipment, value: number) {
    this.props.changePsychoLvl(slot, value);
  }
  unequipItems() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="backdrop">
            <div className="alert-box">
              <p className="alert-text">
                Czy na pewno chcesz zdjąć wszystkie przedmioty?
              </p>
              <div className="alert-box-actions">
                <button
                  className="alert-box-action"
                  onClick={() => {
                    this.props.unequipAllItems();
                    onClose();
                  }}
                >
                  Tak
                </button>
                <button className="alert-box-action" onClick={onClose}>
                  Nie
                </button>
              </div>
              <button className="close-button" onClick={onClose}>×</button>
            </div>
          </div>
        );
      },
    });
  }
  checkIfAnyItemIsEquipped() {
    let isAnyItemEquipped = false;
    for (let item in this.props.equipment) {
      if (this.props.equipment.hasOwnProperty(item)) {
        isAnyItemEquipped = this.props.equipment[item as keyof Equipment] ? true : false;
        if (isAnyItemEquipped) {
          break;
        }
      }
    }
    return isAnyItemEquipped
  }
  calculateTotalDamage(weapon: Item | null, special: Item | null) {
    let totalDamage = 0;
    if (weapon) {
      totalDamage += weapon.calculateTotalDamage(this.props.level)
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
        type={x as keyof Equipment}
        items={
          x === "ring1" || x === "ring2"
            ? this.props.items.filter((y) => y.type === "ring")
            : this.props.items.filter((y) => y.type === x)
        }
        inSlot={this.props.equipment[x as keyof Equipment]}
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
    let areAnyItemsEquipped = this.checkIfAnyItemIsEquipped()
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <PsychoSlot equipment={this.props.equipment} />
        <div className="middle" style={classBackground}>
          {areAnyItemsEquipped ?
            <button
              className="empty"
              onClick={() => this.unequipItems()}
            ></button>
          : null
          }
          {this.props.equipment.weapon ||
          (this.props.equipment.special &&
            this.props.equipment.special.damage) ? (
            <button className="damage">
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
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    equipItem: (slot: keyof Equipment, item: Item) => dispatch(equipItem({ slot: slot, item: item })),
    unequipItem: (slot: keyof Equipment) => dispatch(unequipItem({ slot: slot })),
    unequipAllItems: () => dispatch(unequipAllItems()),
    changePsychoLvl: (slot: keyof Equipment, value: number) =>
      dispatch(changePsychoLvl({ slot: slot, value: value })),
  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export const EquipmentComponent = connector(ConnectedEquipment);

//Types
type PropTypes = ConnectedProps<typeof connector>

interface StateTypes {
  listToDisplay: keyof Equipment | "",
  showOtherProperties: boolean
}
