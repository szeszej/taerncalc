import React from 'react';

class ItemsList extends React.Component {
  constructor(props) {
      super(props);
  }
  handleClick(event, functionToRun) {
    event.stopPropagation();
    functionToRun();
  }
  render() {
    let closeButton = <button className="closeList" onClick={(event) => this.handleClick(event, this.props.hideItemsList)}>×</button>;
    let equippableItems = this.props.items.filter(x => this.props.level >= x.reqLvl && this.props.strength >= x.reqStr && this.props.agility >= x.reqAgi && this.props.knowledge >= x.reqKno && this.props.power >= x.reqPow && (x.class === null || x.class === this.props.class));
    let unequippableItems = this.props.items.filter(x => this.props.level < x.reqLvl || this.props.strength < x.reqStr || this.props.agility < x.reqAgi || this.props.knowledge < x.reqKno || this.props.power < x.reqPow || (x.class !== null && x.class !== this.props.class));
    let equippableItemsComponents = <div className={"equippableItems"}>{equippableItems.map(x => <ItemComponent key={x.name} type={this.props.type} item={x} equipItem={this.props.equipItem} hideItemsList={this.props.hideItemsList} />)}</div>;
    let unequippableItemsComponents = <div className={"unequippableItems"}>{unequippableItems.map(x => <ItemComponent key={x.name} item={x} />)}</div>;
    return (
        <div className={"itemsList"}>{equippableItemsComponents}{unequippableItemsComponents}{closeButton}</div>
    )
  }
}


class ItemComponent extends React.Component {
  constructor (props) {
    super(props);
  }
  equipItemAndHideList(event, item, type) {
    event.stopPropagation();
    this.props.equipItem(item, type);
    this.props.hideItemsList();
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
    if (!this.props.hasOwnProperty("equipItem")) {
        itemStyle.borderColor = "red"
    }
    return(
      <div className="itemOnList" style={itemStyle} onClick={(event) => this.props.hasOwnProperty("equipItem") ? this.equipItemAndHideList(event, this.props.item, this.props.type) : null}></div>
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
