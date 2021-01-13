//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../../../store/store";

//Action creators
import {
  equipItem,
  unequipItem,
  Equipment,
} from "../../../../../store/equipment-reducer/equipment-reducer";

//Models
import {
  Item,
  RawItem,
  ItemTypes,
} from "../../../../../data/models/item.model";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedGuildBuffsForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      templeLevel: 1,
      properties: {
        strength: false,
        agility: false,
        power: false,
        knowledge: false,
        hp: false,
        mana: false,
        endurance: false,
        fireRes: false,
        energyRes: false,
        frostRes: false,
        curseRes: false,
        physRes: false,
        manaUsage: false,
        enduranceUsage: false,
        regeneration: false,
      },
    };
    this.createItem = this.createItem.bind(this);
  }
  componentDidMount() {
    let properties = [
      "strength",
      "agility",
      "power",
      "knowledge",
      "hp",
      "mana",
      "endurance",
      "cutRes",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
    ];
    if (this.props.item) {
      this.setState({
        templeLevel: this.props.item.psychoLvl,
      });
      properties.forEach((property) => {
        if (
          this.props.item![property as keyof Item] !== 0 &&
          property !== "cutRes"
        ) {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties[property] = true;
            return newState;
          });
        } else if (
          this.props.item![property as keyof Item] !== 0 &&
          property === "cutRes"
        ) {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.physRes = true;
            return newState;
          });
        }
      });
      this.props.item.otherProperties.forEach((property) => {
        if (property[0] === "Zużycie many") {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.manaUsage = true;
            return newState;
          });
        } else if (property[0] === "Zużycie kondycji") {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.enduranceUsage = true;
            return newState;
          });
        } else if (property[0] === "Regeneracja many") {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.regeneration = true;
            return newState;
          });
        }
      });
    }
  }
  componentDidUpdate(prevProps: PropTypes, prevState: StateTypes) {
    if (prevState.templeLevel !== this.state.templeLevel) {
      if (this.state.templeLevel < 5) {
        this.setState((prevState) => {
          let newState = { ...prevState };
          newState.properties.manaUsage = false;
          newState.properties.enduranceUsage = false;
          newState.properties.regeneration = false;
          return newState;
        });
      }
      if (this.state.templeLevel < 4) {
        this.setState((prevState) => {
          let newState = { ...prevState };
          newState.properties.physRes = false;
          return newState;
        });
      }
      if (this.state.templeLevel < 3) {
        this.setState((prevState) => {
          let newState = { ...prevState };
          newState.properties.fireRes = false;
          newState.properties.frostRes = false;
          newState.properties.energyRes = false;
          newState.properties.curseRes = false;
          return newState;
        });
      }
      if (this.state.templeLevel < 2) {
        this.setState((prevState) => {
          let newState = { ...prevState };
          newState.properties.hp = false;
          newState.properties.mana = false;
          newState.properties.endurance = false;
          return newState;
        });
      }
    }
  }
  checkIfBoxShouldBeDisabled(property?: string): boolean {
    //check if 3 buffs are already chosen
    let buffs = Object.keys(this.state.properties);
    let areThreeBuffsUsed = buffs.reduce(
      (accum, buff) => (this.state.properties[buff] ? (accum += 1) : accum),
      0
    );
    if (areThreeBuffsUsed >= 3) {
      return true;
    }
    let isTempleHighEnoughLevel = property
      ? property === "strength" ||
        property === "agility" ||
        property === "power" ||
        property === "knowledge"
        ? false
        : (property === "hp" ||
            property === "mana" ||
            property === "endurance") &&
          this.state.templeLevel > 1
        ? false
        : (property === "fireRes" ||
            property === "energyRes" ||
            property === "curseRes" ||
            property === "frostRes") &&
          this.state.templeLevel > 2
        ? false
        : property === "physRes" && this.state.templeLevel > 3
        ? false
        : this.state.templeLevel > 4
        ? false
        : true
      : false;
    if (isTempleHighEnoughLevel) {
      return true;
    }
    return false;
  }
  calculateBuffValue(attribute: string): number {
    let maxAttrValue =
      attribute === "strength" ||
      attribute === "agility" ||
      attribute === "power" ||
      attribute === "knowledge"
        ? 20
        : attribute === "hp" ||
          attribute === "mana" ||
          attribute === "endurance"
        ? 200
        : attribute === "manaUsage" || attribute === "enduranceUsage"
        ? 10
        : attribute === "regeneration"
        ? 1
        : attribute === "physRes"
        ? 20
        : 40;
    // if ((attribute === "fireRes" || attribute === "curseRes" || attribute === "frostRes" || attribute === "energyRes") ) {
    //
    // }
    switch (true) {
      case this.props.level < 10:
        return 0;
      case this.props.level < 20:
        return maxAttrValue * 0.1;
      case this.props.level < 30:
        return maxAttrValue * 0.2;
      case this.props.level < 40:
        return maxAttrValue * 0.3;
      case this.props.level < 50:
        return maxAttrValue * 0.4;
      case this.props.level < 60:
        return maxAttrValue * 0.5;
      case this.props.level < 70:
        switch (true) {
          case this.state.templeLevel === 1:
            return maxAttrValue * 0.5;
          default:
            return maxAttrValue * 0.6;
        }
      case this.props.level < 80:
        switch (true) {
          case this.state.templeLevel < 3:
            return maxAttrValue * (0.5 + (this.state.templeLevel - 1) * 0.1);
          default:
            return maxAttrValue * 0.7;
        }
      case this.props.level < 90:
        switch (true) {
          case this.state.templeLevel < 4:
            return maxAttrValue * (0.5 + (this.state.templeLevel - 1) * 0.1);
          default:
            return maxAttrValue * 0.8;
        }
      case this.props.level < 100:
        switch (true) {
          case this.state.templeLevel < 5:
            return maxAttrValue * (0.5 + (this.state.templeLevel - 1) * 0.1);
          default:
            return maxAttrValue * 0.9;
        }
      default:
        return maxAttrValue * (0.5 + (this.state.templeLevel - 1) * 0.1);
    }
  }
  createItem(): void {
    let guildBuffs: GuildBuffs = {
      name: "Buffy gildiowe",
      image: "",
      type: "guild",
      psychoLvl: this.state.templeLevel,
      strength: 0,
      agility: 0,
      power: 0,
      knowledge: 0,
      hp: 0,
      mana: 0,
      endurance: 0,
      bluntRes: 0,
      pierceRes: 0,
      cutRes: 0,
      fireRes: 0,
      frostRes: 0,
      curseRes: 0,
      energyRes: 0,
      otherProperties: [],
    };
    let properties = Object.keys(this.state.properties);
    properties.forEach((property) => {
      if (this.state.properties[property]) {
        if (property === "manaUsage" && this.calculateBuffValue(property)) {
          guildBuffs.otherProperties.push([
            "Zużycie many",
            -this.calculateBuffValue(property),
            0,
          ]);
        } else if (
          property === "enduranceUsage" &&
          this.calculateBuffValue(property)
        ) {
          guildBuffs.otherProperties.push([
            "Zużycie kondycji",
            -this.calculateBuffValue(property),
            0,
          ]);
        } else if (
          property === "regeneration" &&
          this.calculateBuffValue(property)
        ) {
          guildBuffs.otherProperties.push([
            "Regeneracja many",
            this.calculateBuffValue(property),
            0,
          ]);
          guildBuffs.otherProperties.push([
            "Regeneracja kondycji",
            this.calculateBuffValue(property),
            0,
          ]);
        } else if (property === "physRes") {
          guildBuffs.bluntRes = this.calculateBuffValue(property);
          guildBuffs.pierceRes = this.calculateBuffValue(property);
          guildBuffs.cutRes = this.calculateBuffValue(property);
        } else {
          //Fix the line below?
          (guildBuffs[
            property as keyof GuildBuffs
          ] as any) = this.calculateBuffValue(property);
        }
      }
    });
    let createdItem = new Item(guildBuffs);
    ReactGA.event({
      category: "Items",
      action: "Buffy gildiowe",
      label: "Buffy gildiowe",
    });
    this.props.equipItem("guild", createdItem);
    this.props.closeList();
  }
  //Needed to prevent bubbling
  handleClick(event: React.FormEvent, functionToRun: () => void): void {
    event.stopPropagation();
    event.preventDefault();
    functionToRun();
  }
  render() {
    const { t } = this.props;
    let closeButton = (
      <button
        className="closeList"
        onClick={(event) => this.handleClick(event, this.props.closeList)}
      >
        ×
      </button>
    );
    let properties = Object.keys(this.state.properties);
    let checkBoxes = properties.map((property) => (
      <div key={property} className="filterLine">
        <img
          src={"images/" + property + ".svg"}
          alt={property}
          onClick={() =>
            !this.checkIfBoxShouldBeDisabled(property) ||
            this.state.properties[property]
              ? this.state.properties[property]
                ? this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.properties[property] = false;
                    return newState;
                  })
                : this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.properties[property] = true;
                    return newState;
                  })
              : null
          }
        />
        <input
          type="checkbox"
          className="filterInput"
          name={property}
          value={property}
          onChange={() =>
            this.state.properties[property]
              ? this.setState((prevState) => {
                  let newState = { ...prevState };
                  newState.properties[property] = false;
                  return newState;
                })
              : this.setState((prevState) => {
                  let newState = { ...prevState };
                  newState.properties[property] = true;
                  return newState;
                })
          }
          checked={this.state.properties[property]}
          disabled={
            this.state.properties[property]
              ? false
              : this.checkIfBoxShouldBeDisabled(property)
          }
        />
        <label
          htmlFor={property}
          onClick={() =>
            !this.checkIfBoxShouldBeDisabled(property) ||
            this.state.properties[property]
              ? this.state.properties[property]
                ? this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.properties[property] = false;
                    return newState;
                  })
                : this.setState((prevState) => {
                    let newState = { ...prevState };
                    newState.properties[property] = true;
                    return newState;
                  })
              : null
          }
        >
          {t(property)}
        </label>
      </div>
    ));
    let resetButton = (
      <button
        className="resetFilters"
        onClick={(event) => {
          event.preventDefault();
          this.props.unequipItem("guild");
          this.setState({
            templeLevel: 1,
            properties: {
              strength: false,
              agility: false,
              power: false,
              knowledge: false,
              hp: false,
              mana: false,
              endurance: false,
              fireRes: false,
              energyRes: false,
              frostRes: false,
              curseRes: false,
              physRes: false,
              manaUsage: false,
              enduranceUsage: false,
              regeneration: false,
            },
          });
        }}
      >
        {t("Resetuj")}
      </button>
    );
    return (
      <form
        onSubmit={(event) => this.handleClick(event, this.createItem)}
        className="itemsList filtersForm"
      >
        <div className="title">
          <p>{t("Dodaj buffy gildiowe")}</p>
        </div>
        <div className="templeLevel">
          <img src={"images/temple.svg"} alt="temple" />
          <label>{t("Poziom świątyni")}:</label>
          <div className="templeRange">
            <div
              className="templeValue"
              style={{ left: this.state.templeLevel - 1 + "em" }}
            >
              <div className="value">{this.state.templeLevel}</div>
            </div>
            <input
              type="range"
              name="temple"
              min={1}
              max={6}
              value={this.state.templeLevel}
              onChange={(event) =>
                this.setState({ templeLevel: +event.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className={"filterLines"}>{checkBoxes}</div>
        {/*this.checkIfBoxShouldBeDisabled() ? <span>Wybrano już 3 buffy!</span> : null*/}
        <div className="submit">
          <button type="submit" className="submitButton">{t("Zatwierdź")}</button>
          {resetButton}
        </div>
        {closeButton}
      </form>
    );
  }
}

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  closeList(): void;
  t(string: string): string;
}

