import React from 'react';
import {SkillsCalculator} from "./components/SkillsCalculator.js"
import {StatsCalculator} from "./components/StatsCalculator.js"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.getStateForExport = this.getStateForExport.bind(this);
    this.state = {
      active: "stats",
      level: this.props.level,
      stateForExport: {
        stats: {},
        equipment: {},
        skills: {}
      }
    }
  }
  getStateForExport(state, type) {
    if ((type === "stats" && !this.isEquivalent(state, this.state.stateForExport.stats)) || (type === "skills" && !this.isEquivalent(state, this.state.stateForExport.skills)) || (type === "equipment" && !this.isEquivalent(state, this.state.stateForExport.equipment))) {
      this.setState((prevState) => {
        let stateForExport = prevState.stateForExport;
        if (type === "stats") {
          stateForExport.stats = state;
        } else if (type === "equipment") {
          stateForExport.equipment = state;
        } else if (type === "skills") {
          stateForExport.skills = state;
        }
        return {
          stateForExport: stateForExport
        }
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let charLvl = document.getElementById("charLvl");
    charLvl.value = this.state.level;
  }
  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
          return false;
      }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
  changeTabs(tab) {
    this.setState({active: tab})
  }
  changeLevel(value) {
    this.setState((prevState) => {
      let level = {};
      level.level = prevState.level += value;
      return level
    })
  }
  createUrlForExport() {
    let propertiesForUrl = this.state.stateForExport;
    let arrayOfProperties = Object.entries(propertiesForUrl);
    arrayOfProperties[0] = Object.entries(arrayOfProperties[0][1]);
    arrayOfProperties[1] = Object.entries(arrayOfProperties[1][1]);
    if (arrayOfProperties[1][6]) {
      if (arrayOfProperties[1][6][1] !== null) {
        arrayOfProperties[1][6][1] = Object.entries(arrayOfProperties[1][6][1]);
        let filteredSpecialProperties = arrayOfProperties[1][6][1].filter(x => x[1] != false && x[1] !== null && x[0] != "type" && x[0] != "rarity");
        filteredSpecialProperties.forEach(x => x[0] = "special" + x[0]);
        arrayOfProperties[1][6] = filteredSpecialProperties;
        arrayOfProperties[1][6].map(x => arrayOfProperties[1].push(x));
        arrayOfProperties[1].splice(6, 1);
      }
    }
    arrayOfProperties[2] = Object.entries(arrayOfProperties[2][1]);
    let flatArrayOfProperties = arrayOfProperties.flat();
    flatArrayOfProperties.push(["level", this.state.level], ["className", this.props.className])
    let stringsForUrl = flatArrayOfProperties.map(x => x[0] + "=" + x[1]);
    let urlString = stringsForUrl.join("&")
    console.log(urlString);
  }
  render() {
    let inactive = {opacity: 0.45}
    let active = {borderBottom: "10px solid #bd996f"}
    this.createUrlForExport()
    return (
      <div className="calculators">
      <div className="changeLevel">
        <div className="levelButtons">
          <LevelDecrementButton
            changeLevel={this.changeLevel}
            level={this.state.level}
            value={-5}
          />
          <LevelDecrementButton
            changeLevel={this.changeLevel}
            level={this.state.level}
            value={-1}
            />
        </div>
        <div className="level">
          Poziom: {this.state.level}
        </div>
        <div className="levelButtons">
          <LevelIncrementButton
            changeLevel={this.changeLevel}
            level={this.state.level}
            value={1}
          />
          <LevelIncrementButton
            changeLevel={this.changeLevel}
            level={this.state.level}
            value={5}
            />
        </div>
      </div>
      <div className="tabs">
        <button style={this.state.active === "stats" ? active : inactive} onClick={() => this.changeTabs("stats")}>Statystyki i przedmioty</button>
        <button style={this.state.active === "skills" ? active : inactive} onClick={() => this.changeTabs("skills")}>Umiejętności</button>
      </div>
        <SkillsCalculator class={this.props.class} level={this.state.level} active={this.state.active} getStateForExport={this.getStateForExport} />
        <StatsCalculator  class={this.props.className} level={this.state.level} active={this.state.active} items={this.props.items} getStateForExport={this.getStateForExport} />
      </div>
    );
  }
}

class LevelIncrementButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        disabled={(this.props.level + this.props.value) > 140 ? true : false}
        onClick={() => {
          this.props.changeLevel(this.props.value);
        }}
      >
        +{this.props.value}
      </button>
    );
  }
}

class LevelDecrementButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        disabled={(this.props.level + this.props.value) < 1 ? true : false}
        onClick={() => {
          this.props.changeLevel(this.props.value);
        }}
      >
        {this.props.value}
      </button>
    );
  }
}

export  {Calculator};
