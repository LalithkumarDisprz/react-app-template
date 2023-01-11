import React, { useMemo } from "react";
import Weeks from "./Weeks";
import Days from "./Days";
import moment from "moment";
import "../../styles/Calender.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { month } from "../../Utils/Constants";
import AddEvents from "../PopUps/AddEvents";
import {
  CHANGE_DATE,
  CHANGE_STATE,
  CLOSE_STATE,
  createAction,
} from "../../redux/actions";
const Calender = (props) => {
  const dispatch = useDispatch();
  const prevDate = useSelector((state) => state.datereducer.date);
  const addEvents = useSelector(
    (state) => state.addEventsReducer.displayAddEvents
  );
  const [date, setCurrentDate] = useState(new Date());
  const [eventDate, setEventDate] = useState(new Date());
  const [displayDialogueBox, setDisplayDialogueBox] = useState(false);
  const [errorResponse, setErrorResponse] = useState(" ");
  const [statusOfError, setStatusOfError] = useState(" ");
  const openAddEvents = () => {
    dispatch({
      type: CHANGE_STATE,
    });
  };

  const changeDate = (context) => {
    if (new Date(prevDate).getDate() !== parseInt(context)) {
      setCurrentDate(new Date(date.setDate(context)));
      setEventDate(date);
      dispatch(createAction(CHANGE_DATE, date.toDateString()));
    }
  };
  const increaseDate = () => {
    let nextMonth = date.getMonth() + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      const nextYear = date.getFullYear() + 1;
      new Date(date.setFullYear(nextYear));
      setCurrentDate(new Date(date.setMonth(nextMonth)));
    }
    setCurrentDate(new Date(date.setMonth(nextMonth)));
  };
  const decreaseDate = () => {
    let previousMonth = date.getMonth() - 1;
    if (previousMonth < 0) {
      previousMonth = 11;
      const prevYear = date.getFullYear() - 1;
      new Date(date.setFullYear(prevYear));
      setCurrentDate(new Date(date.setMonth(previousMonth)));
    }
    setCurrentDate(new Date(date.setMonth(previousMonth)));
  };
  return (
    <div className="side-bar">
      <div className="create-event-button">
        <button className="create-icon" icon={faPlus} onClick={openAddEvents}>
          <FontAwesomeIcon icon={faPlus} size={"xl"} />
          Create event
        </button>
      </div>
      <div className="calender-container">
        {/* <CalenderHeader displayDate={date} changeYear={changeYear} openAddEvents={openAddEvents}/> */}
        <div className="calender-header">
          <div className="icon-flex">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => {
                setCurrentDate(
                  new Date(date.setFullYear(date.getFullYear() - 1))
                );
              }}
            />
            <div>{date.getFullYear()}</div>
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => {
                setCurrentDate(
                  new Date(date.setFullYear(date.getFullYear() + 1))
                );
              }}
            />
          </div>
          <div className="button-flex">
            <div className="icon-flex">
              <FontAwesomeIcon icon={faChevronLeft} onClick={decreaseDate} />
              <div>{month[date.getMonth()]}</div>
              <FontAwesomeIcon icon={faChevronRight} onClick={increaseDate} />
            </div>
          </div>
        </div>
        <Weeks />
        <Days changeDate={changeDate} date={date} />
        {addEvents ? (
          <AddEvents eventDate={eventDate} close={openAddEvents} />
        ) : (
          " "
        )}
      </div>
    </div>
  );
};
export default Calender;
