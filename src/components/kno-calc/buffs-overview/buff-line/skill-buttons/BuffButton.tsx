import React from "react";

export function BuffButton(props: PropTypes) {
    return (
      <button
        className={"inlineButton"}
        disabled={props.active}
        onClick={() => {
          props.changeSkillLevel(
            props.number, props.value
          );
        }}
      >
        {props.value > 0 ? "+" : null}{props.value}
      </button>
    );
}

interface PropTypes {
  active: boolean
  changeSkillLevel(skillNumber: number, value: number): void
  number: number;
  value: number
}
