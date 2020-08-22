import React from "react";

import { ItemTooltip } from "../shared/ItemTooltip.jsx"

export class ItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTooltip: false
    };
  }
  equipItemAndHideList(event, item, type) {
    event.stopPropagation();
    this.props.equipItem(item, type);
    this.props.hideItemsList();
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
  render() {
    let itemStyle = {
      backgroundImage: `url("images/items/` + this.props.item.image + `")`,
      borderColor: "#0161E7"
    };

    if (this.props.item.rarity === "Psychorare") {
      itemStyle.borderColor = "#35CBEF";
    } else if (this.props.item.rarity === "Set") {
      itemStyle.borderColor = "#3DEF01";
    } else if (this.props.item.rarity === "Epik") {
      itemStyle.borderColor = "#E7CC00";
    }
    if (!this.props.hasOwnProperty("equipItem")) {
      itemStyle.borderColor = "red";
    }
    return (
      <div
        className="itemOnList"
        style={itemStyle}
        onMouseEnter={() => this.showTooltip()}
        onMouseLeave={() => this.hideTooltip()}
        onTouchStart={() => this.showTooltip()}
        onTouchEnd={() => this.hideTooltip()}
        onClick={event =>
          this.props.hasOwnProperty("equipItem")
            ? this.equipItemAndHideList(event, this.props.item, this.props.type)
            : null
        }
      >
        {this.state.displayTooltip ? (
          <ItemTooltip
            item={this.props.item}
            class={this.props.class}
            level={this.props.level}
            strength={this.props.strength}
            agility={this.props.agility}
            power={this.props.power}
            knowledge={this.props.knowledge}
          />
        ) : null}
      </div>
    );
  }
}
