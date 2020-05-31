import React from "react";

export class SkillDecrementButton extends React.Component {
  render() {
    return (
      <button
        className={"inlineButton " + this.props.active}
        disabled={this.props.active === "active" ? false : true}
        onClick={() => {
          this.props.spendSkillPoints(
            this.props.skillLevel,
            this.props.skillLevel + this.props.value,
            this.props.number
          );
        }}
      >
        -1
      </button>
    );
  }
}
