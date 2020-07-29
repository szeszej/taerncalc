//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Components
import { SkillLine } from "./skill-line/SkillLine.jsx"

//Actions
import { changeSkill } from "../../store/skills-reducer/skills-reducer";
import { resetSkillPoints } from "../../store/skills-reducer/skills-reducer";

export class ConnectedSkillsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.spendSkillPoints = this.spendSkillPoints.bind(this);
    this.checkIfSkillCanIncrease = this.checkIfSkillCanIncrease.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    if (this.props.initialSkills) {
      this.setState({
        skillPts: this.props.initialSkills.skillPts
      });
    }
  }
  componentDidUpdate(prevProps) {
    let stateForExport = {
      skillPts: this.props.skillPts
    };
    for (let i = 1; i < 18; i++) {
      stateForExport["skill" + i] = this.props.skillSet["skill" + i].level;
    }
    this.props.getStateForExport(stateForExport, "skills");
  }
  reset() {
    this.props.resetSkillPoints()
  }
  spendSkillPoints(prevLvl, newLvl, number) {
    this.props.changeSkill(prevLvl, newLvl, number)
  }
  checkIfSkillCanIncrease(prevLvl, newLvl, number) {
    let skillPointsNeeded = [0, 1, 3, 6, 10, 15, 21, 28];
    if (
      skillPointsNeeded[newLvl] - skillPointsNeeded[prevLvl] >
      this.props.skillPts
    ) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <div
        className="skillCalculator"
        style={this.props.active === "skills" ? null : { display: "none" }}
      >
        <div className="statPts">
          <p>
            Punkty umiejętności: {this.props.skillPts}{" "}
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
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill9}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={9}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill10}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={10}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill11}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={11}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill12}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={12}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill13}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={13}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill14}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={14}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill15}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={15}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill16}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={16}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill17}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={17}
            />
          </div>
          <div className="classSkills">
            <div>
              <p>Umiejętności podstawowe</p>
            </div>
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill1}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={1}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill2}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={2}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill3}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={3}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill4}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={4}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill5}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={5}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill7}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={7}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill6}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={6}
            />
            <SkillLine
              level={this.props.level}
              skill={this.props.skillSet.skill8}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={8}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    skillPts: state.skills.skillPts,
    skillSet: state.skills.skillSet,
    level: state.character.level
   };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSkill: (prevLvl, newLvl, skill) => dispatch(changeSkill({prevLvl: prevLvl, newLvl: newLvl, skill: "skill" + skill})),
    resetSkillPoints: () => dispatch(resetSkillPoints())
  }
}


export const SkillsCalculator = connect(mapStateToProps, mapDispatchToProps)(ConnectedSkillsCalculator);
