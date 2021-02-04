//React
import React from "react";

//components
import { Intro } from "./components/calculator/intro/Intro"

//i18l
import { withTranslation } from "react-i18next";


export class ConnectedApp extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      cookieConsent: false,
    };
  }
  render() {
    const { t } = this.props;
    console.log(this.props);

    return (
      <div className="wrapper">
        <div className="header">
          <div className="logo">
            <img src="images/logo.png" alt="Pride of Taern" />
          </div>
          <div className="title">
            <h1>{t("h1")}</h1>
          </div>
        </div>
        <div className="leftSidebar"></div>
        <div className="calculator">
        <div id="calc">
        <Intro />
        </div>
        </div>
        <div className="rightSidebar"></div>
        <div className="footer">
          <div className="authors">
            <p className="created">
              {t("created")}{" "}
              <a
                href="https://github.com/szeszej/"
                target="_blank"
                rel="noopener noreferrer"
              >
                szeszej
              </a>
              .
            </p>
            <p className="created">
              {t("suggestions")}{" "}
              <a
                href={t("suggestion-target-link")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("suggestions-target")}
              </a>
              .
            </p>
            <p className="created">{t("disclaimer")}</p>
            <p>
              {t("disclaimer-2")}{" "}
              <a
                href="https://game-icons.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Game-icons.net
              </a>
              .
            </p>
          </div>
        </div>
        {!localStorage.getItem("cookieconsent") && !this.state.cookieConsent ? (
          <div id="cookieconsent">
            {t("cookies")}
            <button
              id="cookieButton"
              onClick={() => {
                localStorage.setItem("cookieconsent", "true");
                this.setState({ cookieConsent: true });
              }}
            >
              {t("cookies-confirm")}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export const App = withTranslation()(ConnectedApp);

//Types
type PropTypes = OwnProps;

interface StateTypes {
  cookieConsent: boolean;
}

interface OwnProps {
  isBuildImported: boolean;
  t(string: string): string;
}
