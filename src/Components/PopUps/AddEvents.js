import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "../../styles/AddEvents.scss";
import moment from "moment";
import { apiRequest } from "../../Services/Services";
import { REQUEST_TYPES } from "../../Utils/RequestHeaderEnums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMinus,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { ADD_POST, CHANGE_DATE, createAction } from "../../redux/actions";
import ErrorDialogueBox from "./ErrorDialogueBox";
import { meeting_Error } from "../../Utils/Constants";
const AddEvents = (props) => {
  const [typeOfEvent, setType] = useState(props.type);
  const dispatch = useDispatch();
  const [dialogueBox, setDialogueBox] = useState(false);
  const [status, setStatus] = useState(" ");
  const [displayError, setDisplayError] = useState("");
  const [postCall, setPost] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: moment(props.eventDate).format("yyyy-MM-DDTHH:mm"),
    end: moment(props.eventDate).add(30, "minutes").format("yyyy-MM-DDTHH:mm"),
  });
  const newDate = useSelector((state) => state.datereducer.date);
  const monthDate = moment(newEvent.start).format("yyyy-MM-DD");
  const closeEvent = (e) => {
    props.close();
  };
  const addTitle = (e) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };
  const addDescription = (e) => {
    setNewEvent({ ...newEvent, description: e.target.value });
  };
  const addStart = (e) => {
    setNewEvent({ ...newEvent, start: e.target.value });
  };
  const addEnd = (e) => {
    setNewEvent({ ...newEvent, end: e.target.value });
  };
  const closeErrorDialogueBox = () => {
    setDialogueBox(false);
  };

  const postDate = moment(monthDate).format("yyyy-MM-DDTHH:mm:ss");
  const handleClick = async () => {
    if (newEvent.title.replace(/\s/g, "") !== "") {
      // axios
      //   .post("http://localhost:5169/api/appointments", {
      //     date: postDate,
      //     title: newEvent.title,
      //     description: newEvent.description,
      //     type: typeOfEvent,
      //     startTime: newEvent.start,
      //     endTime: newEvent.end,
      //   })
      await apiRequest({
        url: "",
        method: REQUEST_TYPES.POST,
        data: {
          date: postDate,
          title: newEvent.title,
          description: newEvent.description,
          type: typeOfEvent,
          startTime: newEvent.start,
          endTime: newEvent.end,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            setPost(response.data);
            dispatch({
              type: ADD_POST,
            });
            dispatch(createAction(CHANGE_DATE, newDate));
            props.close();
          }
          if (response.status === 409) {
            setStatus(meeting_Error);
            setDialogueBox(true);
            setDisplayError(response.data.message);
          }
          if (response.status === 400) {
            setStatus(meeting_Error);
            setDialogueBox(true);
            setDisplayError(JSON.parse(response.data).message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return ReactDOM.createPortal(
    <>
      <div className="add-events-background" onClick={closeEvent}></div>
      <div className="add-events">
        <div className="add-events-top-flex">
          <div>Add Schedule</div>
          <div className="close-icon">
            <FontAwesomeIcon icon={faXmark} size={"xl"} onClick={closeEvent} />
          </div>
        </div>
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
            value={newEvent.title}
            onChange={addTitle}
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
            value={newEvent.description}
            onChange={addDescription}
            className="text-area"
          />
        </div>
        <div className="date-pick">
          <div className="title-container">
            <div className="add-time">Start-time</div>
            <input
              type="datetime-local"
              value={newEvent.start}
              onChange={addStart}
              className="date-time-input"
            />
          </div>
          <div className="title-container">
            <div className="add-time">End-time</div>
            <input
              type="datetime-local"
              value={newEvent.end}
              onChange={addEnd}
              className="date-time-input"
            />
          </div>
        </div>
        <div className="button-flex ok-and-close-button">
          <button onClick={handleClick} className="ok-button">
            ADD
          </button>
          <button onClick={closeEvent} className="cancel-button">
            Cancel
          </button>
        </div>
        {newEvent.title.replace(/\s/g, "") === "" ? "Please Add a title" : " "}
      </div>
      {dialogueBox ? (
        <ErrorDialogueBox
          status={status}
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
export default AddEvents;
