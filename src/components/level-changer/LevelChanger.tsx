//React
import React from "react";

//Components
import { LevelIncrementButton } from "./level-buttons/LevelIncrementButton.jsx";
import { LevelDecrementButton } from "./level-buttons/LevelDecrementButton.jsx";

export class LevelChanger extends React.Component<PropTypes> {
  render() {
    return (
      <div className="changeLevel">
        <div className="levelButtons">
          <LevelDecrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={-5}
          />{" "}
          <LevelDecrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={-1}
          />{" "}
        </div>{" "}
        <div className="level"> Poziom: {this.props.level} </div>{" "}
        <div className="levelButtons">
          <LevelIncrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={1}
          />{" "}
          <LevelIncrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={5}
          />{" "}
        </div>{" "}
      </div>
    )
  }
}

interface PropTypes {
  level: number
  changeLevel: (value: number) => void
}
