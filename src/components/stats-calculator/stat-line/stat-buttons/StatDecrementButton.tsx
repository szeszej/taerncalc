import React from "react";

export function StatDecrementButton(props: Props) {
  if (["strength", "agility", "power", "knowledge"].includes(props.stat)) {
    return (
      <button
        onClick={() => {
          props.spendStatPoints(props.stat, props.value);
        }}
        disabled={props.statValue === 10 || props.statValue + props.value < 10}
      >
        -{-props.value}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          props.spendStatPoints(props.stat, props.value);
        }}
        disabled={
          props.statValue === 200 || props.statValue + props.value * 10 < 200
        }
      >
        -{-props.value * 10}
      </button>
    );
  }
}

interface Props {
  stat: string;
  statValue: number;
  value: number;
  spendStatPoints(stat: string, value: number): void;
}