interface StateTypes {
  templeLevel: number;
  properties: {
    strength: boolean;
    agility: boolean;
    power: boolean;
    knowledge: boolean;
    hp: boolean;
    mana: boolean;
    endurance: boolean;
    physRes: boolean;
    fireRes: boolean;
    energyRes: boolean;
    frostRes: boolean;
    curseRes: boolean;
    manaUsage: boolean;
    enduranceUsage: boolean;
    regeneration: boolean;
    [index: string]: boolean;
  };
}

interface GuildBuffs extends RawItem {
  name: string;
  type: ItemTypes;
  psychoLvl: number;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
  hp: number;
  mana: number;
  endurance: number;
  bluntRes: number;
  pierceRes: number;
  cutRes: number;
  fireRes: number;
  frostRes: number;
  curseRes: number;
  energyRes: number;
  otherProperties: [string, number, number][];
}

//Redux
const mapStateToProps = (state: RootState) => {
  return {
    item: state.equipment.guild,
    level: state.character.level,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    unequipItem: (slot: keyof Equipment) =>
      dispatch(unequipItem({ slot: slot })),
    equipItem: (slot: keyof Equipment, item: Item) =>
      dispatch(equipItem({ slot: slot, item: item })),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const GuildBuffsForm = withTranslation()(
  connector(ConnectedGuildBuffsForm)
);
