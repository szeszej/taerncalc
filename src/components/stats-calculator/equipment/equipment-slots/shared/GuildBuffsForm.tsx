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
  ItemTypes
} from "../../../../../data/models/item.model";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedGuildBuffsForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      templeLevel: 0,
      properties: {
        strength: false,
        agility: false,
        power: false,
        knowledge: false,
        hp: false,
        mana: false,
        endurance: false,
        physRes: false,
        fireRes: false,
        energyRes: false,
        frostRes: false,
        curseRes: false,
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
      "bluntRes",
      "pierceRes",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
    ];
    if (this.props.item) {
      properties.forEach((property) => {
        if (this.props.item![property as keyof Item] !== 0) {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties[property] = true
            return newState;
          });
        }
      });
      this.props.item.otherProperties.forEach((property) => {
        if (
          property[0] === "Zużycie many"
        ) {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.manaUsage = true
            return newState;
          });
        } else if (property[0] === "Zużycie kondycji") {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.enduranceUsage = true
            return newState;
          });
        } else if (property[0] === "Regeneracja many") {
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.regeneration = true
            return newState;
          });
        }
      });
    }
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
        : 40;
    let templeLevelCoeff = this.state.templeLevel
      ? 0.4 + 0.1 * this.state.templeLevel
      : 0;
    let charLevelCoeff = 0;
    switch (true) {
      case this.props.level < 10:
        charLevelCoeff = 0;
        break;
      case this.props.level < 20:
        charLevelCoeff = 0.1;
        break;
      case this.props.level < 30:
        charLevelCoeff = 0.2;
        break;
      case this.props.level < 40:
        charLevelCoeff = 0.3;
        break;
      case this.props.level < 50:
        charLevelCoeff = 0.4;
        break;
      case this.props.level < 60:
        charLevelCoeff = 0.5;
        break;
      case this.props.level < 70:
        charLevelCoeff = 0.6;
        break;
      case this.props.level < 80:
        charLevelCoeff = 0.7;
        break;
      case this.props.level < 90:
        charLevelCoeff = 0.8;
        break;
      case this.props.level < 100:
        charLevelCoeff = 0.9;
        break;
      default:
        charLevelCoeff = 1;
    }
    return Math.floor(maxAttrValue * templeLevelCoeff * charLevelCoeff);
  }
  createItem(): void {
    let guildBuffs: GuildBuffs = {
      name: "Buffy gildiowe",
      image: "",
      type: "guild",
      psychoLvl: 1,
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
          if (property === "manaUsage")
          guildBuffs.otherProperties.push(["Zużycie many", -this.calculateBuffValue(property), 0]);
        } else if (property === "enduranceUsage") {
          guildBuffs.otherProperties.push(["Zużycie kondycji", -this.calculateBuffValue(property), 0]);
        } else if (property === "regeneration") {
          guildBuffs.otherProperties.push(["Regeneracja many", this.calculateBuffValue(property), 0]);
          guildBuffs.otherProperties.push(["Regeneracja kondycji", this.calculateBuffValue(property), 0]);
        } else if (property === "physRes") {
          guildBuffs.bluntRes = this.calculateBuffValue(property);
          guildBuffs.pierceRes = this.calculateBuffValue(property);
          guildBuffs.cutRes = this.calculateBuffValue(property);
        } else {
          //Fix the line below?
          (guildBuffs[property as keyof GuildBuffs] as any) = this.calculateBuffValue(property);
        }
      });
      let createdItem = new Item(guildBuffs);
      ReactGA.event({
        category: "Items",
        action: "Item Choice",
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
        <img src={"images/" + property + ".svg"} alt={property} />
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
        />
        <label
          htmlFor={property}
          onClick={() =>
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
            properties: {
              strength: false,
              agility: false,
              power: false,
              knowledge: false,
              hp: false,
              mana: false,
              endurance: false,
              physRes: false,
              fireRes: false,
              energyRes: false,
              frostRes: false,
              curseRes: false,
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
        className={"itemsList filtersForm"}
      >
        <div className={"title"}>
          <p>{t("Dodaj buffy gildiowe")}</p>
        </div>
        <div className={"filterLines"}>
          {checkBoxes}
        </div>
        <div className="submit">
          <button type="submit">{t("Zatwierdź")}</button>
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
