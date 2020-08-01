import React from "react";

import { SkillIncrementButton } from "./skill-buttons/SkillIncrementButton.jsx";
import { SkillDecrementButton } from "./skill-buttons/SkillDecrementButton.jsx";

export class SkillLine extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    let notMeetingRequirements = {
      color: "red",
    };
    return (
      <div className="skillLine">
        <div className="image">
          <img src={this.props.skill.image} alt={this.props.skill.name} />
        </div>
        <div className="skillName">
          <p>{this.props.skill.name}</p>
        </div>
        <div className="skillValue">
          <p>{this.props.skill.level}</p>
        </div>
        {this.props.skill.level === this.props.skill.maxLvl ? (
          <div className="reqLvl">
            <p>Maks. poziom osiągnięty</p>
          </div>
        ) : (
          <div
            className="reqLvl"
            style={
              this.props.skill.requiredCharLevel > this.props.level
                ? notMeetingRequirements
                : null
            }
          >
            <div className="reqLvlText">
              <p>Poz. wym. do awansu:</p>
            </div>
            <div className="reqLvlNumber">
              <p>{this.props.skill.requiredCharLevel}</p>
            </div>
          </div>
        )}
        <div className="skillButtons">
          <div className="minusButton">
            {this.props.skill.level === this.props.skill.minLvl ? (
              <SkillDecrementButton
                spendSkillPoints={this.props.spendSkillPoints}
                skillLevel={this.props.skill.level}
                value={-1}
                number={this.props.number}
                active={"inactive"}
              />
            ) : (
              <SkillDecrementButton
                spendSkillPoints={this.props.spendSkillPoints}
                skillLevel={this.props.skill.level}
                value={-1}
                number={this.props.number}
                active={"active"}
              />
            )}
          </div>
          <div className="plusButton">
            {this.props.skill.level === this.props.skill.maxLvl ||
            this.props.skill.requiredCharLevel > this.props.level ||
            this.props.checkIfSkillCanIncrease(
              this.props.skill.level,
              this.props.skill.level + 1
            ) === false ? (
              <SkillIncrementButton
                spendSkillPoints={this.props.spendSkillPoints}
                skillLevel={this.props.skill.level}
                value={1}
                number={this.props.number}
                active={"inactive"}
              />
            ) : (
              <SkillIncrementButton
                spendSkillPoints={this.props.spendSkillPoints}
                skillLevel={this.props.skill.level}
                value={1}
                number={this.props.number}
                active={"active"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
