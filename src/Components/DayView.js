import React from "react";
import "../styles/DayView.scss";
import Calender from "./Calender/Calender";
import { useState } from "react";
import EventsContainer from "./EventContainer/EventsContainer";
import TimelineHeader from "./Calender/TimelineHeader";

const DayView = () => {
  return (
    <div>
      <div className="timeline-events-container">
        <TimelineHeader />
        <EventsContainer />
        {/* <Calender /> */}
      </div>
    </div>
  );
};

export default DayView;
