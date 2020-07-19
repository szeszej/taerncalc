import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "./styles/index.scss";

import * as serviceWorker from "./serviceWorker";

import { App } from "./App.jsx";
import { SkillSet } from "./data/models/skill-set.model.jsx";
import itemsDatabase from "./data/items.js";
import skillsDatabase from "./data/skills.jsx";
import { importBuild } from "./import-build/import-build.js";

import store from "./store/store.js"

ReactGA.initialize("UA-142836926-3");

const calculator = document.getElementById("calc");
const taernDatabase = {
  items: itemsDatabase,
  skills: skillsDatabase
}

document.getElementById("classLvl").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    checkCalc(event.target[0].value, event.target[1].value, taernDatabase);
  },
  false
);

function checkCalc(charClass, charLvl, database) {
  if (calculator.classList.contains("enabled")) {
    if (window.confirm("Czy na pewno chcesz stworzyć nowy build? Obecny zostanie usunięty!")) {
      renderApp(charClass, charLvl, database)
    }
  } else {
    renderApp(charClass, charLvl, database)
  }
}

function renderApp(charClass, charLvl, database) {
  ReactDOM.unmountComponentAtNode(calculator);
  calculator.classList.add("enabled");
  let skillSet = new SkillSet(charClass, database.skills);
  ReactGA.event({
    category: "Form",
    action: "Submit",
    label: charClass + " " + charLvl
  });
  ReactDOM.render(
    <App
      level={parseInt(charLvl)}
      class={skillSet}
      className={charClass}
      items={database.items}
    />,
    calculator
  );
}

(function () {
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

  let initialProperties = importBuild(taernDatabase);
  if (initialProperties) {
    calculator.classList.add("enabled");
    ReactDOM.render(
      <App
        level={initialProperties.level}
        class={initialProperties.skillSet}
        className={initialProperties.className}
        items={taernDatabase.items}
        initialStats={initialProperties.initialStats}
        initialEquipment={initialProperties.initialEquipment}
        initialSkills={initialProperties.initialSkills}
      />,
      calculator
    );
  }
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
