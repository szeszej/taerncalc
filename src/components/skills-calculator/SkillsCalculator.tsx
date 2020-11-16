//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";
import { Dispatch } from "redux";

//Components
import { SkillLine } from "./skill-line/SkillLine";

//Actions
import { changeSkill } from "../../store/skills-reducer/skills-reducer";
import { resetSkillPoints } from "../../store/skills-reducer/skills-reducer";

export class ConnectedSkillsCalculator extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.spendSkillPoints = this.spendSkillPoints.bind(this);
    this.checkIfSkillCanIncrease = this.checkIfSkillCanIncrease.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.props.resetSkillPoints();
  }
  spendSkillPoints(prevLvl: number, newLvl: number, skill: number) {
    this.props.changeSkill(prevLvl, newLvl, skill);
  }
  checkIfSkillCanIncrease(newLvl: number) {
    if (newLvl > this.props.skillPts) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    let negativePoints = {
      color: "red",
    };
    let basicSkills = [1, 2, 3, 4, 5, 7, 6, 8];
    let classSkills = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    let basicSkillsComponents = basicSkills.map((x) => (
      <SkillLine
      key={x}
        level={this.props.level}
        skill={this.props.skillSet["skill" + x]}
        checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
        spendSkillPoints={this.spendSkillPoints}
        number={x}
      />
    ));
    let classSkillsComponents = classSkills.map((x) => (
      <SkillLine
        key={x}
        level={this.props.level}
        skill={this.props.skillSet["skill" + x]}
        checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
        spendSkillPoints={this.spendSkillPoints}
        number={x}
      />
    ));
    return (
      <div
        className="skillCalculator"
        style={this.props.active === "skills" ? undefined : { display: "none" }}
      >
        <div className="statPts">
          <p>
            <span style={this.props.skillPts < 0 ? negativePoints : undefined}>
              Punkty umiejętności: {this.props.skillPts}
            </span>{" "}
            <button className={"inlineButton"} onClick={() => this.reset()}>
              Reset
            </button>
          </p>
        </div>
        <div className="skills">
          <div className="classSkills">
            <div>
              <p>Umiejętności klasowe</p>
            </div>
            {classSkillsComponents}
          </div>
          <div className="classSkills">
            <div>
              <p>Umiejętności podstawowe</p>
            </div>
            {basicSkillsComponents}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    skillPts: state.skills.skillPts,
    skillSet: state.skills.skillSet,
    level: state.character.level,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeSkill: (prevLvl: number, newLvl: number, skill: number) =>
      dispatch(
        changeSkill({
          prevLvl: prevLvl,
          newLvl: newLvl,
          skill: "skill" + skill,
        })
      ),
    resetSkillPoints: () => dispatch(resetSkillPoints()),
  };
};

type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  active: string;
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export const SkillsCalculator = connector(ConnectedSkillsCalculator);
