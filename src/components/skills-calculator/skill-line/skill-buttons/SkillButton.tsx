import React from "react";

export function SkillButton(props: PropTypes) {
    return (
      <button
        className={"inlineButton"}
        disabled={props.active}
        onClick={() => {
          props.spendSkillPoints(
            props.skillLevel,
            props.skillLevel + props.value,
            props.number
          );
        }}
      >
        {props.value > 0 ? "+" : null}{props.value}
      </button>
    );
}

interface PropTypes {
  skillLevel: number;
  active: boolean
  spendSkillPoints(prevLvl: number, newLvl: number, skill: number): void;
  number: number;
  value: number
}
