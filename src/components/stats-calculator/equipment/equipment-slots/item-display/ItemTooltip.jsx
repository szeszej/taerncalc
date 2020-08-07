//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Data
import { itemSets } from "../../../../../data/item-sets";

//Shared functionality
import { checkWhichSetsAreEquipped } from "../../../../../shared/check-what-sets-are-equipped";

class ConnectedItemTooltip extends React.Component {
  nameColor(rarity) {
    let color = {
      color: "#0161E7",
    };
    if (rarity === "Psychorare") {
      color.color = "#35CBEF";
    } else if (rarity === "Set") {
      color.color = "#3DEF01";
    } else if (rarity === "Epik") {
      color.color = "#E7CC00";
    }
    return color;
  }
  translateCharacterClass(characterClass) {
    let translatedClass = "";
    switch (characterClass) {
      case "druid":
        translatedClass = "Druid";
        break;
      case "barbarian":
        translatedClass = "Barbarzyńca";
        break;
      case "archer":
        translatedClass = "Łucznik";
        break;
      case "firemage":
        translatedClass = "Mag Ognia";
        break;
      case "knight":
        translatedClass = "Rycerz";
        break;
      case "voodoo":
        translatedClass = "VooDoo";
        break;
      case "sheed":
        translatedClass = "Sheed";
        break;
      default:
        translatedClass = "";
        break;
    }
    return translatedClass;
  }
  //For epics with scaling damage
  calculateDamage(damage, level) {
    let totalDamage = 0;
    totalDamage += parseInt(damage);
    totalDamage += level;
    return totalDamage;
  }
  render() {
    let otherProperties = this.props.item.otherProperties.map((x) => (
      <p className="otherProperties" key={x}>
        {x}
      </p>
    ));
    let notMeetingRequirements = {
      color: "red",
    };
    let negativeStats = {
      color: "#961291",
    };
    //If it's a set item
    let setColor = {
      color: "#3DEF01",
    };
    let equippedSet = this.props.item.set
      ? itemSets.filter((x) => x.name === this.props.item.set)[0]
      : null;
    let setProperties = equippedSet
      ? equippedSet.getValuesDependingOnPieces(
          this.props.setsEquipped[this.props.item.set]
        )
      : null;
    let otherSetProperties =
      setProperties && setProperties.otherProperties
        ? setProperties.otherProperties.map((x) => (
            <p key={x} style={setColor}>
              {x}
            </p>
          ))
        : null;
    return (
      <div className="itemTooltip">
        <p className="itemName" style={this.nameColor(this.props.item.rarity)}>
          {this.props.item.name}
        </p>
        {this.props.item.set ? (
          <p className="itemSet" style={{ color: "#3DEF01" }}>
            Zestaw: {this.props.item.set}
          </p>
        ) : null}
        {this.props.item.name ? <hr /> : null}
        {this.props.item.class ? (
          <p
            style={
              this.props.item.class !== this.props.class
                ? notMeetingRequirements
                : null
            }
            className="itemClass"
          >
            Wym. klasa: {this.translateCharacterClass(this.props.item.class)}
          </p>
        ) : null}
        {this.props.item.reqLvl ? (
          <p
            style={
              this.props.item.reqLvl > this.props.level
                ? notMeetingRequirements
                : null
            }
            className="itemReq"
          >
            Wym. poziom: {this.props.item.reqLvl}
          </p>
        ) : null}
        {this.props.item.reqStr ? (
          <p
            style={
              this.props.item.reqStr > this.props.strength
                ? notMeetingRequirements
                : null
            }
            className="itemReq"
          >
            Wym. siła: {this.props.item.reqStr}
          </p>
        ) : null}
        {this.props.item.reqAgi ? (
          <p
            style={
              this.props.item.reqAgi > this.props.agility
                ? notMeetingRequirements
                : null
            }
            className="itemReq"
          >
            Wym. zręczność: {this.props.item.reqAgi}
          </p>
        ) : null}
        {this.props.item.reqPow ? (
          <p
            style={
              this.props.item.reqPow > this.props.power
                ? notMeetingRequirements
                : null
            }
            className="itemReq"
          >
            Wym. moc: {this.props.item.reqPow}
          </p>
        ) : null}
        {this.props.item.reqKno ? (
          <p
            style={
              this.props.item.reqKno > this.props.knowledge
                ? notMeetingRequirements
                : null
            }
            className="itemReq"
          >
            Wym. wiedza: {this.props.item.reqKno}
          </p>
        ) : null}
        {this.props.item.reqLvl > 0 ||
        this.props.item.reqStr > 0 ||
        this.props.item.reqAgi > 0 ||
        this.props.item.reqPow > 0 ||
        this.props.item.reqKno > 0 ? (
          <hr />
        ) : null}
        {this.props.item.weaponType ? (
          <p className="itemProperty">
            Typ broni: {this.props.item.weaponType}
          </p>
        ) : null}
        {this.props.item.damageType ? (
          <p className="itemProperty">
            Typ obrażeń: {this.props.item.damageType}
          </p>
        ) : null}
        {this.props.item.damage ? (
          <p className="damage">
            Obrażenia:{" "}
            {typeof this.props.item.damage === "string"
              ? this.props.item.damage +
                " (" +
                this.calculateDamage(this.props.item.damage, this.props.level) +
                ")"
              : this.props.item.damage}
          </p>
        ) : null}
        {this.props.item.strength ? (
          <p
            className="itemProperty"
            style={this.props.item.strength > 0 ? null : negativeStats}
          >
            Siła: {this.props.item.strength > 0 ? "+" : null}
            {this.props.item.strength}
          </p>
        ) : null}
        {this.props.item.agility ? (
          <p
            className="itemProperty"
            style={this.props.item.agility > 0 ? null : negativeStats}
          >
            Zręczność: {this.props.item.agility > 0 ? "+" : null}
            {this.props.item.agility}
          </p>
        ) : null}
        {this.props.item.power ? (
          <p
            className="itemProperty"
            style={this.props.item.power > 0 ? null : negativeStats}
          >
            Moc: {this.props.item.power > 0 ? "+" : null}
            {this.props.item.power}
          </p>
        ) : null}
        {this.props.item.knowledge ? (
          <p
            className="itemProperty"
            style={this.props.item.knowledge > 0 ? null : negativeStats}
          >
            Wiedza: {this.props.item.knowledge > 0 ? "+" : null}
            {this.props.item.knowledge}
          </p>
        ) : null}
        {this.props.item.hp ? (
          <p
            className="itemProperty"
            style={this.props.item.hp > 0 ? null : negativeStats}
          >
            Punkty życia: {this.props.item.hp > 0 ? "+" : null}
            {this.props.item.hp}
          </p>
        ) : null}
        {this.props.item.endurance ? (
          <p
            className="itemProperty"
            style={this.props.item.endurance > 0 ? null : negativeStats}
          >
            Kondycja: {this.props.item.endurance > 0 ? "+" : null}
            {this.props.item.endurance}
          </p>
        ) : null}
        {this.props.item.mana ? (
          <p
            className="itemProperty"
            style={this.props.item.mana > 0 ? null : negativeStats}
          >
            Mana: {this.props.item.mana > 0 ? "+" : null}
            {this.props.item.mana}
          </p>
        ) : null}
        {this.props.item.cutRes ? (
          <p className="itemProperty">
            Odp. na sieczne: +{this.props.item.cutRes}
          </p>
        ) : null}
        {this.props.item.bluntRes ? (
          <p className="itemProperty">
            Odp. na obuchowe: +{this.props.item.bluntRes}
          </p>
        ) : null}
        {this.props.item.pierceRes ? (
          <p className="itemProperty">
            Odp. na kłute: +{this.props.item.pierceRes}
          </p>
        ) : null}
        {this.props.item.fireRes ? (
          <p className="itemProperty">
            Odp. na ogień: +{this.props.item.fireRes}
          </p>
        ) : null}
        {this.props.item.energyRes ? (
          <p className="itemProperty">
            Odp. na energię: +{this.props.item.energyRes}
          </p>
        ) : null}
        {this.props.item.frostRes ? (
          <p className="itemProperty">
            Odp. na zimno: +{this.props.item.frostRes}
          </p>
        ) : null}
        {this.props.item.curseRes ? (
          <p className="itemProperty">
            Odp. na uroki: +{this.props.item.curseRes}
          </p>
        ) : null}
        {otherProperties}
        {/* If it's a set item */}
        {equippedSet && equippedSet.strength ? (
          <p className="itemProperty" style={setColor}>
            Siła: +{setProperties.strength} ({equippedSet.strength})
          </p>
        ) : null}
        {equippedSet && equippedSet.agility ? (
          <p className="itemProperty" style={setColor}>
            Zręczność: +{setProperties.agility} ({equippedSet.agility})
          </p>
        ) : null}
        {equippedSet && equippedSet.power ? (
          <p className="itemProperty" style={setColor}>
            Moc: +{setProperties.power} ({equippedSet.power})
          </p>
        ) : null}
        {equippedSet && equippedSet.knowledge ? (
          <p className="itemProperty" style={setColor}>
            Wiedza: +{setProperties.knowledge} ({equippedSet.knowledge})
          </p>
        ) : null}
        {equippedSet && equippedSet.hp ? (
          <p className="itemProperty" style={setColor}>
            Punkty życia: +{setProperties.hp} ({equippedSet.hp})
          </p>
        ) : null}
        {equippedSet && equippedSet.endurance ? (
          <p className="itemProperty" style={setColor}>
            Kondycja: +{setProperties.endurance} ({equippedSet.endurance})
          </p>
        ) : null}
        {equippedSet && equippedSet.mana ? (
          <p className="itemProperty" style={setColor}>
            Mana: +{setProperties.mana} ({equippedSet.mana})
          </p>
        ) : null}
        {equippedSet && equippedSet.otherProperties ? otherSetProperties : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setsEquipped: checkWhichSetsAreEquipped(state.equipment),
  };
};

export const ItemTooltip = connect(mapStateToProps)(ConnectedItemTooltip);
