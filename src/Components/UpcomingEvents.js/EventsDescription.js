import React from 'react'
import '../../styles/EventsDescription.scss'
const EventsDescription = ({display}) => {
  return (
    <div >
      <div><b>Description</b></div>
      <pre>{display}</pre>
    </div>
  )
}

export default EventsDescription
