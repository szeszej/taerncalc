//React
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

//Styles
import "./styles/index.scss";

//Other
import * as serviceWorker from "./serviceWorker";

//i18n
import "./i18n/i18n";

//Components
import { App } from "./App";

//Starting GA tracking
ReactGA.initialize("UA-142836926-4");
ReactGA.pageview(window.location.pathname + window.location.search);

(function () {
    ReactGA.event({
      category: "Redirect",
      action: "Automatic rediret",
      label: "Let's go!",
    });
    ReactDOM.render(
          <App isBuildImported={false} />,
      document.getElementById("root")
    );
  })();

serviceWorker.unregister();
