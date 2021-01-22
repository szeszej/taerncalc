//React
import React from "react";
import ReactGA from "react-ga";

//i18l
import { withTranslation } from "react-i18next";
import i18n from "i18next";

//Router
import { Redirect, Link, NavLink, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

//URL params
import { getUrlVars } from "../../import-build/import-build";

function ConnectedNavbar(props: Props) {
  let urlParams = getUrlVars(window.location.href).hasOwnProperty("id")
    ? "?id=" + getUrlVars(window.location.href).id
    : "";
  return (
    <div className="navbar">
      <nav className="navigation">
      <ul>
        <NavLink to={"/" + i18n.language}>
          <li>{props.t("home")}</li>
        </NavLink>
        <NavLink to={"/" + i18n.language + "/calc" + urlParams}>
          <li>{props.t("calc")}</li>
        </NavLink>
      </ul>
      </nav>
      <div className="languages">
        <Link to={"/pl" + props.location.pathname.substring(3) + urlParams}>
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
        <Link to={"/en" + props.location.pathname.substring(3) + urlParams}>
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
        {urlParams ? <Redirect to={`/${i18n.language}/calc${urlParams}`} /> : !props.location.pathname.includes("/en") && !props.location.pathname.includes("/pl") ? <Redirect to={"/" + i18n.language + props.location.pathname} /> :
          i18n.language === "en" && !props.location.pathname.includes("/en") ? (
          <Redirect to={"/" + i18n.language + props.location.pathname.substring(3)} />
        ) : i18n.language === "pl" && !props.location.pathname.includes("/pl") ? (
          <Redirect to={"/" + i18n.language + props.location.pathname.substring(3)} />
        ) : null}
      </div>
    </div>
  );
}

export const Navbar = withRouter(withTranslation()(ConnectedNavbar));

type Props = { t(string: string): string } & RouteComponentProps;
