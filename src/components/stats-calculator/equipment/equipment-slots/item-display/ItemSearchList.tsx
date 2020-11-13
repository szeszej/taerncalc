//React
import React from "react";

//Components
import { ItemComponent } from "./ItemComponent"
import { ItemCreatorForm } from "../shared/ItemCreatorForm"

//Types
import { Item } from "../../../../../data/models/item.model"
import { Equipment } from "../../../../../store/equipment-reducer/equipment-reducer"


export class ItemsSearchList extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)
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
        this.props.power >= x.reqPow &&
        (x.class === null || x.class === this.props.class)
    );
    let unequippableItems = this.props.items.filter(
      x =>
        this.props.level < x.reqLvl ||
        this.props.strength < x.reqStr ||
        this.props.agility < x.reqAgi ||
        this.props.knowledge < x.reqKno ||
        this.props.power < x.reqPow ||
        (x.class !== null && x.class !== this.props.class)
    );
    let equippableItemsComponents = (
      <div className={"equippableItems"}>
        {equippableItems.map(x => (
          <ItemComponent
            key={x.name}
            class={this.props.class}
            type={x.type === "ring" ? this.props.isRing1Equipped ? "ring2" : "ring1" : x.type}
            item={x}
            level={this.props.level}
            equipItem={this.props.equipItem}
            hideItemsList={this.props.hideItemsList}
          />
        ))}
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
        {equippableItemsComponents}
        {unequippableItemsComponents}
        {closeButton}
      </div>
    );
  }
}

//Types
interface PropTypes {
  items: Item[]
  class: string
  level: number
  strength: number
  agility: number
  power: number
  knowledge: number
  isRing1Equipped: boolean
  hideItemsList(): void
  equipItem(item: Item, slot: keyof Equipment): void
}

interface StateTypes {
  displayAddItemForm: boolean
}
