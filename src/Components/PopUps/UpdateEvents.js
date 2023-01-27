import React, { useState } from "react";
import { useContext } from "react";
import "../../styles/AddEvents.scss";
import ReactDOM from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST, CHANGE_DATE, createAction } from "../../redux/actions";
import { eventHeaders, eventTypes, options } from "../../Utils/Constants";
import ErrorDialogueBox from "./ErrorDialogueBox";
import { invalid_id, meeting_Error } from "../../Utils/Constants";
import { updateApi, updateAppointment } from "../../Services/apiData";
import AddAttachments from "./AddAttachments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const UpdateEvents = ({ updateEvent, closeUpdateBox }) => {
  const [displayAttachment, setOpenAttachment] = useState(false);
  const date = useSelector((state) => state.datereducer.date);
  const [dialogueBox, setDialogueBox] = useState(false);
  const [displayStatus, setDisplayStatus] = useState("");
  const [displayError, setDisplayError] = useState(" ");
  const [attachmentName, setAttachmentName] = useState(
    updateEvent.appointmentAttachment.contentName
  );
  const [attachmentType, setAttachmentType] = useState(
    updateEvent.appointmentAttachment.contentType
  );
  const [typeOfEvent, setType] = useState(updateEvent.type);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [event, setEvent] = useState({
    title: updateEvent.title,
    description: updateEvent.description,
    attachment: updateEvent.appointmentAttachment.content,
    start: updateEvent.startTime,
    end: updateEvent.endTime,
  });
  const closeErrorDialogueBox = () => {
    setDialogueBox(false);
  };
  const getAttachmentName = (name) => {
    setAttachmentName(name);
  };
  const getAttachmentType = (typeOfData) => {
    setAttachmentType(typeOfData);
  };
  const handleClick = async (e) => {
    if (event.title.replace(/\s/g, "") !== "") {
      const data = {
        appointment: {
          id: updateEvent.id,
          date: event.start,
          title: event.title,
          description: event.description,
          type: typeOfEvent,
          startTime: event.start,
          endTime: event.end,
          appointmentAttachment: {
            content: event.attachment,
            contentName: attachmentName,
            contentType: attachmentType,
          },
        },
        oldDate: updateEvent.date,
      };
      var response = await updateAppointment(data);
      if (response.status === 200) {
        setUpdate(response.data);
        dispatch({
          type: ADD_POST,
        });
        dispatch(createAction(CHANGE_DATE, date));
        closeUpdateBox();
      } else {
        if (response.status === 404) {
          setDisplayStatus(invalid_id);
          setDialogueBox(true);
          setDisplayError(JSON.parse(response.data).message);
        }
        setDisplayStatus(meeting_Error);
        setDialogueBox(true);
        setDisplayError(JSON.parse(response.data).message);
      }
    }
  };
  const updateDescription = (e) => {
    e.preventDefault();
    setEvent({ ...event, description: e.target.value });
  };
  const updateTitle = (e) => {
    e.preventDefault();
    setEvent({ ...event, title: e.target.value });
  };
  const updateStart = (e) => {
    setEvent({ ...event, start: e.target.value });
  };
  const updateEnd = (e) => {
    setEvent({ ...event, end: e.target.value });
  };
  const attachmentData = (value) => {
    setEvent({ ...event, attachment: value });
  };
  const openAttachment = () => {
    setOpenAttachment(!displayAttachment);
    setEvent({ ...event, attachment: null });
    setAttachmentName(null);
    setAttachmentType(null);
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
        <div className="add-events-top-flex">{options.update}</div>
        <div className="button-flex add-gap">
          <div
            className={`${typeOfEvent === "Event" && "type-event"} events`}
            onClick={() => {
              setType("Event");
            }}
          >
            {eventTypes.event}
          </div>
          <div
            className={`${typeOfEvent === "Reminder" && "type-event"} events`}
            onClick={() => {
              setType("Reminder");
            }}
          >
            {eventTypes.reminder}
          </div>
          <div
            className={`${
              typeOfEvent === "Out of office" && "type-event"
            } events`}
            onClick={() => {
              setType("Out of office");
            }}
          >
            {eventTypes.outOfOffice}
          </div>
        </div>
        <div className="title-container">
          <div className="add-title">{eventHeaders.title}</div>
          <TextareaAutosize
            minRows={1}
            maxRows={4}
            type="text"
            placeholder="Add Event Name"
            value={event.title}
            onChange={updateTitle}
            className="text-area"
          />
        </div>
        <div className="title-container">
          <div className="add-description">{eventHeaders.description}</div>
          <TextareaAutosize
            minRows={3}
            maxRows={4}
            type="text"
            placeholder="Add Description"
            value={event.description}
            onChange={updateDescription}
            className="text-area"
          />
        </div>
        {event.attachment !== null ? (
          <div className={`date-pick `}>
            <a href={event.attachment} className="added-attachment">
              {attachmentName}
            </a>
            <FontAwesomeIcon
              onClick={openAttachment}
              icon={faClose}
              className="close-icon-hover"
            />
          </div>
        ) : (
          <div className="date-pick">
            <AddAttachments
              boxName="update"
              getData={attachmentData}
              getType={getAttachmentType}
              getName={getAttachmentName}
            />
          </div>
        )}
        <div className="date-pick">
          <div className="title-container">
            <div className="add-time">{eventHeaders.starttime}</div>
            <input
              type="datetime-local"
              value={event.start}
              onChange={updateStart}
            />
          </div>
          <div className="title-container">
            <div className="add-time">{eventHeaders.endtime}</div>
            <input
              type="datetime-local"
              value={event.end}
              onChange={updateEnd}
            />
          </div>
        </div>
        <div className="button-flex ok-and-close-button">
          <button onClick={handleClick} className="ok-button">
            {options.up}
          </button>
          <button
            onClick={(e) => {
              closeUpdateBox();
            }}
            className="cancel-button"
          >
            {options.cancel}
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
export default UpdateEvents;
