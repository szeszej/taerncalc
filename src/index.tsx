//React
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

//Redux
import { Provider } from "react-redux";
import store from "./store/store";
import { initializeCharacter } from "./store/character-reducer/character-reducer";
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

//Build import related
import {
  importBuildFromDatabase,
  getUrlVars,
} from "./import-build/import-build";

//Shared functionality
import { confirmNewBuildCreation } from "./shared/new-build-confirmation"

//Starting GA tracking
ReactGA.initialize("UA-142836926-3");

//selecting calculator node
const calculator = document.getElementById("calc")!;

//Adding event listener for the character form
document.getElementById("classLvl")!.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    checkCalc((document.getElementById("charClass") as HTMLSelectElement)!.value, +(document.getElementById("charLvl") as HTMLInputElement)!.value);
  },
  false
);

//Checking if the calculator is already loaded and showing confirmation message
function checkCalc(charClass: string, charLvl: number) {
  if (calculator.classList.contains("enabled")) {
    confirmNewBuildCreation({
      renderApp: renderApp,
      charClass: charClass,
      charLvl: charLvl
    })
  } else {
    renderApp(charClass, charLvl);
  }
}

//Rendering the app
function renderApp(charClass: string, charLvl: number) {
  ReactDOM.unmountComponentAtNode(calculator);
  calculator.classList.add("enabled");
  ReactGA.event({
    category: "Form",
    action: "Submit",
    label: charClass + " " + charLvl,
  });
  store.dispatch(
    initializeCharacter({
      className: charClass,
      level: charLvl,
    })
  );
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    calculator
  );
}

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
            <App />
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
  }
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
