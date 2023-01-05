import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { month } from "../../Constants";
import { useState } from "react";
const CalenderHeader = (props) => {
    
    const [date, setCurrentDate] = useState(new Date());
    useEffect(()=>
    {
        setCurrentDate(props.displayDate)
    },[props.displayDate])

    const increaseDate = () => {
        let nextMonth = date.getMonth() + 1;
        if (nextMonth > 11) {
          nextMonth = 0;
          const nextYear = date.getFullYear() + 1;
          new Date(date.setFullYear(nextYear));
          setCurrentDate(new Date(date.setMonth(nextMonth)));
        }
        setCurrentDate(new Date(date.setMonth(nextMonth)));
      };
      const decreaseDate = () => {
        let previousMonth = date.getMonth() - 1;
    
        if (previousMonth < 0) {
          previousMonth = 11;
          const prevYear = date.getFullYear() - 1;
          new Date(date.setFullYear(prevYear));
          setCurrentDate(new Date(date.setMonth(previousMonth)));
        }
        setCurrentDate(new Date(date.setMonth(previousMonth)));
      };     
  return (
    <div className="calender-header">
          <div className="icon-flex">
            <FontAwesomeIcon icon={faChevronLeft} onClick={decreaseDate} />
            <div>{month[date.getMonth()]}</div>
            <FontAwesomeIcon icon={faChevronRight} onClick={increaseDate} />
          </div>
          <div className="day-flex">
            <p>{date.toDateString()}</p>
            <FontAwesomeIcon
              className="circle-plus-icon"
              icon={faPlus}
              onClick={props.openAddEvents}
            />
          </div>
        </div>
      

  )
}

export default CalenderHeader
