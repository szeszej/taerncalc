import React from "react";

import { ItemTooltip } from "./item-display/ItemTooltip.jsx"
import { ItemsList } from "./item-display/ItemsList.jsx"

export class ItemSlot extends React.Component {
  constructor(props) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.state = {
      displayTooltip: false
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.inSlot && !this.props.isEquivalent(prevProps, this.props)) {
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
  clearBackground() {
    let itemBackground = {
      backgroundImage: "none"
    };
    return itemBackground;
  }
  handleChildClick(event, functionToRun) {
    event.stopPropagation();
    this.setState({
      displayTooltip: false
    });
    functionToRun(this.props.type);
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
    return (
      <div
        className={this.props.type}
        onClick={() =>
          this.hideTooltipWithListUp(
            this.hideTooltip,
            this.props.showItemsList,
            this.props.type
          )
        }
        onMouseEnter={this.props.inSlot ? () => this.showTooltip() : null}
        onMouseLeave={this.props.inSlot ? () => this.hideTooltip() : null}
        style={this.props.inSlot ? this.clearBackground() : null}
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
        !(this.props.listToDisplay === this.props.type) ? (
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
        {this.props.inSlot ? (
          <img
            src={`images/items/` + this.props.inSlot.image}
            alt={this.props.inSlot.name}
          />
        ) : null}
        {this.props.inSlot ? unequipButton : null}
      </div>
    );
  }
}
