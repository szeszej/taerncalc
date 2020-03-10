import React from 'react';

class ItemsList extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
    let closeButton = <button onClick={() => this.props.hideItemsList}>×</button>;
    let equippableItems = this.props.filteredItems.filter(x => this.props.level >= x.reqLvl && this.props.strength >= x.reqStr && this.props.agility >= x.reqAgi && this.props.knowledge >= x.reqKno && this.props.power >= x.reqPow && (x.class === null || x.class === this.props.class));
    let unequippableItems = this.props.filteredItems.filter(x => this.props.level < x.reqLvl || this.props.strength < x.reqStr || this.props.agility < x.reqAgi || this.props.knowledge < x.reqKno || this.props.power < x.reqPow || (x.class !== null && x.class !== this.props.class));
    let equippableItemsComponents = <div className={"equippableItems"}>{equippableItems.map(x => <ItemComponent key={x.name} item={x} equipItem={this.equipItem} />)}</div>;
    let unequippableItemsComponents = <div className={"equippableItems"}>{unequippableItems.map(x => <ItemComponent key={x.name} item={x} />)}</div>;
    return (
        <div className={"itemsList"}>{equippableItemsComponents}{unequippableItemsComponents}{closeButton}</div>
    )
  }
}


class ItemComponent extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    let itemStyle = {
      backgroundImage: `url("/images/items/` + this.props.item.image + `")`,
      borderColor: "#0161E7"
    }

    if (this.props.item.rarity === "Psychorare") {
        itemStyle.borderColor = "#35CBEF"
    } else if (this.props.item.rarity === "Zestaw") {
        itemStyle.borderColor = "#3DEF01"
    } else if (this.props.item.rarity === "Epik") {
        itemStyle.borderColor = "#E7CC00"
    }
    return(
      <div className="itemOnList" style={itemStyle} onClick={() => this.props.equipItem(this.props.item)}></div>
    )
  }
}

class ItemTooltip extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    )
  }
}

export {ItemsList}
