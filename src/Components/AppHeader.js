import React from "react";
import "../styles/AppHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_DATE, createAction } from "../redux/actions";
const AppHeader = (props) => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.datereducer.date);
  const changeToday = (props) => {
    if (date !== new Date().toDateString())
      dispatch(createAction(CHANGE_DATE, new Date().toDateString()));
  };

  return (
    <>
      <div className="app-flex">
        <FontAwesomeIcon icon={faBars} size={"xl"} className="hamburger-icon" />
        <button className="today-button" onClick={changeToday}>
          Today
        </button>
        <h1>Schedule Events</h1>
        <h3>{date}</h3>
      </div>
    </>
  );
};

export default AppHeader;
