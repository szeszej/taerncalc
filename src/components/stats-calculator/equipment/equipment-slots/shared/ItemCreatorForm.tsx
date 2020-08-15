//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

//Action creators
import { addItem } from "../../../../../store/items-reducer/items-reducer";
import {
  equipItem,
  Equipment,
} from "../../../../../store/equipment-reducer/equipment-reducer";

//Models
import { Item } from "../../../../../data/models/item.model.js";

//Shared functionality
import translateProperty from "../../../../../shared/translate-property";

class ConnectedItemCreatorForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      properties: [
        {
          property: "placeholder",
          value: 0,
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
      type: this.props.type,
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
        if (itemProperties[x.property as keyof CustomItem] !== "placeholder") {
          (itemProperties[x.property as keyof CustomItem] as any) = x.value;
        }
      });
      let customItem = new Item(itemProperties);
      this.props.addItem(customItem);
      this.props.equipItem(this.props.type as keyof Equipment, customItem);
      this.props.closeList();
    } else {
      window.alert("Nie określono żadnych parametrów!");
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
        value: 0,
      });
      return newState;
    });
  }
  render() {
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
    let options = [
      <option
        key="placeholder"
        disabled
        value="placeholder"
        className="placeholder"
      >
        Wybierz parametr
      </option>,
    ];
    properties.forEach((x) =>
      options.push(
        <option
          key={x}
          value={x}
          disabled={this.state.propertiesUsed.includes(x)}
        >
          {translateProperty(x)}
        </option>
      )
    );
    let propertySelects = this.state.properties.map((x, index) => (
      <div className="property" key={index}>
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
          value={x.value}
          onChange={(event) =>
            this.handleChange(+event.currentTarget.value, index)
          }
          type="number"
          min={1}
          max={999}
        ></input>
        <button onClick={(event) => this.handleClick(event, this.addNewSelect)}>
          +
        </button>
      </div>
    ));
    return (
      <form
        onSubmit={(event) => this.handleClick(event, this.createItem)}
        className={"itemsList addItemForm"}
      >
        <div className={"title"}>
          <p>Tutaj możesz stworzyć własny przedmiot</p>
        </div>
        <div className={"propertyList"}>
          {propertySelects}
          <div className="submit">
            <button type="submit">Zatwierdź</button>
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
  type: string;
  closeForm(): void;
  closeList(): void;
}

interface StateTypes {
  properties: { property: string; value: number }[];
  propertiesUsed: string[];
}

interface CustomItem {
  name: string;
  type: string;
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

export const ItemCreatorForm = connector(ConnectedItemCreatorForm);
