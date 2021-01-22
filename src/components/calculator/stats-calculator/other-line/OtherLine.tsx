import React from "react";

export function OtherLine(props: Props) {
  return (
    <div className={"statLine"}>
      <img
        src={"images/" + props.stat + ".svg"}
        alt={props.stat}
        className={props.stat}
      />
      <div className="statNameButtons">
        <div className="statName">
          {props.statName} {props.value}
        </div>
      </div>
    </div>
  );
}

interface Props {
  stat: string;
  statName: string;
  value: number;
}
