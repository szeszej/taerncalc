//React
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

//Redux
import { Provider } from "react-redux";
import store from "./store/store";
import { initializeCharacter } from "./store/character-reducer/character-reducer.ts"
import { importCharacter } from "./store/character-reducer/character-reducer.ts"

//Styles
import "./styles/index.scss";

//Other
import * as serviceWorker from "./serviceWorker";

//App-related
import { App } from "./App.jsx";
import { importBuild } from "./import-build/import-build";

//Import-related
import itemsDatabase from "./data/items.js";
import skillsDatabase from "./data/skills.jsx";

const taernDatabase = {
  items: itemsDatabase,
  skills: skillsDatabase,
};


//Starting GA tracking
ReactGA.initialize("UA-142836926-3");

//selecting calculator node
const calculator = document.getElementById("calc");


//Adding event listener for the character form
document.getElementById("classLvl").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    checkCalc(event.target[0].value, event.target[1].value);
  },
  false
);

//Checking if the calculator is already loaded and showing confirmation message
function checkCalc(charClass, charLvl) {
  if (calculator.classList.contains("enabled")) {
    if (
      window.confirm(
        "Czy na pewno chcesz stworzyć nowy build? Obecny zostanie usunięty!"
      )
    ) {
      renderApp(charClass, charLvl);
    }
  } else {
    renderApp(charClass, charLvl);
  }
}

//Rendering the app
function renderApp(charClass, charLvl) {
  ReactDOM.unmountComponentAtNode(calculator);
  calculator.classList.add("enabled");
  ReactGA.event({
    category: "Form",
    action: "Submit",
    label: charClass + " " + charLvl,
  });
  store.dispatch(initializeCharacter({
    className: charClass,
    level: +charLvl
  }))
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
    document.getElementById("cookieconsent").style.display = "block";
    document.getElementById("cookieButton").addEventListener(
      "click",
      function (event) {
        document.getElementById("cookieconsent").style.display = "none";
        localStorage.setItem("cookieconsent", true);
      },
      false
    );
  }
  //Rendering the app if URL parameters are present (importing build)
  let initialProperties = importBuild(taernDatabase);
  if (initialProperties) {
    calculator.classList.add("enabled");
    store.dispatch(importCharacter(initialProperties))
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      calculator
    );
  }
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
