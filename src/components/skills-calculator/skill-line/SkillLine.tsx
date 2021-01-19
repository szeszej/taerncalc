//React
import React from "react";
import { Transition } from "react-transition-group";

//Components
import { SkillButton } from "./skill-buttons/SkillButton";
import { SkillTooltip } from "./skill-tooltip/SkillTooltip";

//Types
import { Skill } from "../../../data/models/skill.model";

export function SkillLine(props: PropTypes) {
  let notMeetingRequirements = {
    color: "red",
  };
  const { t } = props;
  const transitionStyles: { [id: string]: React.CSSProperties } = {
    entering: { transform: "scaleY(-1)" },
    entered: { transform: "scaleY(-1)" },
    exiting: { transform: "scaleY(1)"},
    exited: { transform: "scaleY(1)" },
  };
  return (
    <div className="skillLine">
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
      ) : (
        <div
          className="reqLvl"
          style={
            props.skill.requiredCharLevel > props.level
              ? notMeetingRequirements
              : undefined
          }
        >
          <div className="reqLvlText">
            <p>{t("req-lvl-upgrade-skill")}:</p>
          </div>
          <div className="reqLvlNumber">
            <p>{props.skill.requiredCharLevel}</p>
          </div>
        </div>
      )}
      <div className="skillButtons">
        <div className="minusButton">
          <SkillButton
            spendSkillPoints={props.spendSkillPoints}
            skillLevel={props.skill.level}
            value={-1}
            number={props.number}
            active={props.skill.level === props.skill.minLvl}
          />
        </div>
        <div className="plusButton">
          <SkillButton
            spendSkillPoints={props.spendSkillPoints}
            skillLevel={props.skill.level}
            value={1}
            number={props.number}
            active={
              props.skill.level === props.skill.maxLvl ||
              props.skill.requiredCharLevel > props.level ||
              !props.checkIfSkillCanIncrease(props.skill.level + 1)
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
          <SkillTooltip
            skill={props.skill}
            state={state}
          />
        )}
      </Transition>
    </div>
  );
}
// {props.expanded === props.skill.name ? (
//   <img src="images/arrup.png" alt="expand" />
// ) : (
//   <img src="images/arrdown.png" alt="expand" />
// )}

interface PropTypes {
  level: number;
  skill: Skill;
  checkIfSkillCanIncrease(newLvl: number): boolean;
  spendSkillPoints(prevLvl: number, newLvl: number, skill: number): void;
  number: number;
  t(string: string): string;
  showTooltip(skillName: string): void;
  expanded: string;
}
