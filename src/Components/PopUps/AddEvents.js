import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "../../styles/AddEvents.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMinus,
  faPaperclip,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { ADD_POST, CHANGE_DATE, createAction } from "../../redux/actions";
import ErrorDialogueBox from "./ErrorDialogueBox";
import { meeting_Error } from "../../Utils/Constants";
import { postAppointment } from "../../Services/apiData";
import AddAttachments from "./AddAttachments";
const AddEvents = (props) => {
  const inputFocus = useRef(null);
  const [typeOfEvent, setType] = useState(props.type);
  const dispatch = useDispatch();
  const [dialogueBox, setDialogueBox] = useState(false);
  const [attachmentType, setAttachmentType] = useState(null);
  const [attachmentName, setAttachmentName] = useState(null);
  // const [title,setTitle]=useState("")
  // const [startTime,setStartTime]=useState(moment(props.eventDate).format("yyyy-MM-DDTHH:mm"))
  // const [description,setDescription]=useState("")
  // const [endTime,setEndTime]=useState(moment(props.eventDate).add(30, "minutes").format("yyyy-MM-DDTHH:mm"))
  const [status, setStatus] = useState(" ");
  const [displayError, setDisplayError] = useState("");
  const [postCall, setPost] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    attachment: null,
    start: moment(props.eventDate).format("yyyy-MM-DDTHH:mm"),
    end: moment(props.eventDate).add(30, "minutes").format("yyyy-MM-DDTHH:mm"),
  });
  const closeEvent = (e) => {
    props.close();
  };
  const attachmentData = (value, typeOfData, name) => {
    console.log(value);
    setNewEvent({ ...newEvent, attachment: value });
  };
  const getAttachmentName = (name) => {
    console.log(name);
    setAttachmentName(name);
  };
  const getAttachmentType = (typeOfData) => {
    console.log(typeOfData, "hh");
    setAttachmentType(typeOfData);
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
  const removeAttachment = () => {
    setAttachmentName("");
    setAttachmentType("");
    setNewEvent({ ...newEvent, attachment: null });
  };
  const handleClick = async () => {
    if (newEvent.title.replace(/\s/g, "") !== "") {
      const data = {
        date: newEvent.start,
        title: newEvent.title,
        description: newEvent.description,
        type: typeOfEvent,
        startTime: newEvent.start,
        endTime: newEvent.end,
        appointmentAttachment: {
          content: newEvent.attachment,
          contentType: attachmentType,
          contentName: attachmentName,
        },
      };
      var response = await postAppointment(data);
      if (response.status === 201) {
        console.log(response, "response");
        setPost(response.data);
        dispatch({
          type: ADD_POST,
        });
        props.close();
      } else {
        setStatus(meeting_Error);
        setDialogueBox(true);
        setDisplayError(JSON.parse(response.data).message);
      }
    } else {
      inputFocus.current.focus();
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
            ref={inputFocus}
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
            required
            type="text"
            placeholder="Add Description"
            value={newEvent.description}
            onChange={addDescription}
            className="text-area"
          />
        </div>
        {newEvent.attachment === null ? (
          <div className="date-pick">
            <AddAttachments
              boxName="addevents"
              getData={attachmentData}
              getType={getAttachmentType}
              getName={getAttachmentName}
            />
          </div>
        ) : (
          <div className="date-pick">
            <a href={newEvent.attachment} className="added-attachment">
              {attachmentName}
            </a>
            <FontAwesomeIcon icon={faClose} onClick={removeAttachment} className="close-icon-hover" />
          </div>
        )}
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
