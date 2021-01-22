//React
import React from "react";

//Components
import { ItemComponent } from "./ItemComponent";

//Types
import { Item } from "../../../../../../data/models/item.model";
import { Equipment } from "../../../../../../store/equipment-reducer/equipment-reducer";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedItemsSearchList extends React.Component<PropTypes, StateTypes> {
  render() {
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
    let equippableItems = this.props.items.filter(
      (x) =>
        this.props.level >= x.reqLvl &&
        this.props.strength >= x.reqStr &&
        this.props.agility >= x.reqAgi &&
        this.props.knowledge >= x.reqKno &&
        this.props.power >= x.reqPow
    );
    let unequippableItems = this.props.items.filter(
      (x) =>
        this.props.level < x.reqLvl ||
        this.props.strength < x.reqStr ||
        this.props.agility < x.reqAgi ||
        this.props.knowledge < x.reqKno ||
        this.props.power < x.reqPow
    );
    let equippableItemsComponents =
      equippableItems.length < 10 ? (
        <div className={"equippableItems"}>
          {equippableItems.map((x) => (
            <ItemComponent
              key={x.name}
              class={this.props.class}
              type={
                x.type === "ring"
                  ? this.props.isRing1Equipped
                    ? "ring2"
                    : "ring1"
                  : x.type
              }
              item={x}
              level={this.props.level}
              equipItem={this.props.equipItem}
              hideItemsList={this.props.hideItemsList}
              search={true}
            />
          ))}
        </div>
      ) : (
        <div className={"equippableItems"}>
          {equippableItems.slice(0, 8).map((x) => (
            <ItemComponent
              key={x.name}
              class={this.props.class}
              type={
                x.type === "ring"
                  ? this.props.isRing1Equipped
                    ? "ring2"
                    : "ring1"
                  : x.type
              }
              item={x}
              level={this.props.level}
              equipItem={this.props.equipItem}
              hideItemsList={this.props.hideItemsList}
              search={true}
            />
          ))}
          <div className="itemOnList moreItems">
            <p>{equippableItems.length - 9}+</p>
          </div>
        </div>
      );
    let unequippableItemsComponents =
      unequippableItems.length < 10 ? (
        <div className={"unequippableItems"}>
          {unequippableItems.map((x) => (
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
      ) : (
        <div className={"unequippableItems"}>
          {unequippableItems.slice(0, 8).map((x) => (
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
          <div className="itemOnList moreItems">
            <p>{unequippableItems.length - 9}+</p>
          </div>
        </div>
      );
    return (
      <div className="itemsList">
        {this.props.items.length ? (
          equippableItemsComponents
        ) : (
          <div className="notFound">
            <p className="notFoundMessage">
              {this.props.t("no-items-found")}
            </p>
          </div>
        )}
        {this.props.items.length ? unequippableItemsComponents : null}
        {closeButton}
      </div>
    );
  }
}

export const ItemsSearchList = withTranslation()(ConnectedItemsSearchList)

//Types
interface PropTypes {
  items: Item[];
  class: string;
  level: number;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
  isRing1Equipped: boolean;
  equipItem(item: Item, slot: keyof Equipment, search?: boolean): void;
  hideItemsList(): void;
  t(string: string): string;
}

interface StateTypes {
  displayAddItemForm: boolean;
}
