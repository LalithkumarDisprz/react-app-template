import React from 'react'

const EventCards = ({events}) => {
  console.log(events,"event");
  return (
    <div>
      {events.id}
    </div>
  )
}

export default EventCards
