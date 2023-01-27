import moment from "moment";
import React, { useEffect, useState } from "react";
import "../../styles/Months.scss";
const Months = ({ month, date, indexOfMonth, changeEventMonth }) => {
  const changeMonth = () => {
    changeEventMonth(month);
  };
  return (
    <div
      onClick={changeMonth}
      className={`month-container ${
        new Date(date).getMonth() === indexOfMonth && "selected-month"
      }`}
    >
      {month}
    </div>
  );
};

export default Months;
