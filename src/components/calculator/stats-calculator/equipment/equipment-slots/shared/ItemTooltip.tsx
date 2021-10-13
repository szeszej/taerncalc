//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../../../store/store";

//Models
import { Item } from "../../../../../../data/models/item.model";

//Data
import { itemSets } from "../../../../../../data/item-sets";

//Shared functionality
import { checkWhichSetsAreEquipped } from "../../../../../../shared/check-which-sets-are-equipped";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedItemTooltip extends React.Component<PropTypes> {
  nameColor(rarity: string): { color: string } {
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
  render() {
    const { t } = this.props;
    let otherProperties = this.props.item
      ? this.props.item.type === "guild"
        ? this.props.item.otherProperties.map((x) => (
            <p style={this.nameColor("Psychorare")} key={x[0]}>
              {t(x[0])}: {x[1] > 0 ? "+" : null}
              {x[1]}%
            </p>
          ))
        : this.props.item.otherProperties.map((x) => {
            if (x[0] === "Dodatkowe PA") {
              return (
                <p
                  style={
                    this.props.item.psychoLvl
                      ? this.nameColor("Psychorare")
                      : { color: "gray" }
                  }
                  key={x[0]}
                >
                  {t(x[0])}: {x[1]}
                </p>
              );
            } else {
              return (
                <p
                  style={
                    this.props.item.psychoLvl
                      ? this.nameColor("Psychorare")
                      : { color: "gray" }
                  }
                  key={x[0]}
                >
                  {t(x[0])}: {x[1] > 0 ? "+" : null}
                  {x[1] + x[2] * (this.props.item.psychoLvl - 1)}% (
                  {x[2] > 0 ? "+" : null}
                  {x[2]}% {t("co poziom")})
                </p>
              );
            }
          })
      : null;
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
    let equippedSet =
      this.props.item && this.props.item.set
        ? itemSets.find((x) => x.name === this.props.item.set)
        : null;
    let setProperties =
      equippedSet && this.props.item.set
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
      <div className="itemTooltip" onClick={(event) => event.stopPropagation()}>
        <p className="itemName" style={this.nameColor(this.props.item.rarity)}>
          {!this.props.item.isCustom
            ? t(this.props.item.name)
            : this.props.class !== "knight" && this.props.item.type === "shield" ? t("vambraces-count", {
                number: this.props.item.name.slice(-1),
              }) : t(this.props.item.type + "-count", {
                number: this.props.item.name.slice(-1),
              })}
        </p>
        {this.props.item.set && equippedSet ? (
          <p className="itemSet" style={{ color: "#3DEF01" }}>
            {t("Zestaw")}: {t(this.props.item.set)} (
            {this.props.setsEquipped[equippedSet.name]
              ? this.props.setsEquipped[equippedSet.name]
              : 0}
            /{equippedSet.totalPieces})
          </p>
        ) : null}
        {this.props.item.randomStats ? (
          <p className="starItem">{t("Przedmiot gwiazdkowy")}</p>
        ) : null}
        {this.props.item.name ? <hr /> : null}
        {this.props.item.class ? (
          <p
            style={
              this.props.item.class !== this.props.class
                ? notMeetingRequirements
                : undefined
            }
            className="itemClass"
          >
            {t("req-class")}: {t(this.props.item.class)}
          </p>
        ) : null}
        {this.props.item.reqLvl && this.props.level ? (
          <p
            style={
              this.props.item.reqLvl > this.props.level
                ? notMeetingRequirements
                : undefined
            }
            className="itemReq"
          >
            {t("req-level")}: {this.props.item.reqLvl}
          </p>
        ) : null}
        {this.props.item.reqStr && this.props.strength ? (
          <p
            style={
              this.props.item.reqStr > this.props.strength
                ? notMeetingRequirements
                : undefined
            }
            className="itemReq"
          >
            {t("req-strength")}: {this.props.item.reqStr}
          </p>
        ) : null}
        {this.props.item.reqAgi && this.props.agility ? (
          <p
            style={
              this.props.item.reqAgi > this.props.agility
                ? notMeetingRequirements
                : undefined
            }
            className="itemReq"
          >
            {t("req-agility")}: {this.props.item.reqAgi}
          </p>
        ) : null}
        {this.props.item.reqPow && this.props.power ? (
          <p
            style={
              this.props.item.reqPow > this.props.power
                ? notMeetingRequirements
                : undefined
            }
            className="itemReq"
          >
            {t("req-power")}: {this.props.item.reqPow}
          </p>
        ) : null}
        {this.props.item.reqKno && this.props.knowledge ? (
          <p
            style={
              this.props.item.reqKno > this.props.knowledge
                ? notMeetingRequirements
                : undefined
            }
            className="itemReq"
          >
            {t("req-knowledge")}: {this.props.item.reqKno}
          </p>
        ) : null}
        {this.props.item.reqLvl > 0 ||
        this.props.item.reqStr > 0 ||
        this.props.item.reqAgi > 0 ||
        this.props.item.reqPow > 0 ||
        this.props.item.reqKno > 0 ? (
          <hr />
        ) : null}
        {this.props.item.rarity === "Psychorare" ||
        this.props.item.rarity === "Epik" ? (
          this.props.item.psychoLvl ? (
            <p className="itemProperty" style={this.nameColor("Psychorare")}>
              {t("Poziom przedmiotu")}: {this.props.item.psychoLvl}
            </p>
          ) : (
            <p className="itemProperty" style={{ color: "red" }}>
              {t("Rozładowany")}
            </p>
          )
        ) : null}
        {this.props.item.weaponType ? (
          <p className="itemProperty">
            {t("Typ broni")}: {t(this.props.item.weaponType)}
          </p>
        ) : null}
        {this.props.item.damageType ? (
          <p className="itemProperty">
            {t("Typ obrażeń")}: {t(this.props.item.damageType)}
          </p>
        ) : null}
        {this.props.item.damage ? (
          <p className="damage">
            {t("Obrażenia")}:{" "}
            {this.props.level
              ? this.props.item.calculateTotalDamage(this.props.level)
              : this.props.item.calculateTotalDamage(0)}
            {this.props.item.enhancements.damage ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.damage > 0 ? "+" : null}
                {this.props.item.enhancements.damage})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("strength") ||
        this.props.item.strength ? (
          <p
            className="itemProperty"
            style={
              this.props.item.calculateTotalStat("strength") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("strength")}:{" "}
            {this.props.item.calculateTotalStat("strength") >= 0 ? "+" : null}
            {this.props.item.calculateTotalStat("strength")}
            {this.props.item.enhancements.strength ? (
              <span style={{ color: "orange" }}>
                {" "}
                ({this.props.item.enhancements.strength > 0 ? "+" : null}
                {this.props.item.enhancements.strength})
              </span>
            ) : null}
          </p>
        ) : null}
        {this.props.item.calculateTotalStat("agility") ||
        this.props.item.agility ? (
          <p
            className="itemProperty"
            style={
              this.props.item.calculateTotalStat("agility") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("agility")}:{" "}
            {this.props.item.calculateTotalStat("agility") >= 0 ? "+" : null}
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
        {this.props.item.calculateTotalStat("power") ||
        this.props.item.power ? (
          <p
            className="itemProperty"
            style={
              this.props.item.calculateTotalStat("power") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("power")}:{" "}
            {this.props.item.calculateTotalStat("power") >= 0 ? "+" : null}
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
        {this.props.item.calculateTotalStat("knowledge") ||
        this.props.item.knowledge ? (
          <p
            className="itemProperty"
            style={
              this.props.item.calculateTotalStat("knowledge") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("knowledge")}:{" "}
            {this.props.item.calculateTotalStat("knowledge") >= 0 ? "+" : null}
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
            style={
              this.props.item.calculateTotalStat("hp") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("hp")}:{" "}
            {this.props.item.calculateTotalStat("hp") >= 0 ? "+" : null}
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
        {this.props.item.calculateTotalStat("mana") || this.props.item.mana ? (
          <p
            className="itemProperty"
            style={
              this.props.item.calculateTotalStat("mana") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("mana")}:{" "}
            {this.props.item.calculateTotalStat("mana") >= 0 ? "+" : null}
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
        {this.props.item.calculateTotalStat("endurance") ||
        this.props.item.endurance ? (
          <p
            className="itemProperty"
            style={
              this.props.item.calculateTotalStat("endurance") >= 0
                ? undefined
                : negativeStats
            }
          >
            {t("endurance")}:{" "}
            {this.props.item.calculateTotalStat("endurance") >= 0 ? "+" : null}
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
        {this.props.item.cutRes ? (
          <p className="itemProperty">
            {t("cutRes")}: +{this.props.item.cutRes}
          </p>
        ) : null}
        {this.props.item.bluntRes ? (
          <p className="itemProperty">
            {t("bluntRes")}: +{this.props.item.bluntRes}
          </p>
        ) : null}
        {this.props.item.pierceRes ? (
          <p className="itemProperty">
            {t("pierceRes")}: +{this.props.item.pierceRes}
          </p>
        ) : null}
        {this.props.item.fireRes ? (
          <p className="itemProperty">
            {t("fireRes")}: +{this.props.item.fireRes}
          </p>
        ) : null}
        {this.props.item.energyRes ? (
          <p className="itemProperty">
            {t("energyRes")}: +{this.props.item.energyRes}
          </p>
        ) : null}
        {this.props.item.frostRes ? (
          <p className="itemProperty">
            {t("frostRes")}: +{this.props.item.frostRes}
          </p>
        ) : null}
        {this.props.item.curseRes ? (
          <p className="itemProperty">
            {t("curseRes")}: +{this.props.item.curseRes}
          </p>
        ) : null}
        {otherProperties}
        {/* If it's a set item */}
        {equippedSet ? (
          <p className="itemProperty" style={setColor}>
            {t("Efekty zestawu")}:
          </p>
        ) : null}
        {equippedSet && equippedSet.strength && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("strength")}: +{setProperties.strength} ({equippedSet.strength})
          </p>
        ) : null}
        {equippedSet && equippedSet.agility && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("agility")}: +{setProperties.agility} ({equippedSet.agility})
          </p>
        ) : null}
        {equippedSet && equippedSet.power && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("power")}: +{setProperties.power} ({equippedSet.power})
          </p>
        ) : null}
        {equippedSet && equippedSet.knowledge && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("knowledge")}: +{setProperties.knowledge} (
            {equippedSet.knowledge})
          </p>
        ) : null}
        {equippedSet && equippedSet.hp && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("hp")}: +{setProperties.hp} ({equippedSet.hp})
          </p>
        ) : null}
        {equippedSet && equippedSet.endurance && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("endurance")}: +{setProperties.endurance} (
            {equippedSet.endurance})
          </p>
        ) : null}
        {equippedSet && equippedSet.mana && setProperties ? (
          <p className="itemProperty" style={setColor}>
            {t("mana")}: +{setProperties.mana} ({equippedSet.mana})
          </p>
        ) : null}
        {equippedSet && equippedSet.otherProperties ? otherSetProperties : null}
      </div>
    );
  }
}

//Redux
const mapStateToProps = (state: RootState) => {
  return {
    setsEquipped: checkWhichSetsAreEquipped(state.equipment),
  };
};

const connector = connect(mapStateToProps);

export const ItemTooltip = withTranslation()(connector(ConnectedItemTooltip));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  item: Item;
  class?: string;
  level?: number;
  strength?: number;
  agility?: number;
  power?: number;
  knowledge?: number;
  t(string: string, interpolation?: { [key: string]: string }): string;
}
