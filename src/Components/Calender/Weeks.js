import React from "react";
import moment from "moment";
import "../../styles/Weeks.scss";
import Days from "./Days";

const Weeks = () => {
  const day = moment.weekdaysShort();

  let weekdayname = day.map((dayList, index) => {
    return <li>{dayList}</li>;
  });
  return <ul className="weeks">{weekdayname}</ul>;
};

export default Weeks;
