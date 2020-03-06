import React from 'react';

class SkillsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.spendSkillPoints = this.spendSkillPoints.bind(this);
    this.checkIfSkillCanIncrease = this.checkIfSkillCanIncrease.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      skillPts: this.calculateSkillPoints(this.props.level),
      skillSet: this.props.class
    };
  }
  componentDidMount() {
    let initState = this.state;
    this.setState({ initState: initState });
  }

  reset() {
    this.setState(() => {
      let zeroSkill = this.state.initState.skillSet;
      for (let property in zeroSkill) {
        zeroSkill[property].level = zeroSkill[property].minLvl;
        zeroSkill[property].requiredCharLevel = zeroSkill[property].initReqLvl;
      }
      return {
        skillPts: this.state.initState.skillPts,
        skillSet: zeroSkill
      };
    });
  }
  calculateSkillPoints(level) {
    return (level - 1) * 2;
  }
  spendSkillPoints(prevLvl, newLvl, number) {
    let skillPointsNeeded = [0, 1, 3, 6, 10, 15, 21, 28];
    if (
      newLvl < this.state.skillSet["skill" + number].minLvl ||
      skillPointsNeeded[newLvl] - skillPointsNeeded[prevLvl] >
        this.state.skillPts ||
      newLvl > this.state.skillSet["skill" + number].maxLvl ||
      (this.state.skillSet["skill" + number].requiredCharLevel >
        this.props.level &&
        newLvl > prevLvl)
    ) {
    } else {
      this.setState(prevState => {
        let skillSet = prevState.skillSet;
        skillSet["skill" + number].level = newLvl;
        if (newLvl > prevLvl) {
          skillSet["skill" + number].requiredCharLevel +=
            skillSet["skill" + number].requiredCharLevelInc;
        } else {
          skillSet["skill" + number].requiredCharLevel -=
            skillSet["skill" + number].requiredCharLevelInc;
        }
        return {
          skillPts: (prevState.skillPts -=
            skillPointsNeeded[newLvl] - skillPointsNeeded[prevLvl]),
          skillSet
        };
      });
    }
  }
  checkIfSkillCanIncrease (prevLvl, newLvl, number) {
    let skillPointsNeeded = [0, 1, 3, 6, 10, 15, 21, 28];
    if (skillPointsNeeded[newLvl] - skillPointsNeeded[prevLvl] >
        this.state.skillPts) {
      return false
    } else {
      return true
    }
  }
  render() {
    return (
      <div className="skillCalculator">
        <div className="statPts">
          <p>
            Punkty umiejętności: {this.state.skillPts}{" "}
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
              skill={this.state.skillSet.skill9}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={9}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill10}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={10}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill11}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={11}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill12}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={12}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill13}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={13}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill14}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={14}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill15}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={15}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill16}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={16}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill17}
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
              skill={this.state.skillSet.skill1}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={1}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill2}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={2}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill3}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={3}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill4}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={4}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill5}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={5}
            />
                        <SkillLine
                          level={this.props.level}
              skill={this.state.skillSet.skill7}
                          checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={7}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill6}
              checkIfSkillCanIncrease={this.checkIfSkillCanIncrease}
              spendSkillPoints={this.spendSkillPoints}
              number={6}
            />
            <SkillLine
              level={this.props.level}
              skill={this.state.skillSet.skill8}
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

class SkillLine extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props) {
      return false;
    } else {
      return true;
    }
  }
  render() {
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
        <div className="reqLvl">
          <div className="reqLvlText">
            <p>Wym. poziom postaci:</p>
          </div>
          <div className="reqLvlNumber">
            <p>
              {this.props.skill.level === this.props.skill.maxLvl
                ? "-"
                : this.props.skill.requiredCharLevel}
            </p>
          </div>
        </div>
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
            {((this.props.skill.level === this.props.skill.maxLvl) || (this.props.skill.requiredCharLevel > this.props.level) || (this.props.checkIfSkillCanIncrease(this.props.skill.level, this.props.skill.level + 1, 1) === false)) ? (
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

class SkillIncrementButton extends React.Component {
  constructor(props) {
    super(props);
  }
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
        +1
      </button>
    );
  }
}

class SkillDecrementButton extends React.Component {
  constructor(props) {
    super(props);
  }
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

export  {SkillsCalculator};
