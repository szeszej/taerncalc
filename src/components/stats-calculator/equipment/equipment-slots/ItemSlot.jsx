//React
import React from "react";

//Components
import { ItemTooltip } from "./shared/ItemTooltip.jsx"
import { ItemEnhancementForm } from "./shared/ItemEnhancementForm"
import { ItemsList } from "./item-display/ItemsList.jsx"

//Shared functionality
import isEquivalent from "../../../../shared/object-equivalency-check"

export class ItemSlot extends React.Component {
  constructor(props) {
    super(props);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.state = {
      displayTooltip: false,
      displayEnhancementForm: false
    };
  }
  componentDidUpdate(prevProps) {
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
  hideTooltipWithListUp(hideTip, showList, type) {
    hideTip();
    showList(type);
  }
  showTooltip() {
    if (!this.state.displayEnhancementForm) {
      this.setState({
        displayTooltip: true
      });
    }
  }
  hideTooltip() {
    this.setState({
      displayTooltip: false
    });
  }
  showForm() {
    this.setState({
      displayEnhancementForm: true
    });
  }
  hideForm() {
    this.setState({
      displayEnhancementForm: false
    });
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
    let enhanceButton = (<button className="enhanceButton" onClick={event => this.handleChildClick(event, this.showForm)}>★</button>)
    return (
      <div
        className={this.props.inSlot ? this.props.type + " inSlot" : this.props.type}
        onClick={() =>
          this.hideTooltipWithListUp(
            this.hideTooltip,
            this.props.showItemsList,
            this.props.type
          )
        }
        onMouseEnter={this.props.inSlot ? () => this.showTooltip() : null}
        onMouseLeave={this.props.inSlot ? () => this.hideTooltip() : null}
        onTouchStart={this.props.inSlot ? () => this.showTooltip() : null}
        onTouchEnd={this.props.inSlot ? () => this.hideTooltip() : null}
        style={this.props.inSlot ? {backgroundImage: `url("/images/items/` + this.props.inSlot.image + '")'} : null}
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
        {this.props.inSlot ? unequipButton : null}
        {this.props.inSlot ? enhanceButton : null}
        {this.state.displayEnhancementForm ? <ItemEnhancementForm type={this.props.type} enhancements={this.props.inSlot.enhancements} closeForm={this.hideForm} /> : null}
      </div>
    );
  }
}
