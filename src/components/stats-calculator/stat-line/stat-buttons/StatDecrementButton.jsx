import React from "react";

export class StatDecrementButton extends React.Component {
  render() {
    if (
      ["strength", "agility", "power", "knowledge"].includes(this.props.stat)
    ) {
      if (
        this.props.statValue === 10 ||
        this.props.statValue + this.props.value < 10
      ) {
        return <button disabled={true}>-{-this.props.value}</button>;
      } else {
        return (
          <button
            onClick={() => {
              this.props.spendStatPoints(this.props.stat, this.props.value);
            }}
          >
            -{-this.props.value}
          </button>
        );
      }
    } else {
      if (
        this.props.statValue === 200 ||
        this.props.statValue + this.props.value * 10 < 200
      ) {
        return <button disabled={true}>-{-this.props.value * 10}</button>;
      } else {
        return (
          <button
            onClick={() => {
              this.props.spendStatPoints(this.props.stat, this.props.value);
            }}
          >
            -{-this.props.value * 10}
          </button>
        );
      }
    }
  }
}
