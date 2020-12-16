//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store";
import { Dispatch } from "redux";

//Components
import { SkillsCalculator } from "./skills-calculator/SkillsCalculator";
import { StatsCalculator } from "./stats-calculator/StatsCalculator";
import { LevelChanger } from "./level-changer/LevelChanger";
import { BuildExporter } from "./build-exporter/BuildExporter";

//Actions
import { changeLevel } from "../store/character-reducer/character-reducer";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedCalculator extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
    this.state = {
      active: "stats",
    };
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
        <LevelChanger level={this.props.level} changeLevel={this.changeLevel} t={this.props.t} />
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

export const Calculator = withTranslation()(connector(ConnectedCalculator));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface StateTypes {
  active: "stats" | "skills";
}

interface OwnProps {
  t(string: string): string;
}
