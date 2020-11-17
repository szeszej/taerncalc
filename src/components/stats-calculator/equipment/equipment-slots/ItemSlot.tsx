//React
import React from "react";

//Components
import { ItemTooltip } from "./shared/ItemTooltip";
import { ItemEnhancementForm } from "./shared/ItemEnhancementForm";
import { ItemsList } from "./item-display/ItemsList";

//Types
import { Item } from "../../../../data/models/item.model"
import { Equipment } from "../../../../store/equipment-reducer/equipment-reducer"

//Shared functionality
import isEquivalent from "../../../../shared/object-equivalency-check";

export class ItemSlot extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.state = {
      displayTooltip: false,
      displayEnhancementForm: false,
    };
  }
  componentDidUpdate(prevProps: PropTypes) {
    if (this.props.inSlot && !isEquivalent(prevProps, this.props)) {
      if (
        this.props.level < this.props.inSlot.reqLvl ||
        this.props.strength < this.props.inSlot.reqStr ||
        this.props.agility < this.props.inSlot.reqAgi ||
        this.props.knowledge < this.props.inSlot.reqKno ||
        this.props.power < this.props.inSlot.reqPow
      ) {
        this.props.unequipItem(this.props.type);
      }
    }
  }
  hideTooltipWithListUp(
    hideTip: () => void,
    showList: (type: keyof Equipment) => void
  ) {
    hideTip();
    showList(this.props.type);
  }
  showTooltip() {
    if (!this.state.displayEnhancementForm) {
      this.setState({
        displayTooltip: true,
      });
    }
  }
  hideTooltip() {
    this.setState({
      displayTooltip: false,
    });
  }
  showForm() {
    this.setState({
      displayTooltip: false,
      displayEnhancementForm: true,
    });
  }
  hideForm() {
    this.setState({
      displayEnhancementForm: false,
    });
  }
  render() {
    let unequipButton = (
      <button
        className={"unequipButton"}
        onClick={(event) => {
          event.stopPropagation()
          this.setState({
            displayTooltip: false,
            displayEnhancementForm: false
          })
          this.props.unequipItem(this.props.type)
        }
        }
      ></button>
    );
    let enhanceButton = (
      <button
        className="enhanceButton"
        style={this.props.inSlot && (this.props.inSlot.enhancements.strength || this.props.inSlot.enhancements.agility || this.props.inSlot.enhancements.power || this.props.inSlot.enhancements.knowledge || this.props.inSlot.enhancements.hp || this.props.inSlot.enhancements.mana || this.props.inSlot.enhancements.endurance || this.props.inSlot.enhancements.damage) ? {backgroundImage: `url("/images/upgrade2.png")`} : undefined}
        onClick={(event) => {
          event.stopPropagation()
          this.showForm()
        }}
      ></button>
    );
    let addPsychoLvlButton = (
      <button
        className={"addPsychoLvlButton"}
        disabled={this.props.inSlot && this.props.inSlot.psychoLvl === 8 ? true : false}
        onClick={(event) => {
          event.stopPropagation();
          this.props.changePsychoLvl(this.props.type, 1)
        }}
      ></button>
    )
    let substractPsychoLvlButton = (
      <button
        className={"substractPsychoLvlButton"}
        disabled={this.props.inSlot && this.props.inSlot.psychoLvl === 1 ? true : false}
        onClick={(event) => {
          event.stopPropagation();
          this.props.changePsychoLvl(this.props.type, -1)
        }}
      ></button>
    )
    let noItemsWarning = (<div className="noItemsWarning">!</div>)
    return (
      <div
        className={
          this.props.inSlot ? this.props.type + " inSlot" : this.props.type
        }
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
                  `url("/images/items/` + this.props.inSlot.image + '")',
              }
            : undefined
        }
      >
        {this.props.listToDisplay === this.props.type ? (
          <ItemsList
            items={this.props.items}
            type={this.props.type}
            class={this.props.class}
            level={this.props.level}
            strength={this.props.strength}
            agility={this.props.agility}
            power={this.props.power}
            knowledge={this.props.knowledge}
            hideItemsList={this.props.hideItemsList}
            equipItem={this.props.equipItem}
          />
        ) : null}
        {this.state.displayTooltip &&
        !(this.props.listToDisplay === this.props.type) && this.props.inSlot ? (
          <ItemTooltip
            item={this.props.inSlot}
            class={this.props.class}
            level={this.props.level}
            strength={this.props.strength}
            agility={this.props.agility}
            power={this.props.power}
            knowledge={this.props.knowledge}
          />
        ) : null}
        {this.props.inSlot ? unequipButton : null}
        {this.props.inSlot ? enhanceButton : null}
        {this.props.inSlot && this.props.inSlot.psychoLvl ? addPsychoLvlButton : null}
        {this.props.inSlot && this.props.inSlot.psychoLvl ? substractPsychoLvlButton : null}
        {this.props.items.length ? null : noItemsWarning}
        {this.state.displayEnhancementForm ? (
          <ItemEnhancementForm
            type={this.props.type}
            enhancements={this.props.inSlot ? this.props.inSlot.enhancements : null}
            closeForm={this.hideForm}
          />
        ) : null}
      </div>
    );
  }
}

//Types
interface PropTypes {
  type: keyof Equipment
  items: Item[]
  inSlot: Item | null
  class: string
  level: number
  strength: number
  agility: number
  power: number
  knowledge: number
  listToDisplay: string
  equipItem(item: Item, slot: keyof Equipment): void
  unequipItem(slot: keyof Equipment): void
  showItemsList(type: keyof Equipment): void
  hideItemsList(): void
  changePsychoLvl(slot: keyof Equipment, value: number): void
}

interface StateTypes {
  displayTooltip: boolean
  displayEnhancementForm: boolean
}
