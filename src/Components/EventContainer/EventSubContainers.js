import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_EVENTS, CHANGE_STATE } from "../../redux/actions";
import "../../styles/EventsSubContainers.scss";
import EventContents from "./EventContents";
const EventSubContainers = ({ events }) => {
  const currentDate = useSelector((state) => state.datereducer.date);
  const dispatch = useDispatch();
  const [changeOverlay, setChangeOverlay] = useState(false);
  const openAddEvents = (e) => {
    dispatch({
      type: CHANGE_STATE,
    });
    e.stopPropagation();
  };
  const changeIndexOfTimeline = (value) => {
    setChangeOverlay(value);
  };
  const currentTimeLine = moment().format("HH:mm");
  const timelineTop = (100 * parseInt(moment().format("mm"))) / 60;
  return (
    <>
      <div className={`card-flex`}>
        <div className="events-time">{events.starttime}</div>
        <div className={`card  `} onClick={openAddEvents}>
          {events.starttime < currentTimeLine &&
          events.endtime > currentTimeLine &&
          currentDate === new Date().toDateString() ? (
            <div
              style={{ top: `${timelineTop}%` }}
              className={`current-time-line ${
                changeOverlay && "current-time-line-hide"
              }`}
            ></div>
          ) : (
            ""
          )}
          {events.events.map((data) => (
            <EventContents
              events={data}
              changeIndexOfTimeline={changeIndexOfTimeline}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventSubContainers;
