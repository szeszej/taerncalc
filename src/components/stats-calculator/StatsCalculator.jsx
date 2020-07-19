import React from "react";

import { Equipment } from "./equipment/Equipment.jsx";
import { StatLine } from "./stat-line/StatLine.jsx";
import { ResLine } from "./resist-line/ResLine.jsx";

export class StatsCalculator extends React.Component {
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
        bluntRes: 0,
      },
    };
  }
  componentDidMount() {
    if (this.props.initialStats) {
      this.setState({
        statPts: 1000,
        strength: 1000,
        agility: 1000,
        power: 1000,
        knowledge: 1000,
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
          mana: this.props.initialStats.mana,
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
      mana: this.state.mana,
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
        this.setState((prevState) => {
          return {
            statPts: (prevState.statPts -= number),
            [stat]: (prevState[stat] += number),
          };
        });
      }
    } else {
      if (this.state[stat] + number * 10 < 200) {
      } else {
        this.setState((prevState) => {
          return {
            statPts: (prevState.statPts -= number),
            [stat]: (prevState[stat] += number * 10),
          };
        });
      }
    }
  }
  addStatsFromEquipment(stats) {
    this.setState({
      statsFromItems: stats,
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
      mana: 200,
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
