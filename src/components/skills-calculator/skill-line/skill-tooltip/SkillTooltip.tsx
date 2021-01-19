//React
import React from "react";

//Types
import { Skill } from "../../../../data/models/skill.model";
import { TransitionStatus } from "react-transition-group/Transition";

export class SkillTooltip extends React.Component<PropTypes> {
  render() {
    const transitionStyles: { [id: string]: React.CSSProperties } = {
      entering: { maxHeight: "40em" },
      entered: { maxHeight: "40em" },
      exiting: { maxHeight: 0 },
      exited: { maxHeight: 0 },
    };
    return (
      <div className="skillTooltip" style={transitionStyles[this.props.state]}>
        <p>{this.props.skill.description}</p>
      </div>
    );
  }
}

interface PropTypes {
  skill: Skill;
  state: TransitionStatus;
}
