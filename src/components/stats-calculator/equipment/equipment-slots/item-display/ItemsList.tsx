//React
import React from "react";

//Components
import { ItemComponent } from "./ItemComponent"
import { ItemCreatorForm } from "../shared/ItemCreatorForm"

//Types
import { Item } from "../../../../../data/models/item.model"
import { Equipment } from "../../../../../store/equipment-reducer/equipment-reducer"


export class ItemsList extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)
    this.state = {
      displayAddItemForm: false
    }
    this.showAddItemForm = this.showAddItemForm.bind(this)
    this.hideAddItemForm = this.hideAddItemForm.bind(this)
  }
  showAddItemForm() {
    this.setState({
      displayAddItemForm: true
    })
  }
  hideAddItemForm() {
    this.setState({
      displayAddItemForm: false
    })
  }
  translateSlot(slotName: string): string {
    let inPolish = "";
    switch (slotName) {
      case "armor":
        inPolish = "Własny pancerz";
        break;
      case "helmet":
        inPolish = "Własny hełm";
        break;
      case "neck":
        inPolish = "Własny naszyjnik";
        break;
      case "gloves":
        inPolish = "Własne rękawice";
        break;
      case "weapon":
        inPolish = "Własna broń";
        break;
      case "shield":
        inPolish = "Własna tarcza";
        break;
      case "belt":
        inPolish = "Własny pas";
        break;
      case "boots":
        inPolish = "Własne buty";
        break;
      case "ring1":
        inPolish = "Własny pierścień";
        break;
      case "ring2":
        inPolish = "Własny pierścień";
        break;
      case "pants":
        inPolish = "Własne spodnie";
        break;
      case "cape":
        inPolish = "Własny płaszcz";
        break;
      default:
        inPolish = "błąd";
        break;
    }
    return inPolish;
  }
  render() {
    let closeButton = (
      <button
        className="closeList"
        onClick={event => {
          event.stopPropagation();
          this.props.hideItemsList()
        }}
      >
        ×
      </button>
    );
    let equippableItems = this.props.items.filter(
      x =>
        this.props.level >= x.reqLvl &&
        this.props.strength >= x.reqStr &&
        this.props.agility >= x.reqAgi &&
        this.props.knowledge >= x.reqKno &&
        this.props.power >= x.reqPow
    );
    let unequippableItems = this.props.items.filter(
      x =>
        this.props.level < x.reqLvl ||
        this.props.strength < x.reqStr ||
        this.props.agility < x.reqAgi ||
        this.props.knowledge < x.reqKno ||
        this.props.power < x.reqPow
    );
    let equippableItemsComponents = (
      <div className={"equippableItems"}>
        {equippableItems.map(x => (
          <ItemComponent
            key={x.name}
            class={this.props.class}
            type={this.props.type}
            item={x}
            level={this.props.level}
            equipItem={this.props.equipItem}
            hideItemsList={this.props.hideItemsList}
          />
        ))}
        <div className="itemOnList addItem" onClick={this.showAddItemForm}></div>
      </div>
    );
    let unequippableItemsComponents = (
      <div className={"unequippableItems"}>
        {unequippableItems.map(x => (
          <ItemComponent
            key={x.name}
            item={x}
            class={this.props.class}
            level={this.props.level}
            strength={this.props.strength}
            agility={this.props.agility}
            power={this.props.power}
            knowledge={this.props.knowledge}
          />
        ))}
      </div>
    );
    return (
      <div className="itemsList">
        {this.state.displayAddItemForm ? <ItemCreatorForm closeForm={this.hideAddItemForm} name={this.translateSlot(this.props.type) + " " + (this.props.items.filter(x => x.isCustom).length + 1)} type={this.props.type} closeList={this.props.hideItemsList} /> : null}
        {this.props.items.length ? (
          equippableItemsComponents
        ) : (
          <div className="notFound">
            <p className="notFoundMessage">
              Brak przedmiotów po zastosowaniu filtrów.
            </p>
          </div>
        )}
        {this.props.items.length ? unequippableItemsComponents : null}
        {closeButton}
      </div>
    );
  }
}

//Types
interface PropTypes {
  items: Item[]
  type: keyof Equipment
  class: string
  level: number
  strength: number
  agility: number
  power: number
  knowledge: number
  hideItemsList(): void
  equipItem(item: Item, slot: keyof Equipment): void
}

interface StateTypes {
  displayAddItemForm: boolean
}
