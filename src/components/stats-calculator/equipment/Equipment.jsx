//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { ItemSlot } from "./equipment-slots/ItemSlot.jsx";
import { SpecialSlot } from "./equipment-slots/SpecialSlot.jsx";

//Redux
import { connect } from "react-redux";

//Actions
import {
  equipItem,
  unequipItem,
  unequipAllItems,
  changePsychoLvl,
} from "../../../store/equipment-reducer/equipment-reducer";

//Shared functionality
import {
  checkWhichSetsAreEquipped
} from "../../../shared/check-which-sets-are-equipped";

//Data
//Data
import { itemSets } from "../../../data/item-sets";

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
  calculateOtherProperties(equipment) {
    let setsEquipped = checkWhichSetsAreEquipped(equipment)
    let propertiesOfSets = this.checkPropertiesOfSets(setsEquipped)
    let propertiesOfEquippedItems = this.checkOtherPropertiesOfItems(equipment)
    for (let property in propertiesOfSets) {
      if (propertiesOfSets.hasOwnProperty(property) && propertiesOfSets[property] !== 0) {
        if (propertiesOfEquippedItems.hasOwnProperty(property)) {
          propertiesOfEquippedItems[property] += propertiesOfSets[property]
        } else {
          propertiesOfEquippedItems[property] = propertiesOfSets[property]
        }
      }
    }
    let propertyTypes = Object.keys(propertiesOfEquippedItems);
    let propertyParagraphs = propertyTypes.map(property => (
      <p key={property}>{property}: {propertiesOfEquippedItems[property]}%</p>
    ))
    return propertyParagraphs
  }
  checkOtherPropertiesOfItems(equipment) {
    let equipmentTypes = Object.keys(equipment);
    let equippedItems = equipmentTypes.map((x) => equipment[x]);
    let otherPropertiesOfEquippedItems = equippedItems.reduce((total, item) => {
      if (item !== null && (item.rarity === "Psychorare" || item.rarity === "Epik")) {
        item.otherProperties.forEach((property) => {
          if (total.hasOwnProperty(property[0])) {
            total[property[0]] += property[1] + property[2] * (item.psychoLvl - 1)
          } else {
            total[property[0]] = property[1] + property[2] * (item.psychoLvl - 1)
          }
        })
        return total
      } else {
        return total;
      }
    }, {});
    return otherPropertiesOfEquippedItems
  }
  checkPropertiesOfSets(equippedSets) {
    let setsProperties = {}
    if (equippedSets) {
      for (let setName in equippedSets) {
        if (equippedSets.hasOwnProperty(setName)) {
          let set = itemSets.find(x => x.name === setName)
          let setProperties = set.getOtherPropertiesValuesDependingOnPiecesAsArray(equippedSets[setName])
          setProperties.forEach(property => {
            if (setsProperties.hasOwnProperty(property[0])) {
              setsProperties[property[0]] += property[1]
            } else {
              setsProperties[property[0]] = property[1]
            }
          })
        }
      }
    }
    return setsProperties;
  }
  calculateTotalDamage(weapon, special) {
      let totalDamage = 0
      if (weapon) {
        if (weapon.rarity === "Epik") {
          totalDamage += weapon.calculateTotalStat("damage") + this.props.level
        } else {
          totalDamage += weapon.calculateTotalStat("damage")
        }
      }
      if (special) {
        totalDamage += special.damage
      }
      return totalDamage
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
    let otherPropertiesTags = this.calculateOtherProperties(this.props.equipment)
    let otherPropertiesList = (
      <div className="itemTooltip">
        <p className="propertiesHeader">Dodatkowe właściwości:</p>
        {otherPropertiesTags}
      </div>
    );
    return (
      <div className="equipment">
        {equipmentSlotComponents}
        <div
          className="otherProperties"
          onMouseEnter={() => this.setState({ showOtherProperties: true })}
          onTouchStart={() => this.setState({ showOtherProperties: true })}
          onMouseLeave={() => this.setState({ showOtherProperties: false })}
          onTouchEnd={() => this.setState({ showOtherProperties: false })}
          style={otherPropertiesTags.length !== 0 ? {backgroundImage: "url(/images/other-properties-active.svg)"} : null}
        >
          {this.state.showOtherProperties && otherPropertiesTags.length !== 0 ? otherPropertiesList : this.state.showOtherProperties ? <div className="itemTooltip"><p>Podsumowanie właściwości psycho.</p></div> : null}
        </div>
        <div className="middle" style={classBackground}>
          <button
            className="empty"
            onClick={() => this.unequipItems()}
          ></button>
        {this.props.equipment.weapon || (this.props.equipment.special && this.props.equipment.special.damage) ? <div className="damage"><p>Obrażenia</p><p className="totalDamage">{this.calculateTotalDamage(this.props.equipment.weapon, this.props.equipment.special)}</p></div> : null}
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
