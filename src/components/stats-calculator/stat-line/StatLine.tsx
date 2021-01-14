import React, { useState } from "react";

import { StatIncrementButton } from "./stat-buttons/StatIncrementButton";
import { StatDecrementButton } from "./stat-buttons/StatDecrementButton";
import { RegenerationTooltip } from "./regeneration-tooltip/RegenerationTooltip";

export function StatLine(props: Props) {
  const [tooltip, showTooltip] = useState(false);
  let buttonValues = [-10, -1, 1, 10];
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
          {props.statName} {props.value} ({props.value + props.fromItems}){" "}
          {props.stat === "mana" || props.stat === "endurance" ? (
            <div
              className="tooltipIcon"
              onMouseEnter={() => showTooltip(true)}
              onTouchStart={() => showTooltip(true)}
              onMouseLeave={() => showTooltip(false)}
              onTouchEnd={() => showTooltip(false)}
            >
              <img
                src="images/tooltip.svg"
                alt="tooltip"
                onContextMenu={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  return false;
                }}
              />
              {tooltip ? (
                <RegenerationTooltip
                  stat={props.stat}
                  value={props.value + props.fromItems}
                />
              ) : null}
            </div>
          ) : null}
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
