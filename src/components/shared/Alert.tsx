//React
import React from "react";
import ReactDOM from "react-dom";

//i18l
import { withTranslation } from "react-i18next";

 function ConnectedAlert(props: PropTypes) {
  function closeAlert ():void {
      let alertBox = document.getElementById("alert")!
      ReactDOM.unmountComponentAtNode(alertBox)
  }
  return (
    <div>
      <div className="backdrop"></div>
      <div className="alert-box">
        <p className="alert-text">{props.message}</p>
        {props.spinner ? (
          <div className="spinner"></div>
        ) : (
          <div>
            <button type="button" name="button" className="alert-box-action" onClick={closeAlert} >
              {props.t("Zamknij")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface PropTypes {
  message: string;
  spinner: boolean;
  t(string: string): string;
}

export const Alert = withTranslation()(ConnectedAlert)
