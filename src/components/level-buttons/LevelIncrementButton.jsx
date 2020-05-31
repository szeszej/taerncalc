import React from "react";

export class LevelIncrementButton extends React.Component {
  render() {
    return (
      <button
        disabled={this.props.level + this.props.value > 140 ? true : false}
        onClick={() => {
          this.props.changeLevel(this.props.value);
        }}
      >
        +{this.props.value}{" "}
      </button>
    );
  }
}
