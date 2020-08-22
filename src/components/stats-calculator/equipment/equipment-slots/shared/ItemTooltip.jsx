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
    totalDamage += this.props.item.enhancements.damage;
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
      ? itemSets.find((x) => x.name === this.props.item.set)
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
            Zestaw: {this.props.item.set} ({this.props.setsEquipped[equippedSet.name] ? this.props.setsEquipped[equippedSet.name] : 0}/{equippedSet.totalPieces})
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
              : this.props.item.damage + this.props.item.enhancements.damage}
            {this.props.item.enhancements.damage ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.damage > 0 ? "+" : null}
                {this.props.item.enhancements.damage})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("strength") || this.props.item.strength ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("strength")  >= 0 ? null : negativeStats}
          >
            Siła: {this.props.item.calculateTotalStat("strength")  >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("strength") }
            {this.props.item.enhancements.strength ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.strength > 0 ? "+" : null}
                {this.props.item.enhancements.strength})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("agility") || this.props.item.agility ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("agility") >= 0 ? null : negativeStats}
          >
            Zręczność: {this.props.item.calculateTotalStat("agility") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("agility")}
            {this.props.item.enhancements.agility ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.agility > 0 ? "+" : null}
                {this.props.item.enhancements.agility})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("power") || this.props.item.power ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("power") >= 0 ? null : negativeStats}
          >
            Moc: {this.props.item.calculateTotalStat("power") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("power")}
            {this.props.item.enhancements.power ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.power > 0 ? "+" : null}
                {this.props.item.enhancements.power})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("knowledge") || this.props.item.knowledge ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("knowledge") >= 0 ? null : negativeStats}
          >
            Wiedza: {this.props.item.calculateTotalStat("knowledge") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("knowledge")}
            {this.props.item.enhancements.knowledge ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.knowledge > 0 ? "+" : null}
                {this.props.item.enhancements.knowledge})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("hp") || this.props.item.hp ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("hp") >= 0 ? null : negativeStats}
          >
            Punkty życia: {this.props.item.calculateTotalStat("hp") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("hp")}
            {this.props.item.enhancements.hp ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.hp > 0 ? "+" : null}
                {this.props.item.enhancements.hp})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("endurance") || this.props.item.endurance ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("endurance") >= 0 ? null : negativeStats}
          >
            Kondycja: {this.props.item.calculateTotalStat("endurance") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("endurance")}
            {this.props.item.enhancements.endurance ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.endurance > 0 ? "+" : null}
                {this.props.item.enhancements.endurance})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("mana") || this.props.item.mana ? (
          <p
            className="itemProperty"
            style={this.props.item.calculateTotalStat("mana") >= 0 ? null : negativeStats}
          >
            Mana: {this.props.item.calculateTotalStat("mana") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("mana")}
            {this.props.item.enhancements.mana ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.mana > 0 ? "+" : null}
                {this.props.item.enhancements.mana})
              </span>
            ) : null}
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
        {equippedSet ? (
          <p className="itemProperty" style={setColor}>
            Efekty zestawu:
          </p>
        ) : null}
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
