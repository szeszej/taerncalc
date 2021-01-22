//React
import React, { Suspense } from "react";

//Components
import { LoadingMessage } from "./components/shared/LoadingMessage";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./components/home/Home";
import { Error } from "./components/error/Error";

//Router
import { Switch, Route, Redirect } from "react-router-dom";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

//Helmet
import { Helmet } from "react-helmet";

//URL params
import { getUrlVars } from "./import-build/import-build";

//Lazy loading
const Calculator = React.lazy(() =>
  import("./components/calculator/Calculator")
);

export class ConnectedApp extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      cookieConsent: false,
    };
  }
  render() {
    const { t } = this.props;
    let urlParams = getUrlVars(window.location.href).hasOwnProperty("id")
      ? "?id=" + getUrlVars(window.location.href).id
      : "";
    return (
      <div className="wrapper">
        <Helmet>
          <title>{t("page-title")}</title>
          <meta name="description" content={t("meta-description")} />
        </Helmet>
        <div className="header">
          <div className="logo">
            <img src="images/logo.png" alt="Pride of Taern" />
          </div>
          <div className="title">
            <h1>{t("h1")}</h1>
          </div>
        </div>
        <div className="leftSidebar"></div>
        <Navbar />
        <Suspense fallback={<LoadingMessage />}>
          <Switch>
            <Route exact path={`/${i18n.language}/calc`}>
              <Calculator isBuildImported={this.props.isBuildImported} />
            </Route>
            <Route path={`/${i18n.language}/404`}>
              <Error />
            </Route>
            <Route exact path={`/${i18n.language}`}>
              <Home />
            </Route>
            <Route exact path={"/"}>
              <Redirect to={`/${i18n.language + urlParams}`} />
            </Route>
            <Route path="*">
              <Redirect to={`/${i18n.language}/404`} />
            </Route>
          </Switch>
        </Suspense>
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
