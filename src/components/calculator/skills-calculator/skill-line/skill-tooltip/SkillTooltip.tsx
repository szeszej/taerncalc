//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../../store/store";

//Types
import { Skill } from "../../../../../data/models/skill.model";
import { TransitionStatus } from "react-transition-group/Transition";

//Shared functionality
import { calculateStatsFromItems } from "../../../../../shared/calculate-stats-from-items";
import { calculateOtherProperties } from "../../../../../shared/calculate-other-properties";

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
      damageFormula && damageFormula.weapon ? ` + ${this.props.t("broń")}` : "";
    return damageText;
  }
  createInfoTable(): JSX.Element {
    const skillLevels =
      this.props.skill.maxLvl === 7
        ? ["I", "II", "III", "IV", "V", "VI", "VII"]
        : ["I"];
    const allEqual = (arr: number[]) => arr.every((val) => val === arr[0]);
    const effectsHeaders = (
      <tr>
        <th className="emptyCell"></th>
        {skillLevels.map((level, index) => (
          <th
            key={level}
            className={
              this.props.skill.level && this.props.skill.level - 1 === index
                ? "currentLevel"
                : undefined
            }
          >
            {level}
          </th>
        ))}
      </tr>
    );
    const hittingMod = this.props.skill.hittingMod ? (
      <tr>
        <td>
          <img src={`images/hittingMod.svg`} alt="hittingMod" />
          {this.props.t("Szansa trafienia")}
        </td>
        {allEqual(this.props.skill.hittingMod) ? (
          <td
            className={this.props.skill.level ? "currentLevel" : undefined}
            colSpan={7}
          >
            {Math.floor(this.props.skill.hittingMod[0] * 10) / 10}%
          </td>
        ) : (
          this.props.skill.hittingMod.map((x, index) => (
            <td
              key={index}
              className={
                this.props.skill.level && this.props.skill.level - 1 === index
                  ? "currentLevel"
                  : undefined
              }
            >
              {Math.floor(x * 10) / 10}%
            </td>
          ))
        )}
      </tr>
    ) : null;
    const damageMod = this.props.skill.damageMod ? (
      <tr>
        <td>
          <img
            src={`images/${
              this.props.skill.healing ? "healing" : "damage"
            }.svg`}
            alt="damage"
          />
          {this.props.skill.healing
            ? this.props.t("Siła leczenia")
            : this.props.t("Obrażenia")}
        </td>
        {allEqual(this.props.skill.damageMod) ? (
          <td
            className={this.props.skill.level ? "currentLevel" : undefined}
            colSpan={7}
          >
            {Math.floor(this.props.skill.damageMod[0] * 10) / 10}%
          </td>
        ) : (
          this.props.skill.damageMod.map((x, index) => (
            <td
              key={index}
              className={
                this.props.skill.level && this.props.skill.level - 1 === index
                  ? "currentLevel"
                  : undefined
              }
            >
              {Math.floor(x * 10) / 10}%
            </td>
          ))
        )}
      </tr>
    ) : null;
    const manaCost = this.props.skill.manaCost ? (
      <tr>
        <td>
          <img src={`images/mana.svg`} alt="mana" />
          {this.props.t("mana")}
        </td>
        {allEqual(this.props.skill.manaCost) ? (
          <td
            className={this.props.skill.level ? "currentLevel" : undefined}
            colSpan={7}
          >
            {Math.floor(this.props.skill.manaCost[0] * 10) / 10}
          </td>
        ) : (
          this.props.skill.manaCost.map((x, index) => (
            <td
              key={index}
              className={
                this.props.skill.level && this.props.skill.level - 1 === index
                  ? "currentLevel"
                  : undefined
              }
            >
              {Math.floor(x * 10) / 10}
            </td>
          ))
        )}
      </tr>
    ) : null;
    const enduranceCost = this.props.skill.enduranceCost ? (
      <tr>
        <td>
          <img src={`images/endurance.svg`} alt="endurance" />
          {this.props.t("endurance")}
        </td>
        {allEqual(this.props.skill.enduranceCost) ? (
          <td
            className={this.props.skill.level ? "currentLevel" : undefined}
            colSpan={7}
          >
            {Math.floor(this.props.skill.enduranceCost[0] * 10) / 10}
          </td>
        ) : (
          this.props.skill.enduranceCost.map((x, index) => (
            <td
              key={index}
              className={
                this.props.skill.level && this.props.skill.level - 1 === index
                  ? "currentLevel"
                  : undefined
              }
            >
              {Math.floor(x * 10) / 10}
            </td>
          ))
        )}
      </tr>
    ) : null;
    const effectsTables = this.props.skill.effects
      ? this.props.skill.effects.map((effect) => (
          <tr key={effect.name}>
            <td>{this.props.t(effect.name)}</td>
            {allEqual(effect.effect) ? (
              <td
                className={this.props.skill.level ? "currentLevel" : undefined}
                colSpan={7}
              >
                {effect.effect[0] > 0 ? "+" : null}
                {Math.floor(effect.effect[0] * 10) / 10}
                {effect.type === "numeric" ? null : "%"}
              </td>
            ) : (
              effect.effect.map((x, index) => (
                <td
                  key={index}
                  className={
                    this.props.skill.level &&
                    this.props.skill.level - 1 === index
                      ? "currentLevel"
                      : undefined
                  }
                >
                  {x > 0 && this.props.skill.name !== "Wataha" ? "+" : null}
                  {Math.floor(x * 10) / 10}
                  {effect.type === "numeric" ? null : "%"}
                </td>
              ))
            )}
          </tr>
        ))
      : null;
    const duration = this.props.skill.duration ? (
      <tr>
        <td>
          <img src={`images/duration.svg`} alt="duration" />
          {this.props.t("Czas trwania")}
        </td>
        {allEqual(this.props.skill.duration) ? (
          <td
            className={this.props.skill.level ? "currentLevel" : undefined}
            colSpan={7}
          >
            {Math.floor(this.props.skill.duration[0] * 10) / 10}
          </td>
        ) : (
          this.props.skill.duration.map((x, index) => (
            <td
              key={index}
              className={
                this.props.skill.level && this.props.skill.level - 1 === index
                  ? "currentLevel"
                  : undefined
              }
            >
              {Math.floor(x * 10) / 10}
            </td>
          ))
        )}
      </tr>
    ) : null;
    const difficulty = this.props.skill.difficulty ? (
      <tr>
        <td className="rowName">
          <img src={`images/difficulty.svg`} alt="difficulty" />
          {this.props.t("Trudność")}
        </td>
        {this.props.skill.difficulty.map((x, index) => (
          <td
            key={index}
            className={
              this.props.skill.level && this.props.skill.level - 1 === index
                ? "currentLevel"
                : undefined
            }
          >
            {Math.floor(x * 10) / 10}
          </td>
        ))}
      </tr>
    ) : null;
    return (
      <div className="descriptionLine">
        <table>
          <tbody>
            {effectsHeaders}
            {hittingMod}
            {damageMod}
            {enduranceCost}
            {manaCost}
            {difficulty}
            {duration}
            {effectsTables}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    const transitionStyles: { [id: string]: React.CSSProperties } = {
      entering: { maxHeight: "70em" },
      entered: { maxHeight: "70em" },
      exiting: { maxHeight: 0 },
      exited: { maxHeight: 0 },
    };
    const { t } = this.props;
    const knowRequired = [3, 2, 1].map((AP) =>
      this.props.skill.calculateKnoRequired(this.props.level, AP)
    );
    const knowRequiredParagraphs = [3, 2, 1].map((knowRequired, index) => (
      <p key={index}>
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
              src={`images/${
                this.props.skill.type === "attack" &&
                !this.props.skill.damageMod &&
                !this.props.skill.damageFormula
                  ? "debuff"
                  : this.props.skill.type
              }.svg`}
              alt="attack type"
            />
            <div className="description">
              {t("Rodzaj umiejętności")}:{" "}
              {t(
                this.props.skill.type === "attack" &&
                  !this.props.skill.damageMod &&
                  !this.props.skill.damageFormula
                  ? "debuff"
                  : this.props.skill.type
              )}
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
              </div>
            </div>
          ) : null}
          {this.props.skill.type === "attack" && this.props.skill.hitType ? (
            <div className="descriptionLine">
              <img
                src={`images/${this.props.skill.hitType}.svg`}
                alt="hit type"
              />
              <div className="description">
                {t("Atrybut do trafienia")}: {t(this.props.skill.hitType)}
              </div>
            </div>
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
          <div className="descriptionLine">
            <div className="description">{this.props.skill.description}</div>
          </div>
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
                {t("avg-damage")}:{" "}
                {this.props.skill.calculateDamage(
                  this.props.stats,
                  this.props.otherProperties
                )}
              </p>
            </div>
          </div>
        ) : null}
        {this.props.skill.level && this.props.skill.healing ? (
          <div className="tooltipLine">
            <img src="images/healing.svg" alt="damage" />
            <div className="damage">
              <p>
                {t("Formuła")}:{" "}
                {`(1.3 * ${t("power")} + 0.7 * ${t("knowledge")}) * ${t(
                  "Siła leczenia"
                )} * (1 + ${t("Modyfikator obrażeń")} / 2)`}
              </p>
              <p>
                {t("Leczenie")}:{" "}
                {this.props.skill.calculateHealing(
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
        {this.props.skill.name !== "Ucieczka" ? <hr /> : null}
        {this.props.skill.name !== "Ucieczka" ? (
          <div className="basicInfo">{this.createInfoTable()}</div>
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
