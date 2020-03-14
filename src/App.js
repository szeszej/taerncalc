import React from 'react';
import {SkillsCalculator} from "./components/SkillsCalculator.js"
import {StatsCalculator} from "./components/StatsCalculator.js"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      active: "stats",
      level: this.props.level
    }
  }
  // componentDidMount() {
  //   this.setState({level: this.props.level})
  // }
  componentDidUpdate() {
    let charLvl = document.getElementById("charLvl");
    charLvl.value = this.state.level;
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
  render() {
    let inactive = {opacity: 0.45}
    let active = {borderBottom: "10px solid #bd996f"}
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
        <SkillsCalculator class={this.props.class} level={this.state.level} active={this.state.active} />
        <StatsCalculator  class={this.props.className} level={this.state.level} active={this.state.active} items={this.props.items}/>
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
