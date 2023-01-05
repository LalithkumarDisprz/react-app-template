import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CHANGE_EVENTS, CHANGE_STATE } from '../../redux/actions';

import "../../styles/EventsSubContainers.scss";
import AddEvents from '../AddEvents';

import EventContents from './EventContents';
const EventSubContainers = ({events}) => {
  const dispatch=useDispatch()
    const[openEvents,setAddEvents]=useState(false)
    const openAddEvents=(e)=>
    {
      dispatch(
        {
          type:CHANGE_STATE,
        }
      )
      console.log("add-events")
      e.stopPropagation()
    }
  return (
    <>
    <div className={`card-flex`} >
    {events.starttime}
   <div className={`card  `} onClick={openAddEvents}>
    {events.events.map((data)=>
     <EventContents events={data}/>)}
   </div>
   </div>
   </>
  )
}

export default EventSubContainers
