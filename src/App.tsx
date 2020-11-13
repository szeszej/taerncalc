//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./store/store";
import { Dispatch } from "redux";

//Components
import { SkillsCalculator } from "./components/skills-calculator/SkillsCalculator";
import { StatsCalculator } from "./components/stats-calculator/StatsCalculator";
import { LevelChanger } from "./components/level-changer/LevelChanger";
import { BuildExporter } from "./components/build-exporter/BuildExporter";

//Actions
import { changeLevel } from "./store/character-reducer/character-reducer";

class ConnectedApp extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      active: "stats",
    };
  }
  componentDidMount() {
    let charClass = document.getElementById("charClass") as HTMLInputElement;
    charClass!.value = this.props.className;
    let charLvl = document.getElementById("charLvl") as HTMLInputElement;
    charLvl!.value = this.props.level.toString();
  }
  componentDidUpdate() {
    let charLvl = document.getElementById("charLvl") as HTMLInputElement;
    charLvl!.value = this.props.level.toString();
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
    let inactive = {
      opacity: 0.45,
    };
    let active = {
      borderBottom: "10px solid #bd996f",
    };
    return (
      <div className="calculators">
        <div className="tabs">
          <button
            style={this.state.active === "stats" ? active : inactive}
            onClick={() => this.changeTabs("stats")}
          >
            Statystyki i przedmioty
          </button>
          <div className="separator"></div>
          <button
            style={this.state.active === "skills" ? active : inactive}
            onClick={() => this.changeTabs("skills")}
          >
            Umiejętności
          </button>
        </div>
        <LevelChanger level={this.props.level} changeLevel={this.changeLevel} />
        <SkillsCalculator active={this.state.active} />
        <StatsCalculator active={this.state.active} /> <BuildExporter />
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
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const App = connector(ConnectedApp);

//Types
type PropTypes = ConnectedProps<typeof connector>;

interface StateTypes {
  active: "stats" | "skills";
}
