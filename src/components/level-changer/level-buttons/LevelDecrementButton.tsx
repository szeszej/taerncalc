import React from "react";

export function LevelDecrementButton(props: PropTypes) {
    return (
      <button
        disabled={props.level + props.value < 1 ? true : false}
        onClick={() => {
          props.changeLevel(props.value);
        }}
      >
        {props.value}{" "}
      </button>
    );
}

interface PropTypes {
  level: number
  value: number
  changeLevel: (value: number) => void
}
