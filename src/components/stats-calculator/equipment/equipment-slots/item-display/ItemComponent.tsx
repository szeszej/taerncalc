//React
import React from "react";

//Components
import { ItemTooltip } from "../shared/ItemTooltip";

//Types
import { Item } from "../../../../../data/models/item.model";
import { Equipment } from "../../../../../store/equipment-reducer/equipment-reducer";

export class ItemComponent extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      displayTooltip: false,
    };
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
  render() {
    let itemStyle = {
      borderColor: "#0161E7",
    };
    let itemBackground = {backgroundImage: `url("images/items/` + this.props.item.image + `")`}
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
        onClick={(event) => {
          event.stopPropagation();
          if (
            this.props.equipItem &&
            this.props.hideItemsList &&
            this.props.type
          ) {
            if (this.props.search) {
              this.props.equipItem(this.props.item, this.props.type, true);
            } else {
              this.props.equipItem(this.props.item, this.props.type);
            }

            this.props.hideItemsList();
          }
        }}
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
        <div className="itemImage" style={itemBackground}></div>
      </div>
    );
  }
}

//Types
interface PropTypes {
  item: Item;
  type?: keyof Equipment;
  class: string;
  level: number;
  hideItemsList?(): void;
  equipItem?(item: Item, slot: keyof Equipment, search?: boolean): void;
  strength?: number;
  agility?: number;
  power?: number;
  knowledge?: number;
  search?: boolean;
}

interface StateTypes {
  displayTooltip: boolean;
}
