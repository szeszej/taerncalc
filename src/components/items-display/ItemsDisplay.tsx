//React
import React from "react";


//Components
import { ItemsTable } from "./items-table/ItemsTable";

//Helmet
import { Helmet } from "react-helmet";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

class ConnectedItemsDisplay extends React.Component<PropTypes> {
  render() {
    const { t } = this.props;
    return (
      <div className="itemsDisplay">
      <Helmet>
        <title>{t("page-title-calc")}</title>
        <meta name="description" content={t("meta-description-calc")} />
        <link rel="canonical" href={`https://toolbox.taern.com/${i18n.language}/calc`} />
        <meta property="og:title" content={t("page-title-calc")} />
        <meta property="og:url" content={`https://toolbox.taern.com/${i18n.language}/calc`} />
        <meta
          property="og:description"
          content={t("meta-description-calc")}
        />
      </Helmet>
        <div id="calc">
          <h1>{t("items-display")}</h1>
          <div className="intro"><p>Intro</p></div>
        </div>
        <ItemsTable />
      </div>
    );
  }
}

export default withTranslation()(ConnectedItemsDisplay);

interface PropTypes {
  t(string: string): string;
}
