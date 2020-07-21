//React
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

//Redux
import { Provider } from "react-redux";
import store from "./store/store.js";
import { initializeCharacter } from "./store/character-reducer/character-reducer.ts"

//Styles
import "./styles/index.scss";

//Other
import * as serviceWorker from "./serviceWorker";

//App-related
import { App } from "./App.jsx";
import { SkillSet } from "./data/models/skill-set.model.jsx";
import itemsDatabase from "./data/items.js";
import skillsDatabase from "./data/skills.jsx";
import { importBuild } from "./import-build/import-build.js";

//Starting GA tracking
ReactGA.initialize("UA-142836926-3");

//selecting calculator node
const calculator = document.getElementById("calc");
const taernDatabase = {
  items: itemsDatabase,
  skills: skillsDatabase,
};

//Adding event listener for the character form
document.getElementById("classLvl").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    checkCalc(event.target[0].value, event.target[1].value, taernDatabase);
  },
  false
);

store.dispatch(initializeCharacter({className: 123, level: "lalala"}))
console.log(store.getState())

//Checking if the calculator is already loaded and showing confirmation message
function checkCalc(charClass, charLvl, database) {
  if (calculator.classList.contains("enabled")) {
    if (
      window.confirm(
        "Czy na pewno chcesz stworzyć nowy build? Obecny zostanie usunięty!"
      )
    ) {
      renderApp(charClass, charLvl, database);
    }
  } else {
    renderApp(charClass, charLvl, database);
  }
}

//Rendering the app
function renderApp(charClass, charLvl, database) {
  ReactDOM.unmountComponentAtNode(calculator);
  calculator.classList.add("enabled");
  let skillSet = new SkillSet(charClass, database.skills);
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
      <App

        class={skillSet}

        items={database.items}
      />
    </Provider>,
    calculator
  );
}

//Rendering the app if URL parameters are present (importing build)
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
