//React
import React from "react";

//i18l
import { withTranslation } from "react-i18next";

function ConnectedError(props: PropTypes) {
  const { t } = props;
  return (
    <div className="home">
      <div className="intro">
        <h2>404!!!</h2>
      </div>
    </div>
  );
}

export const Error = withTranslation()(ConnectedError);

interface PropTypes {
  t(string: string): string;
}
