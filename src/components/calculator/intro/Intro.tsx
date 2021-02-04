//React
import React from 'react';

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

//import Link
import { getUrlVars } from "../../../import-build/import-build"

//Helmet
import { Helmet } from "react-helmet";

function ConnectedIntro (props: PropTypes) {
  const { t } = props;
  let id = getUrlVars(window.location.href).id ? "?id=" + getUrlVars(window.location.href).id : ""
  return (
    <div className="intro">
    <Helmet>
      <title>{t("page-title")}</title>
      <meta name="description" content={t("meta-description")} />
      <meta http-equiv="refresh" content={"5; URL=" + "https://toolbox.taern.com/" + i18n.language + "/calc" + id} />
    </Helmet>
      <h2>{t("page-moved")}</h2>
      <a
        href={"https://toolbox.taern.com/" + i18n.language + "/calc" + id}
        target="_blank"
      >
        {"https://toolbox.taern.com/" + i18n.language + "/calc" + id}
      </a>
    </div>
  )
}

export const Intro = withTranslation()(ConnectedIntro)

interface PropTypes {
  t(string: string): string;
}
