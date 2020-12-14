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
import { ImportedBuild } from "./import-build/import-build"

//Other
import * as serviceWorker from "./serviceWorker";

//Components
import { App } from "./App";
import { Alert } from "./components/shared/Alert";
import { Intro } from "./components/Intro"

//Build import related
import {
  importBuildFromDatabase,
  getUrlVars,
} from "./import-build/import-build";

//Starting GA tracking
ReactGA.initialize("UA-142836926-3");

//selecting calculator node
const calculator = document.getElementById("calculator")!;

(function () {
  //Checking for cookie consent
  if (!localStorage.getItem("cookieconsent")) {
    document.getElementById("cookieconsent")!.style.display = "block";
    document.getElementById("cookieButton")!.addEventListener(
      "click",
      function () {
        document.getElementById("cookieconsent")!.style.display = "none";
        localStorage.setItem("cookieconsent", "true");
      },
      false
    );
  }
  //Rendering the app if URL parameters are present (importing build)
  let urlVars = getUrlVars(window.location.href);
  if (urlVars.hasOwnProperty("id")) {
    const alert = document.getElementById("alert")!;
    ReactDOM.render(
      <Intro />,
      calculator
    );
    ReactDOM.render(
      <Alert message="Importowanie buildu..." spinner={true} />,
      alert
    );
    let loadBuildFromDatabase = new Promise<ImportedBuild>((resolve, reject) => {
      let request = require("request");
      request(
        {
          uri:
            "https://taencalc.firebaseio.com/builds/-" + urlVars.id + ".json",
          method: "GET",
        },
        (err: string, response: string, body: string) => {
          console.log(JSON.parse(body));
          let importedBuild: ImportedBuild = JSON.parse(body)
          if (importedBuild === null) {
            reject();
          } else {
            resolve(importedBuild);
          }
        }
      );
    });
    loadBuildFromDatabase
      .then((response) => {
        //Letting GA know a build was imported
        ReactGA.event({
          category: "Import",
          action: "Build Imported",
          label: window.location.href,
        });
        let request = require("request");
        let urlVars = getUrlVars(window.location.href);
        request(
          {
            uri: "https://taencalc.firebaseio.com/builds/-" + urlVars.id + "/lastAccess.json",
            method: "PUT",
            body: JSON.stringify(new Date())
          },
          (err: string, response: string, body: string) => {
            console.log(err, JSON.parse(body));
          })
        let initialProperties = importBuildFromDatabase(
          response
        );
        ReactDOM.unmountComponentAtNode(alert);
        calculator.classList.add("enabled");
        store.dispatch(importCharacter(initialProperties));
        ReactDOM.render(
          <Provider store={store}>
            <App isBuildImported={true}/>
          </Provider>,
          calculator
        );
      })
      .catch(() => {
        ReactDOM.unmountComponentAtNode(alert);
        ReactDOM.render(
          <Alert
            message="Importowanie nie powiodło się. Spróbuj ponownie później"
            spinner={false}
          />,
          alert
        );
      });
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <App isBuildImported={false}/>
      </Provider>,
      calculator
    );
  }
})();

serviceWorker.unregister();
