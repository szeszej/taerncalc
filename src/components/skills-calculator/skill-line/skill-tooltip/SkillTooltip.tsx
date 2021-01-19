//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../store/store";

//Types
import { Skill } from "../../../../data/models/skill.model";
import { TransitionStatus } from "react-transition-group/Transition";

//Shared functionality
import { calculateStatsFromItems } from "../../../../shared/calculate-stats-from-items";
import { calculateOtherProperties } from "../../../../shared/calculate-other-properties"

//i18l
import { withTranslation } from "react-i18next";

export class ConnectedSkillTooltip extends React.Component<PropTypes> {
  createDamageLine(damageFormula: DamageFormula): string {
    let damageText: string = damageFormula
      ? damageFormula.strengthCoeff && damageFormula.agilityCoeff
        ? `${damageFormula.strengthCoeff} * ${this.props.t("strength")} + ${
            damageFormula.agilityCoeff
          } * ${this.props.t("agility")}`
        : damageFormula.powerCoeff && damageFormula.knoCoeff
        ? `${damageFormula.powerCoeff} * ${this.props.t("power")} + ${
            damageFormula.knoCoeff
          } * ${this.props.t("knowledge")}`
        : ""
      : "";
    damageText +=
      damageFormula && damageFormula.manaCoeff
        ? `+ ${damageFormula.manaCoeff} * ${this.props.t("mana")}`
        : "";
    damageText +=
      damageFormula && damageFormula.weapon ? `+ ${this.props.t("broń")}` : "";
    return damageText;
  }
  render() {
    const transitionStyles: { [id: string]: React.CSSProperties } = {
      entering: { maxHeight: "100em" },
      entered: { maxHeight: "100em" },
      exiting: { maxHeight: 0 },
      exited: { maxHeight: 0 },
    };
    const { t } = this.props;
    return (
      <div className="skillTooltip" style={transitionStyles[this.props.state]}>
        <div className="tooltipLine">
          <div className="description">{this.props.skill.description}</div>
        </div>
        {this.props.skill.level && this.props.skill.damageFormula ? <hr /> : null}
        {this.props.skill.level && this.props.skill.damageFormula ? (
          <div className="tooltipLine">
            <img src="images/damage.svg" alt="damage" />
            <div className="damage">
              <p>
                {t("Formuła")}:{" "}
                {this.createDamageLine(this.props.skill.damageFormula)}
              </p>
              <p>
                {t("Obrażenia")}:{" "}
                {this.props.skill.calculateDamage(this.props.stats, this.props.otherProperties)}
              </p>
            </div>
          </div>
        ) : null}
        {this.props.skill.level && this.props.skill.type === "buff" && this.props.skill.difficulty ? <hr /> : null}
        {this.props.skill.level && this.props.skill.type === "buff" && this.props.skill.difficulty ? (
          <div className="tooltipLine">
            <img src="images/difficulty.svg" alt="damage" />
            <div className="damage">
              <p>
                {t("Trudność")}:{" "}
                {this.props.skill.level ? this.props.skill.difficulty[this.props.skill.level - 1] : 0}
              </p>
              <p>
                {t("req-ap")}:{" "}
                {this.props.skill.calculateAP(this.props.stats.knowledge, this.props.level)}
              </p>
              <p>{t("know-req")} 3 {t("PA")}: {this.props.skill.calculateKnoRequired(this.props.level, 3)} ({this.props.skill.calculateKnoRequired(this.props.level, 3) <= this.props.stats.knowledge ? t("Osiągnięto") : `${t("potrzeba")} ${this.props.skill.calculateKnoRequired(this.props.level, 3) - this.props.stats.knowledge}`})</p>
              <p>{t("know-req")} 2 {t("PA")}: {this.props.skill.calculateKnoRequired(this.props.level, 2)} ({this.props.skill.calculateKnoRequired(this.props.level, 2) <= this.props.stats.knowledge ? t("Osiągnięto") : `${t("potrzeba")} ${this.props.skill.calculateKnoRequired(this.props.level, 2) - this.props.stats.knowledge}`})</p>
              <p>{t("know-req")} 1 {t("PA")}: {this.props.skill.calculateKnoRequired(this.props.level, 1)} ({this.props.skill.calculateKnoRequired(this.props.level, 1) <= this.props.stats.knowledge ? t("Osiągnięto") : `${t("potrzeba")} ${this.props.skill.calculateKnoRequired(this.props.level, 1) - this.props.stats.knowledge}`})</p>
              <p>{t("current-kno")}: {this.props.stats.knowledge}</p>
            </div>
          </div>
        ) : null}

      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let statsFromItems = calculateStatsFromItems(
    state.equipment,
    state.character.level
  );
  return {
    level: state.character.level,
    stats: {
      strength: state.stats.strength + statsFromItems.strength,
      agility: state.stats.agility + statsFromItems.agility,
      power: state.stats.power + statsFromItems.power,
      knowledge: state.stats.knowledge + statsFromItems.knowledge,
      // hp: state.stats.hp,
      // endurance: state.stats.endurance,
      mana: state.stats.mana + statsFromItems.mana,
      weaponDamage: statsFromItems.damage,
    },
    otherProperties: calculateOtherProperties(state.equipment)
  };
};

const connector = connect(mapStateToProps);

export const SkillTooltip = withTranslation()(connector(ConnectedSkillTooltip));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  skill: Skill;
  state: TransitionStatus;
  t(string: string): string;
}

type DamageFormula = {
  strengthCoeff: number;
  agilityCoeff: number;
  powerCoeff: number;
  knoCoeff: number;
  manaCoeff: number;
  weapon: boolean;
} | null;
