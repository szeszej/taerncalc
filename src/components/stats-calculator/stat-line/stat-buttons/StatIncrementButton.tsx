import React from "react";

export function StatIncrementButton(props: Props) {
  if (["strength", "agility", "power", "knowledge"].includes(props.stat)) {
    return (
      <button
        disabled={props.pointsLeft < props.value}
        onClick={() => {
          props.spendStatPoints(props.stat, props.value);
        }}
      >
        +{props.value}
      </button>
    );
  } else {
    return (
      <button
        disabled={props.pointsLeft < props.value}
        onClick={() => {
          props.spendStatPoints(props.stat, props.value);
        }}
      >
        +{props.value * 10}
      </button>
    );
  }
}

interface Props {
  stat: string;
  statValue: number;
  value: number;
  spendStatPoints(stat: string, value: number): void;
  pointsLeft: number;
}
