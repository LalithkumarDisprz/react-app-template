import "./styles/App.scss"
import Calender from './Components/Calender/Calender';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
// import { Scheduler } from "@aldabil/react-scheduler";
import AddEvents from './Components/AddEvents';
import { useState } from 'react';
import EventsContainer from "./Components/EventContainer/EventsContainer"
// import DisplayEvents from "./Components/EventContainer/DisplayEvents";
import AppHeader from "./Components/AppHeader";
import { useSelector } from 'react-redux';

import CardContainer from "./Components/EventContainer/EventsContainer";
import DayView from "./Components/DayView";


function App() {

// const display=useSelector((state)=>state.statereducer.hide)
  return (
    <>
    <div >
      <header className="app-head">
       <AppHeader />
       
      </header>
      <DayView/>
      {/* <div className="calender-sidebar-container">
      <Calender />
      
      <EventsContainer/>
      </div> */}
    </div>
    </>
  );
}


export default App;
