import React, { useState } from "react";
import { useContext } from "react";
import "../../styles/AddEvents.scss";
import ReactDOM from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import { UserContext } from "../EventContainer/EventContents";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST, CHANGE_DATE, createAction } from "../../redux/actions";
import ErrorDialogueBox from "./ErrorDialogueBox";
const UpdateDialogueBox = ({ closeUpdateBox }) => {
  const updateData = useContext(UserContext);
  const type = updateData.type;
  const date = useSelector((state) => state.datereducer.date);
  const [dialogueBox, setDialogueBox] = useState(false);
  const [displayStatus, setDisplayStatus] = useState("");
  const [displayError, setDisplayError] = useState(" ");
  const [typeOfEvent, setType] = useState(type);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [events, setEvents] = useState({
    title: updateData.title,
    description: updateData.description,
    start: updateData.startTime,
    end: updateData.endTime,
  });
  const closeErrorDialogueBox = () => {
    setDialogueBox(false);
  };
  const handleClick = (e) => {
    if (events.title.replace(/\s/g, "") !== "") {
      axios
        .put("http://localhost:5169/api/appointments", {
          id: updateData.id,
          date: updateData.date,
          title: events.title,
          description: events.description,
          type: typeOfEvent,
          startTime: events.start,
          endTime: events.end,
        })
        .then((response) => {
          setUpdate(response.data);
          dispatch({
            type: ADD_POST,
          });
          dispatch(createAction(CHANGE_DATE, date));
          if (response.data) {
            closeUpdateBox();
          }
        })
        .catch((error) => {
          setDisplayStatus(error.response.status);
          setDialogueBox(true);
          setDisplayError(error.response.data);
        });
    }
  };
  const updateDescription = (e) => {
    e.preventDefault();
    setEvents({ ...events, description: e.target.value });
  };
  const updateTitle = (e) => {
    e.preventDefault();
    setEvents({ ...events, title: e.target.value });
  };
  const updateStart = (e) => {
    setEvents({ ...events, start: e.target.value });
  };
  const updateEnd = (e) => {
    setEvents({ ...events, end: e.target.value });
  };
  return ReactDOM.createPortal(
    <>
      <div
        className="add-events-background"
        onClick={(e) => {
          closeUpdateBox();
          e.stopPropagation();
        }}
      ></div>
      <div
        className="add-events plus-update"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-events-top-flex">Update events</div>
        <div className="button-flex add-gap">
          <div
            className={`${typeOfEvent === "Event" && "type-event"} events`}
            onClick={() => {
              setType("Event");
            }}
          >
            Events
          </div>
          <div
            className={`${typeOfEvent === "Reminder" && "type-event"} events`}
            onClick={() => {
              setType("Reminder");
            }}
          >
            Reminder
          </div>
          <div
            className={`${
              typeOfEvent === "Out of office" && "type-event"
            } events`}
            onClick={() => {
              setType("Out of office");
            }}
          >
            Out of office
          </div>
        </div>
        <div className="title-container">
          <div className="add-title">Title</div>
          <TextareaAutosize
            minRows={1}
            maxRows={4}
            type="text"
            placeholder="Add Event Name"
            value={events.title}
            onChange={updateTitle}
            className="text-area"
          />
        </div>
        <div className="title-container">
          <div className="add-description">Description</div>
          <TextareaAutosize
            minRows={3}
            maxRows={4}
            type="text"
            placeholder="Add Description"
            value={events.description}
            onChange={updateDescription}
            className="text-area"
          />
        </div>
        <div className="date-pick">
          <div className="title-container">
            <div className="add-time">Start-time</div>
            <input
              type="datetime-local"
              value={events.start}
              onChange={updateStart}
            />
          </div>
          <div className="title-container">
            <div className="add-time">End-time</div>
            <input
              type="datetime-local"
              value={events.end}
              onChange={updateEnd}
            />
          </div>
        </div>
        <div className="button-flex ok-and-close-button">
          <button onClick={handleClick} className="ok-button">
            Update
          </button>
          <button
            onClick={(e) => {
              closeUpdateBox();
            }}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
      {dialogueBox ? (
        <ErrorDialogueBox
          status={displayStatus}
          displayError={displayError}
          closeErrorDialogueBox={closeErrorDialogueBox}
        />
      ) : (
        " "
      )}
    </>,
    document.getElementById("portal")
  );
};
export default UpdateDialogueBox;
