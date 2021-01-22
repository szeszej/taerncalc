//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";

//Components
import { EquipmentComponent } from "./equipment/Equipment";
import { StatLine } from "./stat-line/StatLine";
import { ResLine } from "./resist-line/ResLine";
import { OtherLine } from "./other-line/OtherLine";

//Shared functionality
import { calculateStatsFromItems } from "../../../shared/calculate-stats-from-items"

//Data
import resTable from "../../../data/resistance-table";

//Actions
import { changeStat } from "../../../store/stats-reducer/stats-reducer";
import { resetStatPoints } from "../../../store/stats-reducer/stats-reducer";

//i18l
import { withTranslation } from "react-i18next";

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
    let power: number = 0;
    power +=
      this.props.statsFromItems.strength + this.props.strength +
      this.props.statsFromItems.agility + this.props.agility +
      this.props.statsFromItems.power + this.props.power +
      this.props.statsFromItems.knowledge + this.props.knowledge +
      Math.round(
        Math.round((this.props.statsFromItems.hp + this.props.hp) / 10) +
          Math.round((this.props.statsFromItems.mana + this.props.mana) / 10) +
          Math.round((this.props.statsFromItems.endurance + this.props.endurance) / 10)
      ) +
      Math.round(this.calculateResistances(this.props.statsFromItems.fireRes)) +
      Math.round(
        this.calculateResistances(this.props.statsFromItems.frostRes)
      ) +
      Math.round(
        this.calculateResistances(this.props.statsFromItems.energyRes)
      ) +
      Math.round(
        Math.round(
          this.calculateResistances(this.props.statsFromItems.curseRes)
        ) * 1.5
      ) +
      Math.round(
        (Math.round(
          this.calculateResistances(this.props.statsFromItems.cutRes)
        ) +
          Math.round(
            this.calculateResistances(this.props.statsFromItems.pierceRes)
          ) +
          Math.round(
            this.calculateResistances(this.props.statsFromItems.bluntRes)
          )) /
          2
      );
    return power;
  }
  render() {
    const { t } = this.props
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
      "cutRes",
      "bluntRes",
      "pierceRes",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
    ];
    let statComponents = statNames.map((statName) => (
      <StatLine
        spendStatPoints={this.spendStatPoints}
        stat={statName}
        statName={t(statName)}
        value={this.props[statName as keyof Stats]}
        pointsLeft={this.props.statPts}
        fromItems={this.props.statsFromItems[statName as keyof Stats]}
        key={statName}
      />
    ));
    let resistComponents = resistNames.map((statName) => (
      <ResLine
        stat={statName}
        statName={t(statName)}
        value={this.props.statsFromItems[statName as keyof Resists]}
        percentageValue={this.calculateResistances(
          this.props.statsFromItems[statName as keyof Resists]
        )}
        key={statName}
      />
    ));
    return (
      <div
        className="statsCalculator"
      >
        <div className="stats">
          <p className="points">
            <span style={this.props.statPts < 0 ? negativePoints : undefined}>
              {t("Punkty statystyk")}: {this.props.statPts}
            </span>{" "}
            <button className={"inlineButton"} onClick={() => this.reset()}>
              {t("Reset")}
            </button>
          </p>
          <div className="linesAndEq">
            <EquipmentComponent />
            <div className="statsAndRes">
              <div className="statLines">
                <OtherLine
                  stat="damage"
                  statName={t("Obrażenia")}
                  value={this.props.statsFromItems.damage}
                />
                {statComponents}
              </div>
              <div className="resLines">
                <OtherLine
                  stat="characterPower"
                  statName={t("char-power")}
                  value={this.calculateTotalPower()}
                />
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
    statsFromItems: calculateStatsFromItems(
      state.equipment,
      state.character.level
    ),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeStat: (stat: StatNames, value: number) =>
      dispatch(changeStat({ stat: stat, value: value })),
    resetStatPoints: () => dispatch(resetStatPoints()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTranslation()(connector(ConnectedStatsCalculator));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  t(string: string): string;
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
