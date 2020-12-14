//React
import React from "react";

//Shared functionality
import { confirmAlert } from "react-confirm-alert";

export function confirmNewBuildCreation(generateCalculator: () => void): void {
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
                  generateCalculator()
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
