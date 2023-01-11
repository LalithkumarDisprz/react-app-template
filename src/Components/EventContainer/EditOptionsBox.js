import React, { useState, useContext, useEffect } from "react";
import { options } from "../../Utils/Constants";
import "../../styles/EditOptionsBox.scss";
import { UserContext } from "./EventContents";
// import useScrollLock from '../useScrollLock'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faTrash,
  faPen,
  faTrashCan,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { eventsAction } from "../../redux/actions";
import moment from "moment";
const EditOptionsBox = ({
  displayUpdateDialogue,
  displayDeleteDialogue,
  closeEditOptions,
}) => {
  const events = useContext(UserContext);
  return (
    <>
      <div
        className="edit-options-background"
        onClick={(e) => {
          closeEditOptions();
          e.stopPropagation();
        }}
      ></div>
      <div
        className={`edit-options-container`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-options-header">
          <div>{events.type}</div>
          <div className="edit-options-icon">
            <FontAwesomeIcon
              icon={faPen}
              className="edit-icons"
              onClick={displayUpdateDialogue}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className="edit-icons"
              onClick={displayDeleteDialogue}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="close-icon"
              onClick={(e) => {
                closeEditOptions();
                e.stopPropagation();
              }}
            />
          </div>
        </div>
        <div className="edit-options-sub-flex">
          <div
            className={`event-title-type ${
              events.type === "Reminder" && "reminder-style"
            } ${events.type === "Out of office" && "hard-stop-style"}`}
          ></div>
          <div className="title-and-time-display-container">
            <div className="display-title">{events.title}</div>
            <div className="event-title-time-display">
              <div>{new Date(events.startTime).toDateString()}</div>
              <div>
                {moment(events.startTime).format("HH:mm")} -{" "}
                {moment(events.endTime).format("HH:mm")}
              </div>
            </div>
          </div>
        </div>
        <div className="edit-options-sub-flex">
          <FontAwesomeIcon
            icon={faFileLines}
            className="contents-display"
            size={"xl"}
          />
          {events.description !== "" ? (
            <pre className="description">{events.description}</pre>
          ) : (
            "(No Descriptions)"
          )}
        </div>
        <div className="edit-update-button">
          <button onClick={displayUpdateDialogue}>{options.edit}</button>
          <button className="add-color" onClick={displayDeleteDialogue}>
            {options.delete}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditOptionsBox;
