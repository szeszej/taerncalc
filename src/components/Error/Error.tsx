//React
import React from "react";
import { Link } from "react-router-dom";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

function ConnectedError(props: PropTypes) {
  const { t } = props;
  return (
    <div className="error">
      <div className="intro">
        <h2>{t("error")}</h2>
        <p>{t("error-desc")}</p>
        <div className="toolList">
          <Link to={`/${i18n.language}/calc`}>
            <div className="tool">
              <img src="images/calculator.svg" alt="calculator" />
              <p>{t("calc")}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Error = withTranslation()(ConnectedError);

interface PropTypes {
  t(string: string): string;
}
