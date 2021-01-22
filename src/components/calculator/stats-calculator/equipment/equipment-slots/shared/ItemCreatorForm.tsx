//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

//Action creators
import { addItem } from "../../../../../../store/items-reducer/items-reducer";
import {
  equipItem,
  Equipment,
} from "../../../../../../store/equipment-reducer/equipment-reducer";

//Models
import { Item, RawItem, ItemTypes } from "../../../../../../data/models/item.model";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedItemCreatorForm extends React.Component<PropTypes, StateTypes> {
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
  //Creating a new item to add to the database
  createItem(): void {
    let itemProperties: CustomItem = {
      name: this.props.name,
      image: this.props.type + "color.svg",
      type: this.props.type === "ring1" || this.props.type === "ring2" ? "ring" : this.props.type,
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
      isCustom: true,
    };
    if (
      !this.state.properties.every((x) => x.property === "placeholder") &&
      !this.state.properties.every((x) => x.value === 0)
    ) {
      //Fix the line below?
      this.state.properties.forEach((x) => {
        if (x.property !== "placeholder" && x.value !== null) {
          (itemProperties[x.property as keyof CustomItem] as any) = x.value;
        }
      });
      let createdItem = new Item(itemProperties)
      ReactGA.event({
        category: "Items",
        action: "Item Created",
        label: this.props.name,
      });
      this.props.addItem(createdItem);
      this.props.equipItem(this.props.type as keyof Equipment, createdItem);
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
  removeSelect(index: number): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties.splice(index, 1);
      return newState;
    });
  }
  render() {
    const { t } = this.props
    let closeButton = (
      <button
        className="closeList"
        onClick={(event) => this.handleClick(event, this.props.closeForm)}
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
    if (this.props.type === "weapon") {
      properties.push("damage")
    }
    let options = [
      <option
        key="placeholder"
        disabled
        value="placeholder"
        className="placeholder"
      >
        {t("Wybierz parametr")}
      </option>
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
      <img src={"images/" + x.property + ".svg"} alt={x.property}/>
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
          max={999}
          disabled={this.state.properties[index].property === "placeholder"}
        ></input>
        <button
          onClick={(event) => this.handleClick(event, this.addNewSelect)}
          className="addProperty"
        ></button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            this.removeSelect(index);
          }}
          disabled={this.state.properties.length < 2}
          className="removeProperty"
        ></button>
      </div>
    ));
    return (
      <form
        onSubmit={(event) => this.handleClick(event, this.createItem)}
        className={"itemsList addItemForm"}
      >
        <div className={"title"}>
          <p>{t("Stwórz własny przedmiot")}</p>
        </div>
        <div className={"propertyList"}>
          {propertySelects}
          <div className="submit">
            <button type="submit">{t("Zatwierdź")}</button>
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
  name: string;
  type: keyof Equipment;
  closeForm(): void;
  closeList(): void;
  t(string: string): string;
}

interface StateTypes {
  properties: { property: string; value: number | null }[];
  propertiesUsed: string[];
}

interface CustomItem extends RawItem {
  name: string;
  type: ItemTypes;
  image: string;
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
  isCustom: true;
}

//Redux
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addItem: (item: Item) => dispatch(addItem({ item: item })),
    equipItem: (slot: keyof Equipment, item: Item) =>
      dispatch(equipItem({ slot: slot, item: item })),
  };
};

const connector = connect(null, mapDispatchToProps);

export const ItemCreatorForm = withTranslation()(connector(ConnectedItemCreatorForm));
