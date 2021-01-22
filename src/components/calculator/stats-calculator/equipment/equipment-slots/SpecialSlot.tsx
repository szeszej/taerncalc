//React
import React from "react";

//Components
import { ItemTooltip } from "./shared/ItemTooltip";

//i18l
import { withTranslation } from "react-i18next";

//Types
import { Item } from "../../../../../data/models/item.model";

class ConnecedSpecialSlot extends React.Component<PropTypes, StateTypes> {
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
    this.hideTooltipWithListUp = this.hideTooltipWithListUp.bind(this);
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
    showList: (type: "special") => void
  ) {
    hideTip();
    showList(this.props.type);
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
  handleSubmit(event: React.FormEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.props.hideItemsList();
    this.createItem(this.state);
  }
  handleChange(value: string | number, property: keyof SpecialItemProperties) {
    this.setState((prevState) => {
      let newState = { ...prevState };
      //Fix the line below?
      (newState[property as keyof SpecialItemProperties] as any) = value;
      return newState;
    });
  }
  render() {
    const { t } = this.props
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
            displayTooltip: false,
          });
          event.stopPropagation();
          this.props.unequipItem(this.props.type);
        }}
      >
        ×
      </button>
    );
    let closeButton = (
      <button
        className="closeList"
        onClick={(event) => {
          event.stopPropagation();
          this.props.hideItemsList();
        }}
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
        <img src={"images/" + x + ".svg"} alt={x}/>
        <p>{t(x)}:</p>
        <input
          type="number"
          placeholder={t(x)}
          value={
            this.state[x as keyof SpecialItemProperties] === 0
              ? ""
              : this.state[x as keyof SpecialItemProperties]
          }
          onChange={(event) =>
            this.handleChange(
              parseInt(event.target.value),
              x as keyof SpecialItemProperties
            )
          }
        ></input>
      </div>
    ));
    //upload obrazka?
    return (
      <div
        className="special"
        title={t("Stwórz własny przedmiot")}
        onClick={() =>
          this.hideTooltipWithListUp(
            this.hideTooltip,
            this.props.showItemsList
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
              <p>{t("Stwórz własny przedmiot")}</p>
            </div>
            <form onSubmit={this.handleSubmit} className="propertyList">
              <div className="property">
                <p>{t("Nazwa")}: </p>
                <input
                  className="textInput"
                  type="text"
                  maxLength={30}
                  placeholder={t("Wpisz nazwę")}
                  value={this.state.name}
                  onChange={(event) =>
                    this.handleChange(event.target.value, "name")
                  }
                ></input>
              </div>
              <div className="property">
                <p>{t("image-url")}: </p>
                <input
                  className="textInput"
                  type="text"
                  placeholder={t("Wklej adres obrazka")}
                  value={
                    this.state.image === "anvilcolor.svg"
                      ? ""
                      : this.state.image
                  }
                  onChange={(event) =>
                    this.handleChange(event.target.value, "image")
                  }
                ></input>
              </div>
              {propertyInputs}
              <div className="submit">
                <input type="submit" value={t("Zatwierdź")}></input>
              </div>
            </form>
            {closeButton}
          </div>
        ) : null}
        {this.state.displayTooltip &&
        !(this.props.listToDisplay === this.props.type) && this.props.inSlot ? (
          <ItemTooltip item={this.props.inSlot} />
        ) : null}
        {this.props.inSlot ? unequipButton : null}
      </div>
    );
  }
}

export const SpecialSlot = withTranslation()(ConnecedSpecialSlot)

interface PropTypes {
  type: "special"
  inSlot: Item | null
  listToDisplay: string
  equipItem(item: Item, slot: "special"): void
  unequipItem(slot: "special"): void
  showItemsList(type: "special"): void
  hideItemsList(): void
  t(string: string): string;
}

interface StateTypes extends SpecialItemProperties {
  displayTooltip: boolean
}

interface SpecialItemProperties {
  name: string
  image: string
  type: "special"
  strength: number
  agility: number
  power: number
  knowledge: number
  hp: number
  endurance: number
  mana: number
  damage: number
  fireRes: number
  frostRes: number
  energyRes: number
  curseRes: number
  pierceRes: number
  cutRes: number
  bluntRes: number
}
