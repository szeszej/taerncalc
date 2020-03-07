import React from 'react';
import {SkillsCalculator} from "./components/SkillsCalculator.js"
import {StatsCalculator} from "./components/StatsCalculator.js"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "stats"
    }
  }
  changeTabs(tab) {
    this.setState({active: tab})
  }
  render() {
    let inactive = {opacity: 0.45}
    let active = {borderBottom: "10px solid #bd996f"}
    return (
      <div className="calculators">
      <div className="tabs">
        <button style={this.state.active === "stats" ? active : inactive} onClick={() => this.changeTabs("stats")}>Statystyki i przedmioty</button>
        <button style={this.state.active === "skills" ? active : inactive} onClick={() => this.changeTabs("skills")}>Umiejętności</button>
      </div>
        <SkillsCalculator class={this.props.class} level={this.props.level} active={this.state.active} />
        <StatsCalculator level={this.props.level} active={this.state.active} />
      </div>
    );
  }
}

export  {Calculator};
