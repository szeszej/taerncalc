//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";
import { Dispatch } from "redux";

//Components
import { EquipmentComponent } from "./equipment/Equipment";
import { StatLine } from "./stat-line/StatLine";
import { ResLine } from "./resist-line/ResLine";
import { OtherLine } from "./other-line/OtherLine";

//Data
import { itemSets } from "../../data/item-sets";
import resTable from "../../data/resistance-table";

//Actions
import { changeStat } from "../../store/stats-reducer/stats-reducer";
import { resetStatPoints } from "../../store/stats-reducer/stats-reducer";

//Shared functionality
import { checkWhichSetsAreEquipped } from "../../shared/check-which-sets-are-equipped";
import translateProperty from "../../shared/translate-property";

//Types
import { Equipment } from "../../store/equipment-reducer/equipment-reducer";
import { Item } from "../../data/models/item.model";

class ConnectedStatsCalculator extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.spendStatPoints = this.spendStatPoints.bind(this);
    this.reset = this.reset.bind(this);
  }
  spendStatPoints(stat: StatNames, value: number) {
    this.props.changeStat(stat, value);
  }
  reset() {
    this.props.resetStatPoints();
  }
  calculateResistances(res: number): number {
    let resPercentage: number = 0;
    if (res <= 1000) {
      resPercentage = resTable[res];
    } else {
      resPercentage = 100;
    }
    return resPercentage;
  }
  calculateTotalPower(): number {
    let power: number = 0
    power += this.props.statsFromItems.strength + this.props.statsFromItems.agility + this.props.statsFromItems.power + this.props.statsFromItems.knowledge + Math.round(this.props.statsFromItems.hp / 10) + Math.round(this.props.statsFromItems.mana / 10) + Math.round(this.props.statsFromItems.endurance / 10) + Math.round(this.calculateResistances(this.props.statsFromItems.fireRes)) + Math.round(this.calculateResistances(this.props.statsFromItems.frostRes)) + Math.round(this.calculateResistances(this.props.statsFromItems.energyRes)) + Math.round(Math.round(this.calculateResistances(this.props.statsFromItems.curseRes)) * 1.5) + Math.round(Math.round(this.calculateResistances(this.props.statsFromItems.cutRes)) + Math.round(this.calculateResistances(this.props.statsFromItems.pierceRes)) + Math.round(this.calculateResistances(this.props.statsFromItems.bluntRes)) / 2)
    return power
  }
  render() {
    let negativePoints = {
      color: "red",
    };
    let statNames = [
      "strength",
      "agility",
      "power",
      "knowledge",
      "hp",
      "mana",
      "endurance",
    ];
    let resistNames = [
      "bluntRes",
      "cutRes",
      "pierceRes",
      "fireRes",
      "energyRes",
      "curseRes",
      "frostRes",
    ];
    let statComponents = statNames.map(statName => (<StatLine
      spendStatPoints={this.spendStatPoints}
      stat={statName}
      statName={translateProperty(statName)}
      value={this.props[statName as keyof Stats]}
      pointsLeft={this.props.statPts}
      fromItems={this.props.statsFromItems[statName as keyof Stats]}
      key={statName}
    />))
    let resistComponents = resistNames.map(statName => (<ResLine
      stat={statName}
      statName={translateProperty(statName)}
      value={this.props.statsFromItems[statName as keyof Resists]}
      percentageValue={this.calculateResistances(this.props.statsFromItems[statName as keyof Resists])}
      key={statName}
    />))
    return (
      <div
        className="statsCalculator"
        style={this.props.active === "stats" ? undefined : { display: "none" }}
      >
        <div className="stats">
          <p className="points">
            <span style={this.props.statPts < 0 ? negativePoints : undefined}>
              Punkty statystyk: {this.props.statPts}
            </span>{" "}
            <button className={"inlineButton"} onClick={() => this.reset()}>
              Reset
            </button>
          </p>
          <div className="linesAndEq">
            <EquipmentComponent />
            <div className="statsAndRes">
              <div className="statLines">
                <OtherLine stat="damage" statName="Obrażenia" value={this.props.statsFromItems.damage} />
                {statComponents}
              </div>
              <div className="resLines">
                <OtherLine stat="characterPower" statName="Power" value={this.calculateTotalPower()} />
                {resistComponents}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    statPts: state.stats.statPts,
    strength: state.stats.strength,
    agility: state.stats.agility,
    power: state.stats.power,
    knowledge: state.stats.knowledge,
    hp: state.stats.hp,
    endurance: state.stats.endurance,
    mana: state.stats.mana,
    statsFromItems: calculateStatsFromItems(state.equipment, state.character.level),
  };
};

//calculating how much total of each stat equipment provides
function calculateStatsFromItems(equipment: Equipment, level: number): StatsFromItems {
  let equipmentTypes = Object.keys(equipment);
  let equippedItems = equipmentTypes.map(
    (x) => equipment[x as keyof Equipment]
  );
  //calculating stats from sets
  let statsFromSets = calculateStateFromSets(equipment);
  let equipmentStats = {
    strength:
      equippedItems.reduce(
        (total, x) =>
          x != null
            ? (total += x.calculateTotalStat("strength"))
            : (total += 0),
        0
      ) + statsFromSets.strength,
    agility:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("agility")) : (total += 0),
        0
      ) + statsFromSets.agility,
    power:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("power")) : (total += 0),
        0
      ) + statsFromSets.power,
    knowledge:
      equippedItems.reduce(
        (total, x) =>
          x != null
            ? (total += x.calculateTotalStat("knowledge"))
            : (total += 0),
        0
      ) + statsFromSets.knowledge,
    hp:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("hp")) : (total += 0),
        0
      ) + statsFromSets.hp,
    endurance:
      equippedItems.reduce(
        (total, x) =>
          x != null
            ? (total += x.calculateTotalStat("endurance"))
            : (total += 0),
        0
      ) + statsFromSets.endurance,
    mana:
      equippedItems.reduce(
        (total, x) =>
          x != null ? (total += x.calculateTotalStat("mana")) : (total += 0),
        0
      ) + statsFromSets.mana,
    damage: calculateTotalDamage(equipment.weapon, equipment.special, level),
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
function calculateStateFromSets(equipment: Equipment): Stats {
  let setsEquipped = checkWhichSetsAreEquipped(equipment);
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
        let eqippedSetProperties = equippedSet!.getValuesDependingOnPieces(
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

function calculateTotalDamage(weapon: Item | null, special: Item | null, level: number) {
  let totalDamage = 0;
  if (weapon) {
    totalDamage += weapon.calculateTotalDamage(level);
  }
  if (special) {
    totalDamage += special.damage;
  }
  return totalDamage;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeStat: (stat: StatNames, value: number) =>
      dispatch(changeStat({ stat: stat, value: value })),
    resetStatPoints: () => dispatch(resetStatPoints()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const StatsCalculator = connector(ConnectedStatsCalculator);

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  active: string;
}

interface StatsFromItems extends Resists, Stats {
  damage: number;
}

interface Resists {
  bluntRes: number;
  cutRes: number;
  pierceRes: number;
  fireRes: number;
  energyRes: number;
  curseRes: number;
  frostRes: number;
}

interface Stats {
  hp: number;
  mana: number;
  endurance: number;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
}

type StatNames =
  | "strength"
  | "agility"
  | "knowledge"
  | "power"
  | "hp"
  | "mana"
  | "endurance";
