//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Components
import { Equipment } from "./equipment/Equipment.jsx";
import { StatLine } from "./stat-line/StatLine.jsx";
import { ResLine } from "./resist-line/ResLine.jsx";

//Actions
import { changeStat } from "../../store/stats-reducer/stats-reducer";
import { resetStatPoints } from "../../store/stats-reducer/stats-reducer";

class ConnectedStatsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.spendStatPoints = this.spendStatPoints.bind(this);
    this.reset = this.reset.bind(this);
    this.addStatsFromEquipment = this.addStatsFromEquipment.bind(this);
    this.state = {
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
  spendStatPoints(stat, number) {
    this.props.changeStat(stat, number)
  }
  addStatsFromEquipment(stats) {
    this.setState({
      statsFromItems: stats,
    });
  }
  reset() {
    this.props.resetStatPoints()
  }
  render() {
    return (
      <div
        className="statsCalculator"
        style={this.props.active === "stats" ? null : { display: "none" }}
      >
        <div className="stats">
          <p className="points">
            Punkty statystyk: {this.props.statPts}{" "}
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
              strength={this.props.strength}
              agility={this.props.agility}
              power={this.props.power}
              knowledge={this.props.knowledge}
              initialEquipment={this.props.initialEquipment}
            />
            <div className="statsAndRes">
              <div className="statLines">
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="strength"
                  statName={"Siła"}
                  value={this.props.strength}
                  pointsLeft={this.props.statPts}
                  fromItems={this.state.statsFromItems.strength}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="agility"
                  statName={"Zręczność"}
                  value={this.props.agility}
                  pointsLeft={this.props.statPts}
                  fromItems={this.state.statsFromItems.agility}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="knowledge"
                  statName={"Wiedza"}
                  value={this.props.knowledge}
                  pointsLeft={this.props.statPts}
                  fromItems={this.state.statsFromItems.knowledge}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="power"
                  statName={"Moc"}
                  value={this.props.power}
                  pointsLeft={this.props.statPts}
                  fromItems={this.state.statsFromItems.power}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="hp"
                  statName={"Punkty życia"}
                  value={this.props.hp}
                  pointsLeft={this.props.statPts}
                  fromItems={this.state.statsFromItems.hp}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="endurance"
                  statName={"Kondycja"}
                  value={this.props.endurance}
                  pointsLeft={this.props.statPts}
                  fromItems={this.state.statsFromItems.endurance}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="mana"
                  statName={"Mana"}
                  value={this.props.mana}
                  pointsLeft={this.props.statPts}
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

const mapStateToProps = state => {
  return {
    statPts: state.stats.statPts,
    strength: state.stats.strength,
    agility: state.stats.agility,
    power: state.stats.power,
    knowledge: state.stats.knowledge,
    hp: state.stats.hp,
    endurance: state.stats.endurance,
    mana: state.stats.mana
   };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStat: (stat, value) => dispatch(changeStat({stat: stat, value: value})),
    resetStatPoints: () => dispatch(resetStatPoints())
  }
}


export const StatsCalculator = connect(mapStateToProps, mapDispatchToProps)(ConnectedStatsCalculator);
