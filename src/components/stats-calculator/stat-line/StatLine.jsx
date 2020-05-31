import React from "react";

import { StatIncrementButton } from "./stat-buttons/StatIncrementButton.jsx";
import { StatDecrementButton } from "./stat-buttons/StatDecrementButton.jsx";

export class StatLine extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <div className={"statLine"}>
        <img
          src={"images/" + this.props.stat + ".svg"}
          alt={this.props.stat}
          className={this.props.stat}
        />
        <div className="statNameButtons">
          <div className="statName">
            {this.props.statName} {this.props.value} (
            {this.props.value + this.props.fromItems})
          </div>
          <div className="statButtons">
            <StatDecrementButton
              spendStatPoints={this.props.spendStatPoints}
              stat={this.props.stat}
              statValue={this.props.value}
              value={-5}
            />
            <StatDecrementButton
              spendStatPoints={this.props.spendStatPoints}
              stat={this.props.stat}
              statValue={this.props.value}
              value={-1}
            />
            <StatIncrementButton
              spendStatPoints={this.props.spendStatPoints}
              stat={this.props.stat}
              statValue={this.props.value}
              value={1}
              pointsLeft={this.props.pointsLeft}
            />
            <StatIncrementButton
              spendStatPoints={this.props.spendStatPoints}
              stat={this.props.stat}
              statValue={this.props.value}
              value={5}
              pointsLeft={this.props.pointsLeft}
            />
          </div>
        </div>
      </div>
    );
  }
}
