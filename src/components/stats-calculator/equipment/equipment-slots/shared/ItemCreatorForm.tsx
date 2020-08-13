//React
import React from "react";

//Models
import { Item } from "../../../../../data/models/item.model.js"

//Shared functionality
import translateProperty from "../../../../../shared/translate-property"

export class ItemCreatorForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      name: "",
      strength: 0,
      agility: 0,
      power: 0,
      knowledge: 0,
      hp: 0,
      endurance: 0,
      mana: 0,
      damage: 0,
      fireRes: 0,
      frostRes: 0,
      energyRes: 0,
      curseRes: 0,
      pierceRes: 0,
      cutRes: 0,
      bluntRes: 0,
    };
  }
  createItem() {
    let customItem = new Item(this.state);
  }
  handleClick(event: React.FormEvent, functionToRun: () => void) {
    event.stopPropagation();
    functionToRun();
  }
  render() {
    let closeButton = (
      <button
        className="closeList"
        onClick={event => this.handleClick(event, this.props.closeForm)}
      >
        ×
      </button>
    );
    let properties = Object.keys(this.state);
    let filteredProperties = properties.filter(
      x =>
        x !== "displayTooltip" && x !== "name" && x !== "image" && x !== "type"
    );
    let propertyInputs = filteredProperties.map(x => (
      <div key={x} className="property">
        <p>{translateProperty(x)}:</p>
        <input
          type="number"
          min={-999}
          max={999}
          placeholder={translateProperty(x)}
          value={this.state[x] === 0 ? "" : this.state[x]}
          onChange={event => this.handleChangeNumeric(event, x)}
        ></input>
      </div>
    ));
    return (
      <form onSubmit={this.createItem} className={"itemsList"}>
        <div className={"title"}>
          <p>Tutaj możesz stworzyć własny przedmiot</p>
        </div>
        <div className={"propertyList"}>
          <div
            className="property"
          >
            <p>Nazwa: </p>
            <input
              className="textInput"
              type="text"
              maxLength={30}
              placeholder="Wpisz nazwę"
              value={this.state.name}
              onChange={event => this.handleChangeString(event, "name")}
            ></input>
          </div>
          <div
            className="property"

          >
            <p>Obrazek (URL): </p>
            <input
              className="textInput"
              type="text"
              placeholder="Wklej adres obrazka"
              value={this.state.image === "anvilcolor.svg" ? "" : this.state.image}
              onChange={event => this.handleChangeString(event, "image")}
            ></input>
          </div>
          {propertyInputs}
          <div className="submit">
            <input
              type="submit"
              value="Zatwierdź"
            ></input>
          </div>
        </div>
        {closeButton}
      </form>
    )
  }
}

interface PropTypes {
  type: string
  closeForm(): void
}

interface StateTypes {
  name: string;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
  hp: number;
  endurance: number;
  mana: number;
  damage: number;
  fireRes: number;
  frostRes: number;
  energyRes: number;
  curseRes: number;
  pierceRes: number;
  cutRes: number;
  bluntRes: number
}
