import React from 'react';
import {Equipment} from "./Equipment.js"

class StatsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.spendStatPoints = this.spendStatPoints.bind(this);
    this.reset = this.reset.bind(this);
    this.addStatsFromEquipment = this.addStatsFromEquipment.bind(this);
    this.state = {
      statPts: 0,
      strength: 10,
      agility: 10,
      power: 10,
      knowledge: 10,
      hp: 200,
      endurance: 200,
      mana: 200,
      statsFromItems: {
        strength: 0,
        agility: 0,
        power: 0,
        knowledge: 0,
        hp: 0,
        endurance: 0,
        mana: 0,
        damage: 0,
        fireRes: 0,
        frostRes: 0,
        energyRes: 0,
        curseRes: 0,
        pierceRes: 0,
        cutRes: 0,
        bluntRes: 0}
    };
  }
  componentDidMount() {
    this.setState({ statPts: this.calculateStatPoints(this.props.level) });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.level !== this.props.level) {
      this.setState(() => {
        let updatedPoints = {};
        updatedPoints.statPts = this.state.statPts + ((this.props.level - prevProps.level) * 4);
        return updatedPoints;
      })
    }
  }
  calculateStatPoints(level) {
    return level * 4 + 1;
  }
  spendStatPoints(stat, number) {
    if (["strength", "agility", "power", "knowledge"].includes(stat)) {
      if (this.state[stat] + number < 10) {
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
  addStatsFromEquipment(stats) {
    this.setState({
      statsFromItems: stats
    })
  }
  reset() {
    this.setState({
      statPts: this.calculateStatPoints(this.props.level),
      agility: 10,
      strength: 10,
      power: 10,
      knowledge: 10,
      hp: 200,
      endurance: 200,
      mana: 200
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
      <Equipment items={this.props.items} addStatsFromEquipment={this.addStatsFromEquipment} class={this.props.class} level={this.props.level} strength={this.state.strength + this.state.statsFromItems.strength} agility={this.state.agility + this.state.statsFromItems.agility} power={this.state.power+this.state.statsFromItems.power} knowledge={this.state.knowledge + this.state.statsFromItems.knowledge}/>
      <div className="statsAndRes">
      <div className="statLines">
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="strength"
          statName={"Siła"}
          value={this.state.strength}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.strength}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="agility"
          statName={"Zręczność"}
          value={this.state.agility}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.agility}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="knowledge"
          statName={"Wiedza"}
          value={this.state.knowledge}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.knowledge}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="power"
          statName={"Moc"}
          value={this.state.power}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.power}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="hp"
          statName={"Punkty życia"}
          value={this.state.hp}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.hp}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="endurance"
          statName={"Kondycja"}
          value={this.state.endurance}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.endurance}
        />
        <StatLine
          spendStatPoints={this.spendStatPoints}
          stat="mana"
          statName={"Mana"}
          value={this.state.mana}
          pointsLeft={this.state.statPts}
          fromItems={this.state.statsFromItems.mana}
        />
        </div>
        <div className="resLines">
        <ResLine
          stat={"cutRes"}
          statName={"Odp. na sieczne"}
          value={this.state.statsFromItems.cutRes}
        />
        <ResLine
          stat={"bluntRes"}
          statName={"Odp. na obuchowe"}
          value={this.state.statsFromItems.bluntRes}
        />
        <ResLine
          stat={"pierceRes"}
          statName={"Odp. na kłute"}
          value={this.state.statsFromItems.pierceRes}
        />
        <ResLine
          stat={"fireRes"}
          statName={"Odp. na ogień"}
          value={this.state.statsFromItems.fireRes}
        />
        <ResLine
          stat={"energyRes"}
          statName={"Odp. na energię"}
          value={this.state.statsFromItems.energyRes}
        />
        <ResLine
          stat={"frostRes"}
          statName={"Odp. na zimno"}
          value={this.state.statsFromItems.frostRes}
        />
        <ResLine
          stat={"curseRes"}
          statName={"Odp. na uroki"}
          value={this.state.statsFromItems.curseRes}
        />
        </div>
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
      <div className={"statLine"}>
      <img src={"images/" + this.props.stat + ".svg"} alt={this.props.stat} className={this.props.stat} />
      <div className="statNameButtons">
        <div className="statName">
         {this.props.statName} {this.props.value} ({this.props.value + this.props.fromItems})
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

class ResLine extends React.Component {
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
  calculateResistances (res) {
    let resPercentage = 0;
    if (res <= 31) {
      resPercentage = res;
    } else if (res >= 200) {
      resPercentage = 80
    } else {
      resPercentage = Math.floor((342.227 * Math.pow(res, 0.0583441879)) - 387.92);
    }
    return resPercentage;
  }
  render() {
    return (
      <div className={"statLine"}>
        <img src={"images/" + this.props.stat + ".svg"} alt={this.props.stat} className={this.props.stat} />
        <div className="statNameButtons">
          <div className="statName">
            {this.props.statName} {this.props.value} ({this.calculateResistances(this.props.value)}%)
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
