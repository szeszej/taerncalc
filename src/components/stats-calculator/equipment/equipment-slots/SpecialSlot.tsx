//React
import React from "react";

//Components
import { ItemTooltip } from "./shared/ItemTooltip.jsx";

//Shared functionality
import translateProperty from "../../../../shared/translate-property";

//Types
import { Item } from "../../../../data/models/item.model";

export class SpecialSlot extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      name: "",
      image: "",
      type: "special",
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
      displayTooltip: false,
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  createItem(properties: SpecialItemProperties) {
    if (properties.image === "") {
      properties.image = "anvilcolor.svg";
    }
    let specialItem = new Item(properties);
    return this.props.equipItem(specialItem, "special");
  }
  hideTooltipWithListUp(
    hideTip: () => void,
    showList: (type: "special") => void,
    type: "special"
  ) {
    hideTip();
    showList(type);
  }
  showTooltip() {
    this.setState({
      displayTooltip: true,
    });
  }
  hideTooltip() {
    this.setState({
      displayTooltip: false,
    });
  }
  handleClick(event: React.FormEvent, functionToRun: () => void) {
    event.stopPropagation();
    functionToRun();
  }
  handleChildClick(
    event: React.FormEvent,
    functionToRun: (type: "special") => void
  ) {
    event.stopPropagation();
    this.setState({
      displayTooltip: false,
    });
    functionToRun(this.props.type);
  }
  handleSubmit(event: React.FormEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.props.hideItemsList();
    this.createItem(this.state);
  }
  handleChange(
    value: string | number,
    property: keyof SpecialItemProperties
  ) {
    this.setState((prevState) => {
      let newState = {...prevState};
      //Fix the line below?
      (newState[property as keyof SpecialItemProperties] as any) = value;
      return newState
    })
  }
  render() {
    let unequipButton = (
      <button
        className={"unequipButton"}
        onClick={(event: React.FormEvent) => {
          this.setState({
            name: "",
            image: "",
            type: "special",
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
          });
          this.handleChildClick(event, this.props.unequipItem);
        }}
      >
        ×
      </button>
    );
    let closeButton = (
      <button
        className="closeList"
        onClick={(event) => this.handleClick(event, this.props.hideItemsList)}
      >
        ×
      </button>
    );
    let properties = Object.keys(this.state);
    let filteredProperties = properties.filter(
      (x) =>
        x !== "displayTooltip" && x !== "name" && x !== "image" && x !== "type"
    );
    let propertyInputs = filteredProperties.map((x) => (
      <div key={x} className="property">
        <p>{translateProperty(x)}:</p>
        <input
          type="number"
          placeholder={translateProperty(x)}
          value={
            this.state[x as keyof SpecialItemProperties] === 0
              ? ""
              : this.state[x as keyof SpecialItemProperties]
          }
          onChange={(event) => this.handleChange(parseInt(event.target.value), (x as keyof SpecialItemProperties))}
        ></input>
      </div>
    ));
    //upload obrazka?
    return (
      <div
        className="special"
        onClick={() =>
          this.hideTooltipWithListUp(
            this.hideTooltip,
            this.props.showItemsList,
            this.props.type
          )
        }
        onMouseEnter={this.props.inSlot ? () => this.showTooltip() : undefined}
        onMouseLeave={this.props.inSlot ? () => this.hideTooltip() : undefined}
        onTouchStart={this.props.inSlot ? () => this.showTooltip() : undefined}
        onTouchEnd={this.props.inSlot ? () => this.hideTooltip() : undefined}
        style={
          this.props.inSlot
            ? {
                backgroundImage:
                  this.props.inSlot.image === "anvilcolor.svg"
                    ? `url("/images/items/` + this.props.inSlot.image + `")`
                    : `url("` + this.props.inSlot.image + `")`,
              }
            : undefined
        }
      >
        {this.props.listToDisplay === this.props.type ? (
          <div className={"itemsList"}>
            <div className={"title"}>
              <p>Stwórz własny przedmiot</p>
            </div>
            <form onSubmit={this.handleSubmit} className="propertyList">
              <div className="property">
                <p>Nazwa: </p>
                <input
                  className="textInput"
                  type="text"
                  maxLength={30}
                  placeholder="Wpisz nazwę"
                  value={this.state.name}
                  onChange={(event) => this.handleChange(event.target.value, "name")}
                ></input>
              </div>
              <div className="property">
                <p>Obrazek (URL): </p>
                <input
                  className="textInput"
                  type="text"
                  placeholder="Wklej adres obrazka"
                  value={
                    this.state.image === "anvilcolor.svg"
                      ? ""
                      : this.state.image
                  }
                  onChange={(event) => this.handleChange(event.target.value, "image")}
                ></input>
              </div>
              {propertyInputs}
              <div className="submit">
                <input type="submit" value="Zatwierdź"></input>
              </div>
            </form>
            {closeButton}
          </div>
        ) : null}
        {this.state.displayTooltip &&
        !(this.props.listToDisplay === this.props.type) ? (
          <ItemTooltip item={this.props.inSlot} />
        ) : null}
        {this.props.inSlot ? unequipButton : null}
      </div>
    );
  }
}

interface PropTypes {
  type: "special";
  inSlot: Item | null;
  listToDisplay: string;
  equipItem(item: Item, slot: "special"): void;
  unequipItem(slot: "special"): void;
  showItemsList(type: "special"): void;
  hideItemsList(): void;
}

interface StateTypes extends SpecialItemProperties {
  displayTooltip: boolean;
}

interface SpecialItemProperties {
  name: string;
  image: string;
  type: "special";
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
  bluntRes: number;
}
