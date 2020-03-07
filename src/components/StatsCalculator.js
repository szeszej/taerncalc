import React from 'react';
import {Equipment} from "./Equipment.js"

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
      <div className="statsCalculator" style={this.props.active === "stats" ? null : {display: "none"}}>
      <div className="stats">

        <p className="points">
          Punkty statystyk: {this.state.statPts}{" "}
          <button className={"inlineButton"} onClick={() => this.reset()}>
            Reset
          </button>
        </p>

      <div className="linesAndEq">
      <Equipment />
      <div className="statLines">
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
        </div>
        </div>
      </div>
    );
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
        disabled={this.props.pointsLeft >= this.props.value ? false : true}
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

export  {StatsCalculator};
