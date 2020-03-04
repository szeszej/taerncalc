import React from 'react';

class StatsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.spendStatPoints = this.spendStatPoints.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      statPts: this.calculateStatPoints(this.props.level),
      strength: 10,
      agility: 10,
      power: 10,
      knowledge: 10,
      hp: 200,
      endurance: 200,
      mana: 200
    };
  }
  componentDidMount() {
    let initState = this.state;
    this.setState({ initState: initState });
  }
  calculateStatPoints(level) {
    return level * 4 + 1;
  }
  spendStatPoints(stat, number) {
    if (["strength", "agility", "power", "knowledge"].includes(stat)) {
      if (this.state.statPts - number < 0 || this.state[stat] + number < 10) {
      } else {
        this.setState(prevState => {
          return {
            statPts: (prevState.statPts -= number),
            [stat]: (prevState[stat] += number)
          };
        });
      }
    } else {
      if (
        this.state.statPts - number < 0 ||
        this.state[stat] + number * 10 < 200
      ) {
      } else {
        this.setState(prevState => {
          return {
            statPts: (prevState.statPts -= number),
            [stat]: (prevState[stat] += number * 10)
          };
        });
      }
    }
  }
  reset() {
    this.setState({
      statPts: this.state.initState.statPts,
      agility: this.state.initState.agility,
      strength: this.state.initState.strength,
      power: this.state.initState.power,
      knowledge: this.state.initState.knowledge,
      hp: this.state.initState.hp,
      endurance: this.state.initState.endurance,
      mana: this.state.initState.mana
    });
  }
  render() {
    return (
      <div className="statsCalculator">
        <p className="points">
          Punkty statystyk: {this.state.statPts}{" "}
          <button className={"inlineButton"} onClick={() => this.reset()}>
            Reset
          </button>
        </p>
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="strength"
          statName={"Siła"}
          value={this.state.strength}
          pointsLeft={this.state.statPts}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="agility"
          statName={"Zręczność"}
          value={this.state.agility}
          pointsLeft={this.state.statPts}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="knowledge"
          statName={"Wiedza"}
          value={this.state.knowledge}
          pointsLeft={this.state.statPts}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="power"
          statName={"Moc"}
          value={this.state.power}
          pointsLeft={this.state.statPts}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="hp"
          statName={"Punkty życia"}
          value={this.state.hp}
          pointsLeft={this.state.statPts}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="endurance"
          statName={"Kondycja"}
          value={this.state.endurance}
          pointsLeft={this.state.statPts}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="mana"
          statName={"Mana"}
          value={this.state.mana}
          pointsLeft={this.state.statPts}
        />
      </div>
    );
  }
}

class StatIncrementButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (
      ["strength", "agility", "power", "knowledge"].includes(this.props.stat)
    ) {
      return (
        <button
          disabled={this.props.pointsLeft >= this.props.value ? false : true}
          onClick={() => {
            this.props.spendStatPoints(this.props.stat, this.props.value);
          }}
        >
          +{this.props.value}
        </button>
      );
    } else {
      return (
        <button
        disabled={this.props.pointsLeft >= this.props.value * 10 ? false : true}
          onClick={() => {
            this.props.spendStatPoints(this.props.stat, this.props.value);
          }}
        >
          +{this.props.value * 10}
        </button>
      );
    }
  }
}

class StatDecrementButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (
      ["strength", "agility", "power", "knowledge"].includes(this.props.stat)
    ) {
      if (this.props.statValue === 10 || (this.props.statValue + this.props.value < 10)) {
        return (
          <button disabled={true}>
            -{-this.props.value}
          </button>
        );
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
      if (this.props.statValue === 200 || (this.props.statValue + this.props.value * 10 < 200)) {
        return (
          <button disabled={true}>
            -{-this.props.value * 10}
          </button>
        );
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

class StatLine extends React.Component {
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
      <div className="statLine">
      <img src={"images/" + this.props.stat + ".png"} alt={this.props.stat} />
      <div className="statNameButtons">
        <div className="statName">
         {this.props.statName} {this.props.value}
        </div>
        <div className="statButtons">
          <StatDecrementButton
            spendStatPoints={this.props.spendStatPoints}
            stat={this.props.stat}
            statValue={this.props.value}
            value={-5}
          />
          <StatDecrementButton
            spendStatPoints={this.props.spendStatPoints}
            stat={this.props.stat}
            statValue={this.props.value}
            value={-1}
          />
          <StatIncrementButton
            spendStatPoints={this.props.spendStatPoints}
            stat={this.props.stat}
            statValue={this.props.value}
            value={1}
            pointsLeft={this.props.pointsLeft}
          />
          <StatIncrementButton
            spendStatPoints={this.props.spendStatPoints}
            stat={this.props.stat}
            statValue={this.props.value}
            value={5}
            pointsLeft={this.props.pointsLeft}
          />
        </div>
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="calculators">
                <SkillsCalculator class={this.props.class} level={this.props.level} />
        <StatsCalculator level={this.props.level} />
      </div>
    );
  }
}

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

export default Calculator;
