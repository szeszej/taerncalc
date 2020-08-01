//React
import React from "react";

//Components
import { Item } from "../../../../data/models/item.model.js";
import { ItemTooltip } from "./item-display/ItemTooltip.jsx"

//Shared functionality
import isEquivalent from "../../../../shared/object-equivalency-check"

export class SpecialSlot extends React.Component {
  constructor(props) {
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
      displayTooltip: false
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.inSlot !== null && !isEquivalent(prevProps, this.props) ) {
      this.setState(
        {
          name: this.props.inSlot.name,
          image: this.props.inSlot.image,
          strength: this.props.inSlot.strength,
          agility: this.props.inSlot.agility,
          power: this.props.inSlot.power,
          knowledge: this.props.inSlot.knowledge,
          hp: this.props.inSlot.hp,
          endurance: this.props.inSlot.endurance,
          mana: this.props.inSlot.mana,
          damage: this.props.inSlot.damage,
          fireRes: this.props.inSlot.fireRes,
          frostRes: this.props.inSlot.frostRes,
          energyRes: this.props.inSlot.energyRes,
          curseRes: this.props.inSlot.curseRes,
          pierceRes: this.props.inSlot.pierceRes,
          cutRes: this.props.inSlot.cutRes,
          bluntRes: this.props.inSlot.bluntRes
        }
      )
    }
  }
  createItem(properties) {
    let specialItem = new Item(properties);
    return this.props.equipItem(specialItem, "special");
  }
  hideTooltipWithListUp(hideTip, showList, type) {
    hideTip();
    showList(type);
  }
  showTooltip() {
    this.setState({
      displayTooltip: true
    });
  }
  hideTooltip() {
    this.setState({
      displayTooltip: false
    });
  }
  handleClick(event, functionToRun) {
    event.stopPropagation();
    functionToRun();
  }
  handleChildClick(event, functionToRun) {
    event.stopPropagation();
    this.setState({
      displayTooltip: false
    });
    functionToRun(this.props.type);
  }
  clearBackground() {
    let itemBackground = {
      backgroundImage: "none"
    };
    return itemBackground;
  }
  handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.hideItemsList();
    this.createItem(this.state);
  }
  handleChangeNumeric(event, property) {
    console.log(event.target.value);
    if (Number.isInteger(parseInt(event.target.value))) {
      this.setState({ [property]: parseInt(event.target.value) });
    } else {
      this.setState({ [property]: 0 });
    }
  }
  handleChangeString(event, property) {
    this.setState({ [property]: event.target.value });
  }
  translateProperty(property) {
    let inPolish = "";
    switch (property) {
      case "strength":
        inPolish = "Siła";
        break;
      case "agility":
        inPolish = "Zręczność";
        break;
      case "knowledge":
        inPolish = "Wiedza";
        break;
      case "power":
        inPolish = "Moc";
        break;
      case "hp":
        inPolish = "Punkty życia";
        break;
      case "mana":
        inPolish = "Mana";
        break;
      case "endurance":
        inPolish = "Kondycja";
        break;
      case "damage":
        inPolish = "Obrażenia";
        break;
      case "cutRes":
        inPolish = "Odp. na sieczne";
        break;
      case "bluntRes":
        inPolish = "Odp. na obuchowe";
        break;
      case "pierceRes":
        inPolish = "Odp. na kłute";
        break;
      case "fireRes":
        inPolish = "Odp. na ogień";
        break;
      case "frostRes":
        inPolish = "Odp. na zimno";
        break;
      case "curseRes":
        inPolish = "Odp. na uroki";
        break;
      case "energyRes":
        inPolish = "Odp. na energię";
        break;
      default:
        inPolish = "błąd";
        break;
    }
    return inPolish;
  }
  render() {
    let unequipButton = (
      <button
        className={"unequipButton"}
        onClick={event => this.handleChildClick(event, this.props.unequipItem)}
      >
        ×
      </button>
    );
    let closeButton = (
      <button
        className="closeList"
        onClick={event => this.handleClick(event, this.props.hideItemsList)}
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
        <p>{this.translateProperty(x)}:</p>
        <input
          type="number"
          min={-999}
          max={999}
          placeholder={this.translateProperty(x)}
          value={this.state[x] === 0 ? "" : this.state[x]}
          onChange={event => this.handleChangeNumeric(event, x)}
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
        onMouseEnter={this.props.inSlot ? () => this.showTooltip() : null}
        onMouseLeave={this.props.inSlot ? () => this.hideTooltip() : null}
        style={
          this.props.inSlot && this.props.inSlot.image
            ? this.clearBackground()
            : null
        }
      >
        {this.props.listToDisplay === this.props.type ? (
          <div className={"itemsList"}>
            <div className={"title"}>
              <p>Tutaj możesz stworzyć własny przedmiot</p>
            </div>
            <form onSubmit={this.handleSubmit}>
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
                <p>Obrazek: </p>
                <input
                  className="textInput"
                  type="text"
                  placeholder="Wklej adres obrazka"
                  value={this.state.image}
                  onChange={event => this.handleChangeString(event, "image")}
                ></input>
              </div>
              {propertyInputs}
              <div className="submit">
                <input
                  onSubmit={this.handleSubmit}
                  type="submit"
                  value="Zatwierdź"
                ></input>
              </div>
            </form>
            {closeButton}
          </div>
        ) : null}
        {this.state.displayTooltip &&
        !(this.props.listToDisplay === this.props.type) ? (
          <ItemTooltip item={this.props.inSlot} />
        ) : null}
        {this.props.inSlot && this.props.inSlot.image ? (
          <img src={this.props.inSlot.image} alt={this.props.inSlot.name} />
        ) : null}
        {this.props.inSlot ? unequipButton : null}
      </div>
    );
  }
}
