//React
import React from "react";

//Types
import { Skill } from "../../../../../data/models/skill.model";
import { TransitionStatus } from "react-transition-group/Transition";

//i18l
import { withTranslation } from "react-i18next";

export class ConnectedBuffTooltip extends React.Component<PropTypes> {
  createInfoTable(): JSX.Element {
    const skillLevels = ["I", "II", "III", "IV", "V", "VI", "VII"];

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
    const knowRequiredParagraphs = [3, 2, 1].map((knowRequired, index) => (
      <>
        <p key={index}>
          {knowRequired} {t("PA")} ={" "}
          {this.props.skill.calculateKnoRequired(
            this.props.level,
            knowRequired
          )}
        </p>
      </>
    ));
    return (
      <div className="skillTooltip" style={transitionStyles[this.props.state]}>
        <div className="basicInfo">
          <div className="descriptionLine">
            <div className="description">{this.props.skill.description}</div>
          </div>
        </div>
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
              <p>
                {t("Wymagana wiedza dla poziomu")} {this.props.level}:
              </p>
              {knowRequiredParagraphs}
            </div>
          </div>
        ) : null}
        <hr />
        <div className="basicInfo">{this.createInfoTable()}</div>
      </div>
    );
  }
}

export const BuffTooltip = withTranslation()(ConnectedBuffTooltip);

//Types

interface PropTypes {
  level: number;
  skill: Skill;
  state: TransitionStatus;
  t(string: string): string;
}
