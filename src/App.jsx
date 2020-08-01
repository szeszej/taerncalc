//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect } from "react-redux";

//Components
import { SkillsCalculator } from "./components/skills-calculator/SkillsCalculator.jsx";
import { StatsCalculator } from "./components/stats-calculator/StatsCalculator.jsx";
import { LevelIncrementButton } from "./components/level-buttons/LevelIncrementButton.jsx";
import { LevelDecrementButton } from "./components/level-buttons/LevelDecrementButton.jsx";
import { BuildExporter } from "./components/build-exporter/BuildExporter"

//Actions
import { changeLevel } from "./store/character-reducer/character-reducer";

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      active: "stats",
    };
  }
  componentDidMount() {
    let charClass = document.getElementById("charClass");
    charClass.value = this.props.className;
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
        <div className="changeLevel">
          <div className="levelButtons">
            <LevelDecrementButton
              changeLevel={this.changeLevel}
              level={this.props.level}
              value={-5}
            />{" "}
            <LevelDecrementButton
              changeLevel={this.changeLevel}
              level={this.props.level}
              value={-1}
            />{" "}
          </div>{" "}
          <div className="level"> Poziom: {this.props.level} </div>{" "}
          <div className="levelButtons">
            <LevelIncrementButton
              changeLevel={this.changeLevel}
              level={this.props.level}
              value={1}
            />{" "}
            <LevelIncrementButton
              changeLevel={this.changeLevel}
              level={this.props.level}
              value={5}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="tabs">
          <button
            style={this.state.active === "stats" ? active : inactive}
            onClick={() => this.changeTabs("stats")}
          >
            Statystyki i przedmioty{" "}
          </button>{" "}
          <button
            style={this.state.active === "skills" ? active : inactive}
            onClick={() => this.changeTabs("skills")}
          >
            Umiejętności{" "}
          </button>{" "}
        </div>{" "}
        <SkillsCalculator
          active={this.state.active}
        />{" "}
        <StatsCalculator
          active={this.state.active}
        />{" "}
        <BuildExporter />
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
