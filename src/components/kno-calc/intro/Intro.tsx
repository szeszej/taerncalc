//React
import React from 'react';

//i18l
import { withTranslation } from "react-i18next";

function ConnectedIntro (props: PropTypes) {
  const { t } = props
  return (
    <div className="intro">
    <h1>{t("know-calc")}</h1>
      <h2>{t("intro-header-1")}</h2>
      <p>{t("intro-desc-1")}</p>
      <h2>{t("intro-header-2")}</h2>
      <p>{t("intro-desc-2")}</p>
      <h2>{t("intro-header-3")}</h2>
      <p>{t("intro-desc-3-1")}</p>
      <ol>
        <li>{t("intro-desc-3-bullet-1")}</li>
        <li>{t("intro-desc-3-bullet-2")}</li>
        <li>{t("intro-desc-3-bullet-3")}</li>
      </ol>
      <p>
        {t("intro-desc-3-2")}
      </p>
      <h2>{t("intro-header-4")}</h2>
      <p>{t("intro-desc-4-1")} (<img className="imageInText" src="images/upgrade.png" alt="upgrade" />). {t("intro-desc-4-2")}</p>
      <h2>{t("intro-header-5")} (<img className="imageInText" src="images/star.svg" alt="kowadło" />)?</h2>
      <p>{t("intro-desc-5")}</p>
    </div>
  )
}

export const Intro = withTranslation()(ConnectedIntro)

interface PropTypes {
  t(string: string): string;
}
