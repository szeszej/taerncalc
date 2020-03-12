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
    let equippableItemsComponents = <div className={"equippableItems"}>{equippableItems.map(x => <ItemComponent key={x.name} class={this.props.class} type={this.props.type} item={x} equipItem={this.props.equipItem} hideItemsList={this.props.hideItemsList} />)}</div>;
    let unequippableItemsComponents = <div className={"unequippableItems"}>{unequippableItems.map(x => <ItemComponent key={x.name} item={x} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} />)}</div>;
    return (
        <div className={"itemsList"}>{equippableItemsComponents}{unequippableItemsComponents}{closeButton}</div>
    )
  }
}


class ItemComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayTooltip: false,
    }
  }
  equipItemAndHideList(event, item, type) {
    event.stopPropagation();
    this.props.equipItem(item, type);
    this.props.hideItemsList();
  }
  showTooltip() {
    this.setState({
      displayTooltip: true
    })
  }
  hideTooltip() {
    this.setState({
      displayTooltip: false
    })
  }
  render() {
    let itemStyle = {
      backgroundImage: `url("images/items/` + this.props.item.image + `")`,
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
      <div className="itemOnList" style={itemStyle} onMouseEnter={() => this.showTooltip()} onMouseLeave={() => this.hideTooltip()} onClick={(event) => this.props.hasOwnProperty("equipItem") ? this.equipItemAndHideList(event, this.props.item, this.props.type) : null}>{this.state.displayTooltip ? <ItemTooltip item={this.props.item} class={this.props.class} level={this.props.level} strength={this.props.strength} agility={this.props.agility} power={this.props.power} knowledge={this.props.knowledge} /> : null}</div>
    )
  }
}

class ItemTooltip extends React.Component {
  constructor (props) {
    super(props);
  }
  nameColor(rarity) {
    let color = {
      color: "#0161E7"
    };
    if (rarity === "Psychorare") {
        color.color = "#35CBEF"
    } else if (rarity === "Zestaw") {
        color.color = "#3DEF01"
    } else if (rarity === "Epik") {
        color.color = "#E7CC00"
    }
    return color;
  }
  translateCharacterClass(characterClass) {
    let translatedClass = "";
    switch (characterClass) {
      case "druid":
        translatedClass = "Druid";
        break;
      case "barbarian":
        translatedClass = "Barbarzyńca";
        break;
      case "archer":
        translatedClass = "Łucznik";
        break;
      case "firemage":
        translatedClass = "Mag Ognia";
        break;
      case "knight":
        translatedClass = "Rycerz";
        break;
      case "voodoo":
        translatedClass = "VooDoo";
        break;
      case "sheed":
        translatedClass = "Sheed";
        break;
      default:
        translatedClass = "";
        break;
    }
    return translatedClass;
  }
  render() {
    let otherProperties = this.props.item.otherProperties.map(x => <p className="otherProperties" key={x}>{x}</p>);
    let notMeetingRequirements = {
      color: "red"
    };
    return (
      <div className="itemTooltip">
        <p className="itemName" style={this.nameColor(this.props.item.rarity)}>{this.props.item.name}</p>
        {this.props.item.set ? <p className="itemSet">Zestaw: {this.props.item.set}</p> : null}
        {this.props.item.class ? <p style={this.props.item.class !== this.props.class ? notMeetingRequirements : null} className="itemClass">Wym. klasa: {this.translateCharacterClass(this.props.item.class)}</p> : null}
        {this.props.item.reqLvl ? <p style={this.props.item.reqLvl > this.props.level ? notMeetingRequirements : null} className="itemReq">Wym. poziom: {this.props.item.reqLvl}</p> : null}
        {this.props.item.reqStr ? <p style={this.props.item.reqStr > this.props.strength ? notMeetingRequirements : null} className="itemReq">Wym. siła: {this.props.item.reqStr}</p> : null}
        {this.props.item.reqAgi ? <p style={this.props.item.reqAgi > this.props.agility ? notMeetingRequirements : null} className="itemReq">Wym. zręczność: {this.props.item.reqAgi}</p> : null}
        {this.props.item.reqPow ? <p style={this.props.item.reqPow > this.props.power ? notMeetingRequirements : null} className="itemReq">Wym. moc: {this.props.item.reqPow}</p> : null}
        {this.props.item.reqKno ? <p style={this.props.item.reqKno > this.props.knowledge ? notMeetingRequirements : null} className="itemReq">Wym. wiedza: {this.props.item.reqKno}</p> : null}
        {this.props.item.weaponType ? <p className="itemProperty">Typ broni: {this.props.item.weaponType}</p> : null}
        {this.props.item.damageType ? <p className="itemProperty">Typ obrażeń: {this.props.item.damageType}</p> : null}
        {this.props.item.damage ? <p className="itemProperty">Obrażenia: {this.props.item.damage}</p> : null}
        {this.props.item.strength ? <p className="itemProperty">Siła: +{this.props.item.strength}</p> : null}
        {this.props.item.agility ? <p className="itemProperty">Zręczność: +{this.props.item.agility}</p> : null}
        {this.props.item.power ? <p className="itemProperty">Moc: +{this.props.item.power}</p> : null}
        {this.props.item.knowledge ? <p className="itemProperty">Wiedza: +{this.props.item.knowledge}</p> : null}
        {this.props.item.hp ? <p className="itemProperty">Punkty życia: +{this.props.item.hp}</p> : null}
        {this.props.item.endurance ? <p className="itemProperty">Kondycja: +{this.props.item.endurance}</p> : null}
        {this.props.item.mana ? <p className="itemProperty">Mana: +{this.props.item.mana}</p> : null}
        {this.props.item.cutRes ? <p className="itemProperty">Odp. na sieczne: +{this.props.item.cutRes}</p> : null}
        {this.props.item.bluntRes ? <p className="itemProperty">Odp. na obuchowe: +{this.props.item.bluntRes}</p> : null}
        {this.props.item.pierceRes ? <p className="itemProperty">Odp. na kłute: +{this.props.item.pierceRes}</p> : null}
        {this.props.item.fireRes ? <p className="itemProperty">Odp. na ogień: +{this.props.item.fireRes}</p> : null}
        {this.props.item.energyRes ? <p className="itemProperty">Odp. na energię: +{this.props.item.energyRes}</p> : null}
        {this.props.item.frostRes ? <p className="itemProperty">Odp. na zimno: +{this.props.item.frostRes}</p> : null}
        {this.props.item.curseRes ? <p className="itemProperty">Odp. na uroki: +{this.props.item.curseRes}</p> : null}
        {otherProperties}
      </div>
    )
  }
}

export {ItemsList, ItemTooltip}
