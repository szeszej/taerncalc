//React
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

//Redux
import { Provider } from "react-redux";
import store from "./store/store";
import { importCharacter } from "./store/character-reducer/character-reducer";

//Styles
import "./styles/index.scss";

//Types
import { ImportedBuild } from "./import-build/import-build";

//Other
import * as serviceWorker from "./serviceWorker";

//Components
import { App } from "./App";
import { Alert } from "./components/shared/Alert";

//Build import related
import {
  importBuildFromDatabase,
  getUrlVars,
} from "./import-build/import-build";

//i18n
import "./i18n/i18n";
import i18n from "i18next";

//Router
import { BrowserRouter as Router } from "react-router-dom";

//Starting GA tracking
ReactGA.initialize("UA-142836926-4");
ReactGA.pageview(window.location.pathname + window.location.search);

(function () {
  //Rendering the app if URL parameters are present (importing build)
  let urlVars = getUrlVars(window.location.href);
  if (urlVars.hasOwnProperty("id")) {
    const alert = document.getElementById("alert")!;
    const root = document.getElementById("root");
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App isBuildImported={false} />
        </Router>
      </Provider>,
      root
    );
    ReactDOM.render(
      <Alert message={i18n.t("importing-build")} spinner={true} />,
      alert
    );
    let loadBuildFromDatabase = new Promise<ImportedBuild>(
      (resolve, reject) => {
        let request = require("request");
        request(
          {
            uri:
              "https://taencalc.firebaseio.com/builds/-" + urlVars.id + ".json",
            method: "GET",
          },
          (err: string, response: string, body: string) => {
            console.log(JSON.parse(body));
            let importedBuild: ImportedBuild = JSON.parse(body);
            if (importedBuild === null) {
              reject();
            } else {
              resolve(importedBuild);
            }
          }
        );
      }
    );
    loadBuildFromDatabase
      .then((response) => {
        //Letting GA know a build was imported
        ReactGA.event({
          category: "Import",
          action: "Build Imported",
          label: window.location.href,
        });
        ReactGA.event({
          category: "Language",
          action: "Page Load",
          label: i18n.language,
        });
        let request = require("request");
        let urlVars = getUrlVars(window.location.href);
        request(
          {
            uri:
              "https://taencalc.firebaseio.com/builds/-" +
              urlVars.id +
              "/lastAccess.json",
            method: "PUT",
            body: JSON.stringify(new Date()),
          },
          (err: string, response: string, body: string) => {
            console.log(err, JSON.parse(body));
          }
        );
        let initialProperties = importBuildFromDatabase(response);
        ReactDOM.unmountComponentAtNode(alert);
        ReactDOM.unmountComponentAtNode(root!);
        store.dispatch(importCharacter(initialProperties));
        ReactDOM.render(
          <Provider store={store}>
            <Router>
              <App isBuildImported={true} />
            </Router>
          </Provider>,
          root
        );
      })
      .catch(() => {
        ReactDOM.unmountComponentAtNode(alert);
        ReactGA.event({
          category: "Language",
          action: "Page Load",
          label: i18n.language,
        });
        ReactDOM.render(
          <Alert message={i18n.t("import-failed")} spinner={false} />,
          alert
        );
        ReactDOM.render(
          <Provider store={store}>
            <Router>
              <App isBuildImported={false} />
            </Router>
          </Provider>,
          root
        );
      });
  } else {
    ReactGA.event({
      category: "Language",
      action: "Page Load",
      label: i18n.language,
    });
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App isBuildImported={false} />
        </Router>
      </Provider>,
      document.getElementById("root")
    );
  }
})();

serviceWorker.unregister();
