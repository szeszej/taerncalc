import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import "./styles/index.scss";

import * as serviceWorker from "./serviceWorker";

import { Calculator } from "./App.jsx";
import { SkillSet } from "./data/models/skill-set.model.js";
import { taernDatabase } from "./data/skills-items.jsx";
import { importBuild } from "./import-build/import-build.js";

ReactGA.initialize("UA-142836926-3");

const calculator = document.getElementById("calc");

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
    <Calculator
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
    document.getElementById("cookieButton").addEventListener(
      "click",
      function (event) {
        document.getElementById("cookieconsent").style.display = "none";
        localStorage.setItem("cookieconsent", true);
      },
      false
    );
  } else {
    document.getElementById("cookieconsent").style.display = "none";
  }

  let initialProperties = importBuild(taernDatabase);
  if (initialProperties) {
    calculator.classList.add("enabled");
    ReactDOM.render(
      <Calculator
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
