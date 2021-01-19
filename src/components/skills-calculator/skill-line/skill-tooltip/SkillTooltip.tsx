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
import { calculateOtherProperties } from "../../../../shared/calculate-other-properties";

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
    const knowRequired = [3, 2, 1].map((AP) =>
      this.props.skill.calculateKnoRequired(this.props.level, AP)
    );
    const knowRequiredParagraphs = [3, 2, 1].map((knowRequired) => (
      <p>
        {t("know-req")} {knowRequired} {t("PA")}:{" "}
        {this.props.skill.calculateKnoRequired(this.props.level, knowRequired)}{" "}
        (
        {this.props.skill.calculateKnoRequired(
          this.props.level,
          knowRequired
        ) <= this.props.stats.knowledge
          ? t("Osiągnięto")
          : `${t("potrzeba")} ${
              this.props.skill.calculateKnoRequired(
                this.props.level,
                knowRequired
              ) - this.props.stats.knowledge
            }`}
        )
      </p>
    ));
    return (
      <div className="skillTooltip" style={transitionStyles[this.props.state]}>
        <div className="basicInfo">
          <div className="descriptionLine">
            <img
              src={`images/${this.props.skill.type}.svg`}
              alt="attack type"
            />
            <div className="description">
              {t("Rodzaj umiejętności")}: {t(this.props.skill.type)}
            </div>
          </div>
          {this.props.skill.type === "attack" && this.props.skill.attackType ? (
                      <div className="descriptionLine">
            <img
              src={`images/${this.props.skill.attackType}.svg`}
              alt="attack type"
            />
            <div className="description">
              {t("Strefa ataku")}: {t(this.props.skill.attackType)}
            </div></div>
          ) : null}
          <div className="descriptionLine">
          <img
            src={`images/${this.props.skill.target}.svg`}
            alt="attack type"
          />
          <div className="description">
            {t("Cel")}: {t(this.props.skill.target)}
          </div>
          </div>
          <div className="description">{this.props.skill.description}</div>
        </div>
        {this.props.skill.level && this.props.skill.damageFormula ? (
          <hr />
        ) : null}
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
                {this.props.skill.calculateDamage(
                  this.props.stats,
                  this.props.otherProperties
                )}
              </p>
            </div>
          </div>
        ) : null}
        {this.props.skill.level &&
        this.props.skill.type === "buff" &&
        this.props.skill.difficulty ? (
          <hr />
        ) : null}
        {this.props.skill.level &&
        this.props.skill.type === "buff" &&
        this.props.skill.difficulty ? (
          <div className="tooltipLine">
            <img src="images/difficulty.svg" alt="difficulty" />
            <div className="damage">
              <p>
                {t("Trudność")}:{" "}
                {this.props.skill.level
                  ? this.props.skill.difficulty[this.props.skill.level - 1]
                  : 0}
              </p>
              <p>
                {t("req-ap")}:{" "}
                {this.props.stats.knowledge < knowRequired[0]
                  ? 4
                  : this.props.stats.knowledge < knowRequired[1]
                  ? 3
                  : this.props.stats.knowledge < knowRequired[2]
                  ? 2
                  : 1}
              </p>
            </div>
          </div>
        ) : null}
        {this.props.skill.level &&
        this.props.skill.type === "buff" &&
        this.props.skill.difficulty ? (
          <hr />
        ) : null}
        {this.props.skill.level &&
        this.props.skill.type === "buff" &&
        this.props.skill.difficulty ? (
          <div className="tooltipLine">
            <img src="images/knowledge.svg" alt="knowledge" />
            <div className="damage">
              {knowRequiredParagraphs}
              <p>
                {t("current-kno")}: {this.props.stats.knowledge}
              </p>
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
    otherProperties: calculateOtherProperties(state.equipment),
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
