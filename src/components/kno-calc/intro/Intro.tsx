//React
import React from 'react';

//i18l
import { withTranslation } from "react-i18next";

function ConnectedIntro (props: PropTypes) {
  const { t } = props
  return (
    <div className="intro">
    <h1>{t("know-calc")}</h1>
      <h2>{t("intro-header-1-know")}</h2>
      <p>{t("intro-desc-1-know")}</p>
      <h2>{t("intro-header-3-know")}</h2>
      <p>{t("intro-desc-3-1")}</p>
      <ol>
        <li>{t("intro-desc-3-bullet-1")}</li>
        <li>{t("intro-desc-3-bullet-2")}</li>
        <li>{t("intro-desc-3-bullet-3")}</li>
      </ol>
      <p>
        {t("intro-desc-3-2-know")}
      </p>
    </div>
  )
}

export const Intro = withTranslation()(ConnectedIntro)

interface PropTypes {
  t(string: string): string;
}
