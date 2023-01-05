import React, { useMemo, useState } from "react";
import "../../styles/DaysOfWeek.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CHANGE_STATE } from "../../redux/actions";
const DaysOfWeek = (props) => {
  const dispatch=useDispatch();
  const date = new Date(props.currentDate);
  const [selectedColor,setSelectedColor] = useState(false);
  const changeNewDate = (e) => {
      props.changeDate(e.target.value);
    
    
  };
  
  return (
    <>
    <input
      className={`days-week ${props.otherDays===true ?"other-month-day":" "} ${
        props.display===new Date().getDate() && moment(props.currentDate).month()===new Date().getMonth()&& props.otherDays===false && moment(props.currentDate).year()===new Date().getFullYear()
          ? "today" 
          : ""
      }`}
          type={"text"}
          value={props.display}
          onClick={changeNewDate}
          
          readOnly
        />
       
    </>
  );
};

export default DaysOfWeek;
