import React from "react";
import moment from "moment";
import "../../styles/EventCards.scss";
const EventCards = ({ events,sendDescription }) => {
  return (
    <div className={`event-card-container ${
      events.type === "Reminder" && "reminder-overlay"
    } ${events.type === "Out of office" && "no-schedule-overlay"}`} onClick={()=>sendDescription(events.description,events.appointmentAttachment)}>
      <div className="events-card">
        <div className="event-row-flex">
        <div className="title">Title:</div>
        <div>{events.title}</div>
        </div>
        <div className="time-flex">
          <div>{new Date(events.startTime).toDateString()}</div>
          <div>{moment(events.startTime).format("LT")}</div>
          <div>-</div>
          <div>{moment(events.endTime).format("LT")}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCards;
