import React, { useMemo } from 'react'
import { useState,useEffect } from 'react'
import "../../styles/EventsContainer.scss"
import Helper from '../../Utils/Helper';
import moment from 'moment';
// import EventContents from './EventSubContainers';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { CHANGE_EVENTS, eventsAction } from '../../redux/actions';
import EventSubContainers from './EventSubContainers';
const EventsContainer = () => {
  const dispatch=useDispatch();
  // const [scrollLock, setScrollLock] = useState(false);
    // const[getEvent,setGetEvent]=useState([])
   const[getTime,setGetTime]=useState(Helper.timeConstant())
  //  const[helperState,setHelperState]=useState(false)
   const bodyStyle = document.body.style;
   const state=useSelector(state=>state.postreducer.getValue)
   const date=useSelector(state=>state.datereducer.date)
   const timeLine=useSelector(state=>state.datereducer.events)
   useEffect(()=>
   {
    axios.get(`http://localhost:5169/api/appointments/${moment(date).format("MM-DD-yyyy")}`).then((response)=>
    {
        dispatch(eventsAction(CHANGE_EVENTS,timeLine,response.data))
    }).catch(error=>console.log(error))
   },[state,date]);
  //  console.log(event)
  return (
    <div className='timeline-container' >
   
      <div className='timeline-header'>
         <h3>{date}</h3>
      </div>
    <div className='events-container'>
       {timeLine.map((data)=>
      <EventSubContainers events={data} />)}
    </div>
    
    </div>
    
  )
}

export default EventsContainer


 