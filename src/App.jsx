//React
import React from "react";

//Redux
import { connect } from "react-redux";

//Components
import { SkillsCalculator } from "./components/skills-calculator/SkillsCalculator.jsx";
import { StatsCalculator } from "./components/stats-calculator/StatsCalculator.jsx";
import { LevelChanger } from "./components/level-changer/LevelChanger";
import { BuildExporter } from "./components/build-exporter/BuildExporter";

//Actions
import { changeLevel } from "./store/character-reducer/character-reducer";

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      active: "stats"
    };
  }
  componentDidMount() {
    let charClass = document.getElementById("charClass");
    charClass.value = this.props.className;
    let charLvl = document.getElementById("charLvl");
    charLvl.value = this.props.level;
  }
  componentDidUpdate(prevProps, prevState) {
    let charLvl = document.getElementById("charLvl");
    charLvl.value = this.props.level;
  }
  changeTabs(tab) {
    this.setState({
      active: tab,
    });
  }
  changeLevel(value) {
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

const mapStateToProps = (state) => {
  return {
    level: state.character.level,
    className: state.character.className,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLevel: (value) => dispatch(changeLevel({ level: value })),
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
