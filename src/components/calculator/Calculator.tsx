//React
import React, { Suspense } from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";
import { Dispatch } from "redux";

//Components
import { LevelChanger } from "../shared/level-changer/LevelChanger";
import { BuildExporter } from "./build-exporter/BuildExporter";
import { Intro } from "./intro/Intro";
import { LoadingMessage } from "../../components/shared/LoadingMessage";

//Actions
import { changeLevel } from "../../store/character-reducer/character-reducer";
import { initializeCharacter } from "../../store/character-reducer/character-reducer";

//Shared functionality
import { confirmNewBuildCreation } from "./../../shared/new-build-confirmation";

//i18l
import { withTranslation } from "react-i18next";

//Lazy loading
const SkillsCalculator = React.lazy(() =>
  import("./skills-calculator/SkillsCalculator")
);
const StatsCalculator = React.lazy(() =>
  import("./stats-calculator/StatsCalculator")
);

class ConnectedCalculator extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      active: "stats",
      charClass: "",
      charLevel: "",
      isCalculatorGenerated: false,
    };
    this.generateCalculator = this.generateCalculator.bind(this);
  }
  componentDidMount() {
    if (this.props.isBuildImported) {
      this.setState({
        charClass: this.props.className,
        charLevel: this.props.level.toString(),
        isCalculatorGenerated: true,
      });
    }
  }
  componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.level !== this.props.level) {
      this.setState({
        charLevel: this.props.level.toString(),
      });
    }
  }
  generateCalculator(): void {
    ReactGA.event({
      category: "Form",
      action: "Submit",
      label: this.state.charClass + " " + this.state.charLevel,
    });
    this.props.initializeCharacter(this.state.charClass, +this.state.charLevel);
    this.setState({ isCalculatorGenerated: true });
  }
  changeTabs(tab: "stats" | "skills") {
    this.setState({
      active: tab,
    });
  }
  changeLevel(value: number) {
    this.props.changeLevel(value);
  }
  render() {
    const { t } = this.props;
    let inactive = {
      opacity: 0.45,
    };
    let active = {
      borderBottom: "10px solid #bd996f",
    };
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
              <option value="voodoo">{t("VooDoo")}</option>
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
        <Suspense fallback={<LoadingMessage />}>
        <div id="calc">
          {this.state.isCalculatorGenerated ? (
            <div className="calculators">
              <div className="tabs">
                <button
                  style={this.state.active === "stats" ? active : inactive}
                  onClick={() => this.changeTabs("stats")}
                >
                  {t("Statystyki i przedmioty")}
                </button>
                <div className="separator"></div>
                <button
                  style={this.state.active === "skills" ? active : inactive}
                  onClick={() => this.changeTabs("skills")}
                >
                  {t("Umiejętności")}
                </button>
              </div>
              <LevelChanger
                level={this.props.level}
                changeLevel={this.changeLevel}
                t={this.props.t}
              />
              {this.state.active === "skills" ? (
                <SkillsCalculator />
              ) : (
                <StatsCalculator />
              )}{" "}
              <BuildExporter />
            </div>
          ) : (
            <Intro />
          )}

        </div>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    level: state.character.level,
    className: state.character.className,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLevel: (value: number) => dispatch(changeLevel({ level: value })),
    initializeCharacter: (className: string, level: number) =>
      dispatch(initializeCharacter({ className: className, level: level })),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTranslation()(connector(ConnectedCalculator));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface StateTypes {
  active: "stats" | "skills";
  charClass: string;
  charLevel: string;
  isCalculatorGenerated: boolean;
}

interface OwnProps {
  t(string: string): string;
  isBuildImported: boolean;
}
