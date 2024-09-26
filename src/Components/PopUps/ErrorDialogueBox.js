import React from "react";
import "../../styles/ErrorDialogueBox.scss";
const ErrorDialogueBox = ({ status, displayError, closeErrorDialogueBox }) => {
  return (
    <div
      className="error-dialogue-box-container"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="dialogue-box-header">{status} </div>
      <div className="error-dialogue-box-pop-up">
        <p>{displayError}</p>
        <button
          className="error-ok-button"
          onClick={(e) => {
            closeErrorDialogueBox();
            e.stopPropagation();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorDialogueBox;
