//React
import React from "react";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

function ConnectedHome(props: PropTypes) {
  const { t } = props;
  return (
    <div className="home">
      <div className="intro">
        <div className="homeLine">
        <img
          src={`images/screenshots/build calculator ${i18n.language}.png`}
          alt="build calculator screenshot"
          className="screenshot"
        />
        <div className="homeDescription">
          <h2>{t("intro-header-7")}</h2>
          <p>{t("intro-desc-7")}</p>
          <p>{t("intro-desc-8")}</p>
          <p>{t("intro-desc-9")}</p>
        </div>
        </div>
        <div className="homeLine">
        <div className="homeDescription">
          <h2>{t("intro-header-6")}</h2>
          <p>{t("intro-desc-6")}</p>
        </div>
        <img
          src="images/screenshots/taern preview.jpg"
          alt="taern preview"
          className="screenshot"
        />
        </div>
      </div>
    </div>
  );
}

export const Home = withTranslation()(ConnectedHome);

interface PropTypes {
  t(string: string): string;
}
