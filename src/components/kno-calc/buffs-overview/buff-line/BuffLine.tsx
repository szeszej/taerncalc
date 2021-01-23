//React
import React from "react";
import { Transition } from "react-transition-group";

//Components
import { BuffButton } from "./skill-buttons/BuffButton";
import { BuffTooltip } from "./buff-tooltip/BuffTooltip";

//Types
import { Skill } from "../../../../data/models/skill.model";

export function BuffLine(props: PropTypes) {
  const { t } = props;
  const transitionStyles: { [id: string]: React.CSSProperties } = {
    entering: { transform: "scaleY(-1)" },
    entered: { transform: "scaleY(-1)" },
    exiting: { transform: "scaleY(1)"},
    exited: { transform: "scaleY(1)" },
  };
  return (
    <div className="skillLine buff">
      <div className="image">
        <img src={props.skill.image} alt={t(props.skill.name)} />
      </div>
      <div className="skillName">
        <p>{t(props.skill.name)}</p>
      </div>
      <div className="skillValue">
        <p>{props.skill.level}</p>
      </div>
      {props.skill.level === props.skill.maxLvl ? (
        <div className="reqLvl">
          <p>{t("max-skill-lvl-reached")}</p>
        </div>
      ) : null}
      <div className="skillButtons">
        <div className="minusButton">
          <BuffButton
            changeSkillLevel={props.changeSkillLevel}
            value={-1}
            number={props.skillIndex}
            active={props.skill.level === props.skill.minLvl}
          />
        </div>
        <div className="plusButton">
          <BuffButton
            changeSkillLevel={props.changeSkillLevel}
            value={1}
            number={props.skillIndex}
            active={
              props.skill.level === props.skill.maxLvl
            }
          />
        </div>
      </div>
      <div
        className="expand"
        onClick={() =>
          props.expanded === props.skill.name
            ? props.showTooltip("")
            : props.showTooltip(props.skill.name)
        }
      >
        <Transition in={props.expanded === props.skill.name}
        addEndListener={(node, done) => {}}>
          {(state) => <img src="images/arrdown.svg" alt="expand" style={transitionStyles[state]} />}
        </Transition>
      </div>
      <Transition
        in={props.expanded === props.skill.name}
        addEndListener={(node, done) => {}}
      >
        {(state) => (
          <BuffTooltip
            skill={props.skill}
            state={state}
            level={props.level}
          />
        )}
      </Transition>
    </div>
  );
}

interface PropTypes {
  level: number;
  skill: Skill;
  changeSkillLevel(skillNumber: number, value: number): void
  skillIndex: number;
  t(string: string): string;
  showTooltip(skillName: string): void;
  expanded: string;
}
