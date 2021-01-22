//React
import React from "react";
import ReactGA from "react-ga";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

//Router
import { Redirect, Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

//URL params
import { getUrlVars } from "../../import-build/import-build";

function ConnectedNavbar(props: Props) {
  let urlParams = getUrlVars(window.location.href).hasOwnProperty("id")
    ? "/?id=" + getUrlVars(window.location.href).id
    : "";
  return (
    <div className="navbar">
      {" "}
      <div className="languages">
        <Link to={"/pl" + urlParams}>
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
            title="Polski"
          ></button>
        </Link>
        <Link to={"/en" + urlParams}>
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
            title="English"
          ></button>
        </Link>
        {i18n.language === "en" && props.location.pathname !== "/en" ? (
          <Redirect to={"/en" + urlParams} />
        ) : i18n.language === "pl" && props.location.pathname !== "/pl" ? (
          <Redirect to={"/pl" + urlParams} />
        ) : null}
      </div>
    </div>
  );
}

export const Navbar = withRouter(withTranslation()(ConnectedNavbar));

type Props = { t(string: string): string } & RouteComponentProps;
