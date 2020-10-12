import React from "react";

import { StatIncrementButton } from "./stat-buttons/StatIncrementButton";
import { StatDecrementButton } from "./stat-buttons/StatDecrementButton";

export function StatLine(props: Props) {
  let buttonValues = [-5, -1, 1, 5];
  let buttonElements = buttonValues.map((buttonValue) =>
    buttonValue < 0 ? (
      <StatDecrementButton
        spendStatPoints={props.spendStatPoints}
        stat={props.stat}
        statValue={props.value}
        value={buttonValue}
        key={props.stat + "Dec" + buttonValue}
      />
    ) : (
      <StatIncrementButton
        spendStatPoints={props.spendStatPoints}
        stat={props.stat}
        statValue={props.value}
        value={buttonValue}
        pointsLeft={props.pointsLeft}
        key={props.stat + "Inc" + buttonValue}
      />
    )
  );
  return (
    <div className={"statLine"}>
      <img
        src={"images/" + props.stat + ".svg"}
        alt={props.stat}
        className={props.stat}
      />
      <div className="statNameButtons">
        <div className="statName">
          {props.statName} {props.value} ({props.value + props.fromItems})
        </div>
        <div className="statButtons">{buttonElements}</div>
      </div>
    </div>
  );
}

interface Props {
  spendStatPoints(stat: string, value: number): void;
  stat: string;
  statName: string;
  value: number;
  pointsLeft: number;
  fromItems: number;
}
