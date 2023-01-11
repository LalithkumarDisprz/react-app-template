import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/AddEventsButton.scss";
import AddEvents from "./PopUps/AddEvents";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_EVENTS, CHANGE_STATE } from "../redux/actions";
const AddEventsButton = ({ eventDate }) => {
  const dispatch = useDispatch();
  const addEvents = useSelector(
    (state) => state.addEventsReducer.displayAddEvents
  );
  const [openOptions, setOptions] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const openSelectEvents = (e) => {
    e.stopPropagation();
    setOpenEvents(!openEvents);
  };
  const openAddEvents = (eventType) => {
    dispatch({
      type: CHANGE_STATE,
    });
    setOpenEvents(false);
    setTypeOfEvent(eventType);
  };
  return (
    <div>
      <button className="create-icon" icon={faPlus} onClick={openSelectEvents}>
        <FontAwesomeIcon icon={faPlus} size={"xs"} />
        Add
      </button>
      <div
        className={`${openEvents ? "select-events-background" : " "}`}
        onClick={openSelectEvents}
      >
        <div
          className={`select-your-events-options ${
            openEvents && "display-select-events"
          }`}
        >
          <li onClick={() => openAddEvents("Event")}>Events</li>
          <li onClick={() => openAddEvents("Reminder")}>Reminder</li>
          <li onClick={() => openAddEvents("Out of office")}>Out 0f Office</li>
        </div>
      </div>
      {addEvents ? (
        <AddEvents
          eventDate={eventDate}
          close={openAddEvents}
          type={typeOfEvent}
        />
      ) : (
        " "
      )}
    </div>
  );
};

export default AddEventsButton;
