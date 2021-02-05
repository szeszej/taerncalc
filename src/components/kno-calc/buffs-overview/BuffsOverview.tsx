//React
import React from "react";

//Components
import { BuffLine } from "./buff-line/BuffLine";

//types:
import { Skill } from "../../../data/models/skill.model"

//i18l
import { withTranslation } from "react-i18next";

class ConnectedBuffsOverview extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      tooltipToShow: ""
    }
    this.showTooltip = this.showTooltip.bind(this)
  }
  showTooltip(skillName: string): void {
    this.setState({tooltipToShow: skillName})
  }
  render() {
    const { t } = this.props;
    let buffComponents = this.props.skillSet.map((skill, index) => (
      <BuffLine
        key={skill.name}
        skillIndex={index}
        level={this.props.level}
        skill={skill}
        t={t}
        showTooltip={this.showTooltip}
        expanded={this.state.tooltipToShow}
        changeSkillLevel={this.props.changeSkillLevel}
      />
    ));
    return (
      <div
        className="skillCalculator buffCalculator"
      >
        <div className="skills">
          <div className="classSkills buffs">
            <div className="buffsHeader">
              <p>{t("buff-desc")}</p>
            </div>
            {buffComponents}
          </div>
        </div>
      </div>
    );
  }
}

interface PropTypes {
  level: number
  skillSet: Skill[]
  t(string: string): string;
  changeSkillLevel(skillNumber: number, value: number): void
}

interface StateTypes {
  tooltipToShow: string
}

export const BuffsOverview = withTranslation()((ConnectedBuffsOverview));
