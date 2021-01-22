//React
import React from "react";

//Components
import { LevelIncrementButton } from "./level-buttons/LevelIncrementButton";
import { LevelDecrementButton } from "./level-buttons/LevelDecrementButton";

export class LevelChanger extends React.Component<PropTypes> {
  render() {
    return (
      <div className="changeLevel">
        <div className="levelButtons">
          <LevelDecrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={-10}
          />
          <LevelDecrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={-1}
          />
        </div>
        <div className="level"> {this.props.t("Poziom")}: {this.props.level} </div>
        <div className="levelButtons">
          <LevelIncrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={1}
          />{" "}
          <LevelIncrementButton
            changeLevel={this.props.changeLevel}
            level={this.props.level}
            value={10}
          />
        </div>
      </div>
    )
  }
}

interface PropTypes {
  level: number
  changeLevel: (value: number) => void
  t(string: string): string;
}
