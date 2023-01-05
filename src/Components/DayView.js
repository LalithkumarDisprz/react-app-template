import React from 'react'
import "../styles/DayView.scss"
import Calender from './Calender/Calender';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
// import { Scheduler } from "@aldabil/react-scheduler";
// import AddEvents from './Components/AddEvents';
import { useState } from 'react';
// import EventsContainer from "./EventContainer/EventsContainer"
import EventsContainer from './EventContainer/EventsContainer';
// import DisplayEvents from "./Components/EventContainer/DisplayEvents";
import { useSelector } from 'react-redux';

// import CardContainer from "./Components/EventContainer/EventsContainer";
const DayView= () => {
  return (
    <div>
       <div className="timeline-sidebar-container">
      <Calender />
      
      <EventsContainer/>
      </div>
    </div>
  )
}

export default DayView;

