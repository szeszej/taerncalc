//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { LevelChanger } from "../shared/level-changer/LevelChanger";
import { Intro } from "./intro/Intro";
import { BuffsOverview } from "./buffs-overview/BuffsOverview"

//Shared functionality
import { confirmNewBuildCreation } from "./../../shared/new-build-confirmation";

//i18l
import { withTranslation } from "react-i18next";

//types:
import { Skill } from "../../data/models/skill.model"
import { SkillSet } from "../../data/models/skill-set.model"

class ConnectedKnowledgeCalculator extends React.Component<
  PropTypes,
  StateTypes
> {
  constructor(props: PropTypes) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      charClass: "",
      charLevel: "",
      buffsForClass: null,
      isCalculatorGenerated: false,
    };
    this.generateCalculator = this.generateCalculator.bind(this);
    this.changeSkillLevel = this.changeSkillLevel.bind(this);
  }
  generateCalculator(): void {
    ReactGA.event({
      category: "Form",
      action: "Knowledge Calculator",
      label: this.state.charClass + " " + this.state.charLevel,
    });
    this.getBuffsForClass()
    this.setState({ isCalculatorGenerated: true });
  }
  changeSkillLevel(skillNumber: number, value: number) {
    if (this.state.buffsForClass) {
      this.setState((prevState: StateTypes) => {
        let newState = {...prevState}
        prevState.buffsForClass![skillNumber].level += value
        return newState;
      });
    }

  }
  changeLevel(value: number): void {
    this.setState((prevState: StateTypes) => {
      return {
        charLevel: (+prevState.charLevel + value).toString(),
      };
    });
  }
  getBuffsForClass() {
    let skillSet = new SkillSet(this.state.charClass)
    let skillSetArray = Object.values(skillSet)
    let buffs = skillSetArray.filter(skill => skill.type === "buff" && skill.difficulty)
    this.setState({
      buffsForClass: buffs
    })
  }
  render() {
    const { t } = this.props;
    return (
      <div className="calculator">
        <div id="classLvlWrapper">
          <form
            id="classLvl"
            onSubmit={(event) => {
              event.preventDefault();
              if (this.state.isCalculatorGenerated) {
                confirmNewBuildCreation(this.generateCalculator);
              } else {
                this.generateCalculator();
              }
            }}
          >
            <select
              id="charClass"
              required
              onChange={(event) =>
                this.setState({ charClass: event.currentTarget.value })
              }
              value={this.state.charClass}
            >
              <option disabled value={""} className="placeholder">
                {t("Wybierz klasę")}
              </option>
              <option value="barbarian">{t("Barbarzyńca")}</option>
              <option value="knight">{t("Rycerz")}</option>
              <option value="sheed">{t("Sheed")}</option>
              <option value="druid">{t("Druid")}</option>
              <option value="firemage">{t("Mag Ognia")}</option>
              <option value="archer">{t("Łucznik")}</option>
            </select>
            <input
              type="number"
              min="1"
              max="140"
              placeholder={t("Poziom postaci")}
              id="charLvl"
              value={this.state.charLevel}
              required
              onChange={(event) =>
                this.setState({ charLevel: event.currentTarget.value })
              }
            />
            <input className="submit" type="submit" value={t("Zatwierdź")} />
          </form>
        </div>
        <div id="calc">
          {this.state.isCalculatorGenerated && this.state.buffsForClass ? (
            <div className="calculators">
              <LevelChanger
                level={+this.state.charLevel}
                changeLevel={this.changeLevel}
                t={this.props.t}
              />
              <BuffsOverview skillSet={this.state.buffsForClass} level={+this.state.charLevel} changeSkillLevel={this.changeSkillLevel}/>
            </div>
          ) : (
            <Intro />
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(ConnectedKnowledgeCalculator);

//Types
type PropTypes = OwnProps;

interface StateTypes {
  charClass: string;
  charLevel: string;
  buffsForClass: Skill[] | null;
  isCalculatorGenerated: boolean;
}

interface OwnProps {
  t(string: string): string;
}
