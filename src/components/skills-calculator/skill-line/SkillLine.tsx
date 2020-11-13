//React
import React from "react";

//Components
import { SkillButton } from "./skill-buttons/SkillButton";

//Types
import { Skill } from "../../../data/models/skill.model";

export function SkillLine(props: PropTypes) {
  let notMeetingRequirements = {
    color: "red",
  };
  return (
    <div className="skillLine">
      <div className="image">
        <img src={props.skill.image} alt={props.skill.name} />
      </div>
      <div className="skillName">
        <p>{props.skill.name}</p>
      </div>
      <div className="skillValue">
        <p>{props.skill.level}</p>
      </div>
      {props.skill.level === props.skill.maxLvl ? (
        <div className="reqLvl">
          <p>Maks. poziom osiągnięty</p>
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
            <p>Poz. wym. do awansu:</p>
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
    </div>
  );
}

interface PropTypes {
  level: number;
  skill: Skill;
  checkIfSkillCanIncrease(newLvl: number): boolean;
  spendSkillPoints(prevLvl: number, newLvl: number, skill: number): void;
  number: number;
}
