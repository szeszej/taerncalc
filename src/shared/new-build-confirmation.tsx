//React
import React from "react";

//Shared functionality
import { confirmAlert } from "react-confirm-alert";

//i18l
import i18n from "i18next";

export function confirmNewBuildCreation(generateCalculator: () => void): void {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="backdrop">
          <div className="alert-box">
            <p className="alert-text">
              {i18n.t("new-build-confirm")}
            </p>
            <div className="alert-box-actions">
              <button
                className="alert-box-action"
                onClick={() => {
                  onClose();
                  generateCalculator()
                }}
              >
                {i18n.t("Tak")}
              </button>
              <button className="alert-box-action" onClick={onClose}>
                {i18n.t("Nie")}
              </button>
            </div>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
        </div>
      );
    },
  });
}
