//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../store/store";

//Shared functionality
import { calculateOtherProperties } from "../../../../shared/calculate-other-properties";

//i18l
import { withTranslation } from "react-i18next";

function ConnectedRegenerationTooltip (props: PropTypes) {
  let regenRate = 0.05
  let otherProperties = calculateOtherProperties(props.equipment)
  if (props.stat === "mana" && otherProperties["Regeneracja many"]) {
    regenRate += otherProperties["Regeneracja many"] / 100
  } else if (otherProperties["Regeneracja kondycji"]) {
    regenRate += otherProperties["Regeneracja kondycji"] / 100
  }
  return (
    <div className="regenTooltip">
      Regeneracja {props.stat === "mana" ? "many" : "kondycji"}: {regenRate * 100}%<br />({Math.floor(regenRate * props.value)} punktów na rundę)
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    equipment: state.equipment,
  };
};

const connector = connect(mapStateToProps);

export const RegenerationTooltip = withTranslation()(connector(ConnectedRegenerationTooltip));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  stat: string
  value: number
  t(string: string): string;
}
