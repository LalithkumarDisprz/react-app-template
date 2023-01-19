import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../../styles/ScheduledEvents.scss"
const ScheduledEvents = ({events}) => {
  return (
    <div className='scheduled-events-container'>
      <FontAwesomeIcon icon={faCalendarWeek} size={'xl'} className="calender-icon"/>
      <div>{events.length}</div>
      <div className='remaining-events'>Remaining Appointments for the week</div>
      </div>
  )
}

export default ScheduledEvents
