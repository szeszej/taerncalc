//React
import React from "react";

//Shared functionality
import { confirmAlert } from "react-confirm-alert";

export function confirmNewBuildCreation(buildProperties: BuildProperties): void {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="backdrop">
          <div className="alert-box">
            <p className="alert-text">
              Czy na pewno chcesz stworzyć nowy build? Obecny zostanie usunięty!
            </p>
            <div className="alert-box-actions">
              <button
                className="alert-box-action"
                onClick={() => {
                  onClose();
                  buildProperties.renderApp(buildProperties.charClass, buildProperties.charLvl)
                }}
              >
                Tak
              </button>
              <button className="alert-box-action" onClick={onClose}>
                Nie
              </button>
            </div>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
        </div>
      );
    },
  });
}

interface BuildProperties {
  renderApp: (charClass: string, charLvl: number) => void
  charClass: string
  charLvl: number
}
