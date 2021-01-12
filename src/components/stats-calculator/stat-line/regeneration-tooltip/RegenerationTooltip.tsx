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
  let { t } = props
  let regenRate = 5
  let otherProperties = calculateOtherProperties(props.equipment)
  if (props.stat === "mana" && otherProperties["Regeneracja many"]) {
    regenRate += otherProperties["Regeneracja many"]
  } else if (otherProperties["Regeneracja kondycji"]) {
    regenRate += otherProperties["Regeneracja kondycji"]
  }
  return (
    <div className="regenTooltip">
      {t(props.stat === "mana" ? "Regeneracja many" : "Regeneracja kondycji")}: {regenRate}%<br />({Math.floor((regenRate / 100) * props.value)} {t("punktów na rundę")})
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
