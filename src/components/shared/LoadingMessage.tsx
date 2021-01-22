//React
import React from "react";

//i18l
import { withTranslation } from "react-i18next";

function ConnectedLoadingMessage(props: Props) {
  return <div className="loadingCalc"><div className="loadingMsg">{props.t("loading")}</div><div className="spinner"></div></div>
}

export const LoadingMessage = withTranslation()(ConnectedLoadingMessage)

interface Props {
  t(string: string): string;
}
