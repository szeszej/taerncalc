import React from 'react';
import {SkillsCalculator} from "./components/SkillsCalculator.js"
import {StatsCalculator} from "./components/StatsCalculator.js"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="calculators">
        <SkillsCalculator class={this.props.class} level={this.props.level} />
        <StatsCalculator level={this.props.level} />
      </div>
    );
  }
}

export  {Calculator};
