import React, { useState } from "react";
import "../../styles/CalenderDays.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
const CalenderDays = ({ changeDate, currentDate, otherDays, display }) => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.datereducer.date);
  const changeNewDate = (e) => {
    if (otherDays !== true) {
      changeDate(e.target.value);
    }
  };
  return (
    <>
      <input
        className={`days-week ${otherDays === true ? "other-month-day" : " "} ${
          display === new Date().getDate() &&
          new Date(currentDate).getMonth() === new Date().getMonth() &&
          otherDays === false &&
          new Date(currentDate).getFullYear() === new Date().getFullYear()
            ? "today"
            : ""
        } ${
          parseInt(moment(date).format("D")) === display &&
          new Date(currentDate).getMonth() === new Date(date).getMonth() &&
          new Date(currentDate).getFullYear() === new Date(date).getFullYear()
            ? "selected-date"
            : " "
        } `}
        type={"text"}
        value={display}
        onClick={changeNewDate}
        readOnly
      />
    </>
  );
};

export default CalenderDays;
