import React from "react";
import { Equipment } from "./Equipment.js";

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
        bluntRes: 0
      }
    };
  }
  componentDidMount() {
    if (this.props.initialStats) {
      this.setState({
        statPts: 1000,
        strength: 1000,
        agility: 1000,
        power: 1000,
        knowledge: 1000
      });
      setTimeout(() => {
        this.setState({
          statPts: this.props.initialStats.statPts,
          strength: this.props.initialStats.strength,
          agility: this.props.initialStats.agility,
          power: this.props.initialStats.power,
          knowledge: this.props.initialStats.knowledge,
          hp: this.props.initialStats.hp,
          endurance: this.props.initialStats.endurance,
          mana: this.props.initialStats.mana
        });
      }, 1);
    } else {
      this.setState({ statPts: this.calculateStatPoints(this.props.level) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.level !== this.props.level) {
      this.setState(() => {
        let updatedPoints = {};
        updatedPoints.statPts =
          this.state.statPts + (this.props.level - prevProps.level) * 4;
        return updatedPoints;
      });
    }
    let stateForExport = {
      statPts: this.state.statPts,
      strength: this.state.strength,
      agility: this.state.agility,
      power: this.state.power,
      knowledge: this.state.knowledge,
      hp: this.state.hp,
      endurance: this.state.endurance,
      mana: this.state.mana
    };
    this.props.getStateForExport(stateForExport, "stats");
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
      if (this.state[stat] + number * 10 < 200) {
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
    });
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
      <div
        className="statsCalculator"
        style={this.props.active === "stats" ? null : { display: "none" }}
      >
        <div className="stats">
          <p className="points">
            Punkty statystyk: {this.state.statPts}{" "}
            <button className={"inlineButton"} onClick={() => this.reset()}>
              Reset
            </button>
          </p>

          <div className="linesAndEq">
            <Equipment
              items={this.props.items}
              addStatsFromEquipment={this.addStatsFromEquipment}
              getStateForExport={this.props.getStateForExport}
              class={this.props.class}
              level={this.props.level}
              strength={this.state.strength}
              agility={this.state.agility}
              power={this.state.power}
              knowledge={this.state.knowledge}
              initialEquipment={this.props.initialEquipment}
            />
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
        <img
          src={"images/" + this.props.stat + ".svg"}
          alt={this.props.stat}
          className={this.props.stat}
        />
        <div className="statNameButtons">
          <div className="statName">
            {this.props.statName} {this.props.value} (
            {this.props.value + this.props.fromItems})
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
  calculateResistances(res) {
    let resPercentage = 0;
    let resTable = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[30.5],[31],[31.5],[32],[32.5],[33],[33.5],[34],[34.5],[35],[35.5],[36],[36.5],[37],[37.5],[38],[38.5],[39],[39.5],[40],[40.5],[41],[41.5],[42],[42.5],[43],[43.5],[44],[44.5],[45],[45.38],[45.75],[46.13],[46.5],[46.88],[47.25],[47.63],[48],[48.38],[48.75],[49.13],[49.5],[49.88],[50.25],[50.63],[51],[51.38],[51.75],[52.13],[52.5],[52.88],[53.25],[53.63],[54],[54.38],[54.75],[55.13],[55.5],[55.88],[56.25],[56.63],[57],[57.38],[57.75],[58.13],[58.5],[58.88],[59.25],[59.63],[60],[60.19],[60.38],[60.57],[60.76],[60.95],[61.14],[61.33],[61.52],[61.71],[61.9],[62.09],[62.28],[62.47],[62.66],[62.85],[63.04],[63.23],[63.42],[63.61],[63.8],[63.99],[64.18],[64.37],[64.56],[64.75],[64.94],[65.13],[65.32],[65.51],[65.7],[65.89],[66.08],[66.27],[66.46],[66.65],[66.84],[67.03],[67.22],[67.41],[67.6],[67.79],[67.98],[68.17],[68.36],[68.55],[68.74],[68.93],[69.12],[69.31],[70],[70.18],[70.36],[70.54],[70.72],[70.9],[71.08],[71.26],[71.44],[71.62],[71.8],[71.98],[72.16],[72.34],[72.52],[72.7],[72.88],[73.06],[73.24],[73.42],[73.6],[73.78],[73.96],[74.14],[74.32],[74.5],[74.68],[74.86],[75.04],[75.22],[75.4],[75.58],[75.76],[75.94],[76.12],[76.3],[76.48],[76.66],[76.84],[77.02],[77.2],[77.38],[77.56],[77.74],[77.92],[78.1],[78.28],[78.46],[78.64],[78.82],[79],[79.07],[79.13],[79.2],[79.27],[79.33],[79.4],[79.47],[79.53],[79.6],[79.67],[79.73],[79.8],[79.87],[79.93],[80],[80.04],[80.08],[80.12],[80.16],[80.2],[80.24],[80.28],[80.32],[80.36],[80.4],[80.44],[80.48],[80.52],[80.56],[80.6],[80.64],[80.68],[80.72],[80.76],[80.8],[80.84],[80.88],[80.92],[80.96],[81],[81.03],[81.07],[81.1],[81.13],[81.17],[81.2],[81.23],[81.27],[81.3],[81.33],[81.37],[81.4],[81.43],[81.47],[81.5],[81.53],[81.57],[81.6],[81.63],[81.67],[81.7],[81.73],[81.77],[81.8],[81.83],[81.87],[81.9],[81.93],[81.97],[82],[82.03],[82.07],[82.1],[82.13],[82.17],[82.2],[82.23],[82.27],[82.3],[82.33],[82.37],[82.4],[82.43],[82.47],[82.5],[82.53],[82.57],[82.6],[82.63],[82.67],[82.7],[82.73],[82.77],[82.8],[82.83],[82.87],[82.9],[82.93],[82.97],[83],[83.03],[83.07],[83.1],[83.13],[83.17],[83.2],[83.23],[83.27],[83.3],[83.33],[83.37],[83.4],[83.43],[83.47],[83.5],[83.53],[83.57],[83.6],[83.63],[83.67],[83.7],[83.73],[83.77],[83.8],[83.83],[83.87],[83.9],[83.93],[83.97],[84],[84.03],[84.07],[84.1],[84.13],[84.17],[84.2],[84.23],[84.27],[84.3],[84.33],[84.37],[84.4],[84.43],[84.47],[84.5],[84.53],[84.57],[84.6],[84.63],[84.67],[84.7],[84.73],[84.77],[84.8],[84.83],[84.87],[84.9],[84.93],[84.97],[85],[85.03],[85.07],[85.1],[85.13],[85.17],[85.2],[85.23],[85.27],[85.3],[85.33],[85.37],[85.4],[85.43],[85.47],[85.5],[85.53],[85.57],[85.6],[85.63],[85.67],[85.7],[85.73],[85.77],[85.8],[85.83],[85.87],[85.9],[85.93],[85.97],[86],[86.03],[86.07],[86.1],[86.13],[86.17],[86.2],[86.23],[86.27],[86.3],[86.33],[86.37],[86.4],[86.43],[86.47],[86.5],[86.53],[86.57],[86.6],[86.63],[86.67],[86.7],[86.73],[86.77],[86.8],[86.83],[86.87],[86.9],[86.93],[86.97],[87],[87.03],[87.07],[87.1],[87.13],[87.17],[87.2],[87.23],[87.27],[87.3],[87.33],[87.37],[87.4],[87.43],[87.47],[87.5],[87.53],[87.57],[87.6],[87.63],[87.67],[87.7],[87.73],[87.77],[87.8],[87.83],[87.87],[87.9],[87.93],[87.97],[88],[88.04],[88.08],[88.12],[88.16],[88.2],[88.24],[88.28],[88.32],[88.36],[88.4],[88.44],[88.48],[88.52],[88.56],[88.6],[88.64],[88.68],[88.72],[88.76],[88.8],[88.84],[88.88],[88.92],[88.96],[89],[89.04],[89.08],[89.12],[89.16],[89.2],[89.24],[89.28],[89.32],[89.36],[89.4],[89.44],[89.48],[89.52],[89.56],[89.6],[89.64],[89.68],[89.72],[89.76],[89.8],[89.84],[89.88],[89.92],[89.96],[90],[90.02],[90.04],[90.06],[90.08],[90.1],[90.12],[90.14],[90.16],[90.18],[90.2],[90.22],[90.24],[90.26],[90.28],[90.3],[90.32],[90.34],[90.36],[90.38],[90.4],[90.42],[90.44],[90.46],[90.48],[90.5],[90.52],[90.54],[90.56],[90.58],[90.6],[90.62],[90.64],[90.66],[90.68],[90.7],[90.72],[90.74],[90.76],[90.78],[90.8],[90.82],[90.84],[90.86],[90.88],[90.9],[90.92],[90.94],[90.96],[90.98],[91],[91.02],[91.04],[91.06],[91.08],[91.1],[91.12],[91.14],[91.16],[91.18],[91.2],[91.22],[91.24],[91.26],[91.28],[91.3],[91.32],[91.34],[91.36],[91.38],[91.4],[91.42],[91.44],[91.46],[91.48],[91.5],[91.52],[91.54],[91.56],[91.58],[91.6],[91.62],[91.64],[91.66],[91.68],[91.7],[91.72],[91.74],[91.76],[91.78],[91.8],[91.82],[91.84],[91.86],[91.88],[91.9],[91.92],[91.94],[91.96],[91.98],[92],[92.02],[92.04],[92.06],[92.08],[92.1],[92.12],[92.14],[92.16],[92.18],[92.2],[92.22],[92.24],[92.26],[92.28],[92.3],[92.32],[92.34],[92.36],[92.38],[92.4],[92.42],[92.44],[92.46],[92.48],[92.5],[92.52],[92.54],[92.56],[92.58],[92.6],[92.62],[92.64],[92.66],[92.68],[92.7],[92.72],[92.74],[92.76],[92.78],[92.8],[92.82],[92.84],[92.86],[92.88],[92.9],[92.92],[92.94],[92.96],[92.98],[93],[93.02],[93.04],[93.06],[93.08],[93.1],[93.12],[93.14],[93.16],[93.18],[93.2],[93.22],[93.24],[93.26],[93.28],[93.3],[93.32],[93.34],[93.36],[93.38],[93.4],[93.42],[93.44],[93.46],[93.48],[93.5],[93.52],[93.54],[93.56],[93.58],[93.6],[93.62],[93.64],[93.66],[93.68],[93.7],[93.72],[93.74],[93.76],[93.78],[93.8],[93.82],[93.84],[93.86],[93.88],[93.9],[93.92],[93.94],[93.96],[93.98],[94],[94.02],[94.04],[94.06],[94.08],[94.1],[94.12],[94.14],[94.16],[94.18],[94.2],[94.22],[94.24],[94.26],[94.28],[94.3],[94.32],[94.34],[94.36],[94.38],[94.4],[94.42],[94.44],[94.46],[94.48],[94.5],[94.52],[94.54],[94.56],[94.58],[94.6],[94.62],[94.64],[94.66],[94.68],[94.7],[94.72],[94.74],[94.76],[94.78],[94.8],[94.82],[94.84],[94.86],[94.88],[94.9],[94.92],[94.94],[94.96],[94.98],[95],[95.02],[95.04],[95.06],[95.08],[95.1],[95.12],[95.14],[95.16],[95.18],[95.2],[95.22],[95.24],[95.26],[95.28],[95.3],[95.32],[95.34],[95.36],[95.38],[95.4],[95.42],[95.44],[95.46],[95.48],[95.5],[95.52],[95.54],[95.56],[95.58],[95.6],[95.62],[95.64],[95.66],[95.68],[95.7],[95.72],[95.74],[95.76],[95.78],[95.8],[95.82],[95.84],[95.86],[95.88],[95.9],[95.92],[95.94],[95.96],[95.98],[96],[96.02],[96.04],[96.06],[96.08],[96.1],[96.12],[96.14],[96.16],[96.18],[96.2],[96.22],[96.24],[96.26],[96.28],[96.3],[96.32],[96.34],[96.36],[96.38],[96.4],[96.42],[96.44],[96.46],[96.48],[96.5],[96.52],[96.54],[96.56],[96.58],[96.6],[96.62],[96.64],[96.66],[96.68],[96.7],[96.72],[96.74],[96.76],[96.78],[96.8],[96.82],[96.84],[96.86],[96.88],[96.9],[96.92],[96.94],[96.96],[96.98],[97],[97.02],[97.04],[97.06],[97.08],[97.1],[97.12],[97.14],[97.16],[97.18],[97.2],[97.22],[97.24],[97.26],[97.28],[97.3],[97.32],[97.34],[97.36],[97.38],[97.4],[97.42],[97.44],[97.46],[97.48],[97.5],[97.52],[97.54],[97.56],[97.58],[97.6],[97.62],[97.64],[97.66],[97.68],[97.7],[97.72],[97.74],[97.76],[97.78],[97.8],[97.82],[97.84],[97.86],[97.88],[97.9],[97.92],[97.94],[97.96],[97.98],[98],[98.02],[98.04],[98.06],[98.08],[98.1],[98.12],[98.14],[98.16],[98.18],[98.2],[98.22],[98.24],[98.26],[98.28],[98.3],[98.32],[98.34],[98.36],[98.38],[98.4],[98.42],[98.44],[98.46],[98.48],[98.5],[98.52],[98.54],[98.56],[98.58],[98.6],[98.62],[98.64],[98.66],[98.68],[98.7],[98.72],[98.74],[98.76],[98.78],[98.8],[98.82],[98.84],[98.86],[98.88],[98.9],[98.92],[98.94],[98.96],[98.98],[99],[99.02],[99.04],[99.06],[99.08],[99.1],[99.12],[99.14],[99.16],[99.18],[99.2],[99.22],[99.24],[99.26],[99.28],[99.3],[99.32],[99.34],[99.36],[99.38],[99.4],[99.42],[99.44],[99.46],[99.48],[99.5],[99.52],[99.54],[99.56],[99.58],[99.6],[99.62],[99.64],[99.66],[99.68],[99.7],[99.72],[99.74],[99.76],[99.78],[99.8],[99.82],[99.84],[99.86],[99.88],[99.9],[99.92],[99.94],[99.96],[99.98],[100]];
    if (res <= 1000) {
      resPercentage = resTable[res][0];
    } else {
      resPercentage = 100;
    }
    return resPercentage;
  }
  render() {
    return (
      <div className={"statLine"}>
        <img
          src={"images/" + this.props.stat + ".svg"}
          alt={this.props.stat}
          className={this.props.stat}
        />
        <div className="statNameButtons">
          <div className="statName">
            {this.props.statName} {this.props.value} (
            {this.calculateResistances(this.props.value)}%)
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
      if (
        this.props.statValue === 10 ||
        this.props.statValue + this.props.value < 10
      ) {
        return <button disabled={true}>-{-this.props.value}</button>;
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
      if (
        this.props.statValue === 200 ||
        this.props.statValue + this.props.value * 10 < 200
      ) {
        return <button disabled={true}>-{-this.props.value * 10}</button>;
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

export { StatsCalculator };
