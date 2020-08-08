//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Components
import { Equipment } from "./equipment/Equipment.jsx";
import { StatLine } from "./stat-line/StatLine.jsx";
import { ResLine } from "./resist-line/ResLine.jsx";

//Data
import { itemSets } from "../../data/item-sets";

//Actions
import { changeStat } from "../../store/stats-reducer/stats-reducer";
import { resetStatPoints } from "../../store/stats-reducer/stats-reducer";

//Shared functionality
import { checkWhichSetsAreEquipped } from "../../shared/check-what-sets-are-equipped"

class ConnectedStatsCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.spendStatPoints = this.spendStatPoints.bind(this);
    this.reset = this.reset.bind(this);
  }
  spendStatPoints(stat, number) {
    this.props.changeStat(stat, number);
  }
  reset() {
    this.props.resetStatPoints();
  }
  render() {
    let negativePoints = {
      color: "red",
    };
    return (
      <div
        className="statsCalculator"
        style={this.props.active === "stats" ? null : { display: "none" }}
      >
        <div className="stats">
          <p className="points">
            <span style={this.props.statPts < 0 ? negativePoints : null}>Punkty statystyk: {this.props.statPts}</span>{" "}
            <button className={"inlineButton"} onClick={() => this.reset()}>
              Reset
            </button>
          </p>

          <div className="linesAndEq">
            <Equipment />
            <div className="statsAndRes">
              <div className="statLines">
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="strength"
                  statName={"Siła"}
                  value={this.props.strength}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.strength}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="agility"
                  statName={"Zręczność"}
                  value={this.props.agility}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.agility}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="knowledge"
                  statName={"Wiedza"}
                  value={this.props.knowledge}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.knowledge}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="power"
                  statName={"Moc"}
                  value={this.props.power}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.power}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="hp"
                  statName={"Punkty życia"}
                  value={this.props.hp}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.hp}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="endurance"
                  statName={"Kondycja"}
                  value={this.props.endurance}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.endurance}
                />
                <StatLine
                  spendStatPoints={this.spendStatPoints}
                  stat="mana"
                  statName={"Mana"}
                  value={this.props.mana}
                  pointsLeft={this.props.statPts}
                  fromItems={this.props.statsFromItems.mana}
                />
              </div>
              <div className="resLines">
                <ResLine
                  stat={"cutRes"}
                  statName={"Odp. na sieczne"}
                  value={this.props.statsFromItems.cutRes}
                />
                <ResLine
                  stat={"bluntRes"}
                  statName={"Odp. na obuchowe"}
                  value={this.props.statsFromItems.bluntRes}
                />
                <ResLine
                  stat={"pierceRes"}
                  statName={"Odp. na kłute"}
                  value={this.props.statsFromItems.pierceRes}
                />
                <ResLine
                  stat={"fireRes"}
                  statName={"Odp. na ogień"}
                  value={this.props.statsFromItems.fireRes}
                />
                <ResLine
                  stat={"energyRes"}
                  statName={"Odp. na energię"}
                  value={this.props.statsFromItems.energyRes}
                />
                <ResLine
                  stat={"frostRes"}
                  statName={"Odp. na zimno"}
                  value={this.props.statsFromItems.frostRes}
                />
                <ResLine
                  stat={"curseRes"}
                  statName={"Odp. na uroki"}
                  value={this.props.statsFromItems.curseRes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    statPts: state.stats.statPts,
    strength: state.stats.strength,
    agility: state.stats.agility,
    power: state.stats.power,
    knowledge: state.stats.knowledge,
    hp: state.stats.hp,
    endurance: state.stats.endurance,
    mana: state.stats.mana,
    statsFromItems: calculateStatsFromItems(state.equipment),
  };
};

//calculating how much total of each stat equipment provides
function calculateStatsFromItems(equipment) {
  let equipmentTypes = Object.keys(equipment);
  let equippedItems = equipmentTypes.map((x) => equipment[x]);
  //calculating stats from sets
  let statsFromSets = calculateStateFromSets(equipment);
  let equipmentStats = {
    strength:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.strength) : (total += 0)),
        0
      ) + statsFromSets.strength,
    agility:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.agility) : (total += 0)),
        0
      ) + statsFromSets.agility,
    power:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.power) : (total += 0)),
        0
      ) + statsFromSets.power,
    knowledge:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.knowledge) : (total += 0)),
        0
      ) + statsFromSets.knowledge,
    hp:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.hp) : (total += 0)),
        0
      ) + statsFromSets.hp,
    endurance:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.endurance) : (total += 0)),
        0
      ) + statsFromSets.endurance,
    mana:
      equippedItems.reduce(
        (total, x) => (x != null ? (total += x.mana) : (total += 0)),
        0
      ) + statsFromSets.mana,
    damage: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.damage) : (total += 0)),
      0
    ),
    fireRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.fireRes) : (total += 0)),
      0
    ),
    frostRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.frostRes) : (total += 0)),
      0
    ),
    energyRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.energyRes) : (total += 0)),
      0
    ),
    curseRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.curseRes) : (total += 0)),
      0
    ),
    pierceRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.pierceRes) : (total += 0)),
      0
    ),
    cutRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.cutRes) : (total += 0)),
      0
    ),
    bluntRes: equippedItems.reduce(
      (total, x) => (x != null ? (total += x.bluntRes) : (total += 0)),
      0
    ),
  };
  return equipmentStats;
}

//calculating how much total of each stat item sets provide
function calculateStateFromSets(equipment) {
  let setsEquipped = checkWhichSetsAreEquipped(equipment)
  let statsFromSets = {
    hp: 0,
    mana: 0,
    endurance: 0,
    strength: 0,
    agility: 0,
    power: 0,
    knowledge: 0,
  };
  if (Object.keys(setsEquipped).length > 0) {
    for (let key in setsEquipped) {
      if (setsEquipped.hasOwnProperty(key)) {
        let equippedSet = itemSets.find((x) => x.name === key);
        let eqippedSetProperties = equippedSet.getValuesDependingOnPieces(
          setsEquipped[key]
        );
        statsFromSets.hp += eqippedSetProperties.hp;
        statsFromSets.mana += eqippedSetProperties.mana;
        statsFromSets.endurance += eqippedSetProperties.endurance;
        statsFromSets.strength += eqippedSetProperties.strength;
        statsFromSets.agility += eqippedSetProperties.agility;
        statsFromSets.power += eqippedSetProperties.power;
        statsFromSets.knowledge += eqippedSetProperties.knowledge;
      }
    }
  }
  return statsFromSets;
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeStat: (stat, value) =>
      dispatch(changeStat({ stat: stat, value: value })),
    resetStatPoints: () => dispatch(resetStatPoints()),
  };
};

export const StatsCalculator = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedStatsCalculator);
