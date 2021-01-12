//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

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
  NumericItemValues,
} from "../../../../../data/models/item.model";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedGuildBuffsForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      properties: [
        {
          property: "placeholder",
          value: null,
        },
      ],
      propertiesUsed: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addNewSelect = this.addNewSelect.bind(this);
    this.createItem = this.createItem.bind(this);
  }
  componentDidMount() {
    let areGuildBuffsPresent: boolean = false;
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
          areGuildBuffsPresent = true;
          this.setState((prevState) => {
            let newState = { ...prevState };
            newState.properties.push({
              property: property,
              value: this.props.item![property as keyof NumericItemValues],
            });
            return newState;
          });
        }
      });
    }
    if (areGuildBuffsPresent) {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState.properties.shift();
        return newState;
      });
    }
  }
  createItem(): void {
    let guildBuffs: GuildBuffs = {
      name: "Buffy gildiowe",
      image: "",
      type: "guild",
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
    };
    if (
      !this.state.properties.every((x) => x.property === "placeholder") &&
      !this.state.properties.every((x) => x.value === 0)
    ) {
      //Fix the line below?
      this.state.properties.forEach((x) => {
        if (x.property !== "placeholder" && x.value !== null) {
          (guildBuffs[x.property as keyof GuildBuffs] as any) = x.value;
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
    } else {
      window.alert(this.props.t("Nie określono żadnych parametrów!"));
    }
  }
  //Needed to prevent bubbling
  handleClick(event: React.FormEvent, functionToRun: () => void): void {
    event.stopPropagation();
    event.preventDefault();
    functionToRun();
  }
  //Handling numeric inputs
  handleChange(value: number, index: number): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties[index].value = value;
      return newState;
    });
  }
  //Handling selects
  handleSelect(value: string, index: number): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties[index].property = value;
      newState.propertiesUsed.push(value);
      return newState;
    });
  }
  //Adding a new line to the form
  addNewSelect(): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties.push({
        property: "placeholder",
        value: null,
      });
      return newState;
    });
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
    let options = [
      <option
        key="placeholder"
        disabled
        value="placeholder"
        className="placeholder"
      >
        {t("Wybierz parametr")}
      </option>,
    ];
    properties.forEach((x) =>
      options.push(
        <option
          key={x}
          value={x}
          disabled={this.state.propertiesUsed.includes(x)}
        >
          {t(x)}
        </option>
      )
    );
    let propertySelects = this.state.properties.map((x, index) => (
      <div className="property" key={index}>
        <img src={"images/" + x.property + ".svg"} alt={x.property} />
        <select
          required
          value={x.property}
          onChange={(event) =>
            this.handleSelect(event.currentTarget.value, index)
          }
        >
          {options}
        </select>
        <input
          value={x.value ? x.value : ""}
          onChange={(event) =>
            this.handleChange(+event.currentTarget.value, index)
          }
          placeholder={t("Wartość")}
          type="number"
          min={1}
          max={
            this.state.properties[index].property === "strength" ||
            this.state.properties[index].property === "agility" ||
            this.state.properties[index].property === "power" ||
            this.state.properties[index].property === "knowledge"
              ? 20
              : this.state.properties[index].property === "hp" ||
                this.state.properties[index].property === "mana" ||
                this.state.properties[index].property === "endurance"
              ? 200
              : 40
          }
          disabled={this.state.properties[index].property === "placeholder"}
        ></input>
        <button
          onClick={(event) => this.handleClick(event, this.addNewSelect)}
          className="addProperty"
        ></button>
      </div>
    ));
    let resetButton = (
      <button
        onClick={(event) => {
          event.preventDefault();
          this.props.unequipItem("guild");
          this.setState({
            properties: [
              {
                property: "placeholder",
                value: null,
              },
            ],
            propertiesUsed: [],
          });
        }}
      >
        {t("Resetuj")}
      </button>
    );
    return (
      <form
        onSubmit={(event) => this.handleClick(event, this.createItem)}
        className={"itemsList addItemForm"}
      >
        <div className={"title"}>
          <p>{t("Dodaj buffy gildiowe")}</p>
        </div>
        <div className={"propertyList"}>
          {propertySelects}
          <div className="submit guildBuffsSubmit">
            <button type="submit">{t("Zatwierdź")}</button>
            {resetButton}
          </div>
        </div>
        {closeButton}
      </form>
    );
  }
}

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  item: Item | null;
  closeList(): void;
  t(string: string): string;
}

interface StateTypes {
  properties: { property: string; value: number | null }[];
  propertiesUsed: string[];
}

interface GuildBuffs extends RawItem {
  name: string;
  type: ItemTypes;
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
}

//Redux
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    unequipItem: (slot: keyof Equipment) =>
      dispatch(unequipItem({ slot: slot })),
    equipItem: (slot: keyof Equipment, item: Item) =>
      dispatch(equipItem({ slot: slot, item: item })),
  };
};

const connector = connect(null, mapDispatchToProps);

export const GuildBuffsForm = withTranslation()(
  connector(ConnectedGuildBuffsForm)
);
