//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "./store/store";

//Components
import { Intro } from "./components/Intro";
import { Calculator } from "./components/Calculator";

//Shared functionality
import { confirmNewBuildCreation } from "./shared/new-build-confirmation";

//Actions
import { initializeCharacter } from "./store/character-reducer/character-reducer";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

// //Router
// import { Redirect, Link, withRouter } from "react-router-dom";
// import { RouteComponentProps } from "react-router";

//Helmet
import { Helmet } from "react-helmet";

// //URL params
// import { getUrlVars } from "./import-build/import-build";

export class ConnectedApp extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      charClass: "",
      charLevel: "",
      isCalculatorGenerated: false,
      cookieConsent: false,
    };
    this.generateCalculator = this.generateCalculator.bind(this);
  }
  componentDidMount() {
    if (this.props.isBuildImported) {
      this.setState({
        charClass: this.props.className,
        charLevel: this.props.level.toString(),
        isCalculatorGenerated: true,
      });
    }
  }
  componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.level !== this.props.level) {
      this.setState({
        charLevel: this.props.level.toString(),
      });
    }
  }
  generateCalculator(): void {
    ReactGA.event({
      category: "Form",
      action: "Submit",
      label: this.state.charClass + " " + this.state.charLevel,
    });
    this.props.initializeCharacter(this.state.charClass, +this.state.charLevel);
    this.setState({ isCalculatorGenerated: true });
  }
  render() {
    const { t } = this.props;
    // let urlParams = getUrlVars(window.location.href).hasOwnProperty("id")
    //   ? "/?id=" + getUrlVars(window.location.href).id
    //   : "";
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
          <Helmet>
            <title>{t("page-title")}</title>
            <meta name="description" content={t("meta-description")} />
          </Helmet>
          <div className="languages">
            {/* <Link to={"" + urlParams}> */}
              <button
                id="pl"
                onClick={() => {
                  i18n.changeLanguage("pl");
                  ReactGA.event({
                    category: "Language",
                    action: "Change",
                    label: "pl",
                  });
                }}
              ></button>
            {/* </Link> */}
            {/* <Link to={"/en" + urlParams}> */}
              <button
                id="en"
                onClick={() => {
                  i18n.changeLanguage("en");
                  ReactGA.event({
                    category: "Language",
                    action: "Change",
                    label: "en",
                  });
                }}
              ></button>
            {/* </Link> */}
            {/* {i18n.language === "en" &&
            this.props.location.pathname !== "/en" ? (
              <Redirect to={"/en" + urlParams} />
            ) : i18n.language === "pl" &&
              this.props.location.pathname !== "/pl" ? (
              <Redirect to={"/pl" + urlParams} />
            ) : null} */}
          </div>
          <div id="classLvlWrapper">
            <form
              id="classLvl"
              onSubmit={(event) => {
                event.preventDefault();
                if (this.state.isCalculatorGenerated) {
                  confirmNewBuildCreation(this.generateCalculator);
                } else {
                  this.generateCalculator();
                }
              }}
            >
              <select
                id="charClass"
                required
                onChange={(event) =>
                  this.setState({ charClass: event.currentTarget.value })
                }
                value={this.state.charClass}
              >
                <option
                  disabled
                  value={""}
                  className="placeholder"
                >
                  {t("Wybierz klasę")}
                </option>
                <option value="barbarian">{t("Barbarzyńca")}</option>
                <option value="knight">{t("Rycerz")}</option>
                <option value="sheed">{t("Sheed")}</option>
                <option value="druid">{t("Druid")}</option>
                <option value="firemage">{t("Mag Ognia")}</option>
                <option value="archer">{t("Łucznik")}</option>
                <option value="voodoo">{t("VooDoo")}</option>
              </select>
              <input
                type="number"
                min="1"
                max="140"
                placeholder={t("Poziom postaci")}
                id="charLvl"
                value={this.state.charLevel}
                required
                onChange={(event) =>
                  this.setState({ charLevel: event.currentTarget.value })
                }
              />
              <input className="submit" type="submit" value={t("Zatwierdź")} />
            </form>
          </div>
          <div id="calc">
            {this.state.isCalculatorGenerated ? <Calculator /> : <Intro />}
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
                href="https://forum.taern.pl/viewtopic.php?f=279&t=56507"
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

const mapStateToProps = (state: RootState) => {
  return {
    level: state.character.level,
    className: state.character.className,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initializeCharacter: (className: string, level: number) =>
      dispatch(initializeCharacter({ className: className, level: level })),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const App = withTranslation()(connector(ConnectedApp));

//Types
type PropTypes = ConnectedProps<typeof connector> &
  OwnProps;

interface StateTypes {
  charClass: string;
  charLevel: string;
  isCalculatorGenerated: boolean;
  cookieConsent: boolean;
}

interface OwnProps {
  isBuildImported: boolean;
  t(string: string): string;
}
