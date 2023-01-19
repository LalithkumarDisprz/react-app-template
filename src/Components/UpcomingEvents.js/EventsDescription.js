import React from 'react'
import '../../styles/EventsDescription.scss'
const EventsDescription = ({display}) => {
  return (
    <div >
      <div>Description</div>
      <pre>{display}</pre>
    </div>
  )
}

export default EventsDescription
