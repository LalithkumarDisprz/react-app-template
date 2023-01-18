import React from "react";
import "../styles/DayView.scss";
import Calender from "./Calender/Calender";
import { useState } from "react";
import EventsContainer from "./EventContainer/EventsContainer";
import TimelineHeader from "./Calender/TimelineHeader";
import Agenda from "./UpcomingEvents.js/Agenda";

const DayView = () => {
  const [displayTimeLine,setDisplayTimeLine]=useState(true);
  const changeTimeLine=(value)=>
  {
    
    setDisplayTimeLine(value);
  }
  return (
    <div>
      <div className="timeline-events-container">
       
        <TimelineHeader changeTimeLine={changeTimeLine}/>
        {displayTimeLine
        ?
        <EventsContainer /> : <Agenda state={displayTimeLine}/>}
        {/* <Calender /> */}
      </div>
    </div>
  );
};

export default DayView;
