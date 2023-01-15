import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import "../../styles/EventsContainer.scss";
import Helper from "../../Utils/Helper";
import moment from "moment";
import { apiRequest } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { CHANGE_EVENTS, eventsAction } from "../../redux/actions";
import EventSubContainers from "./EventSubContainers";
import { REQUEST_TYPES } from "../../Utils/RequestHeaderEnums";
const EventsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.postreducer.getValue);
  const date = useSelector((state) => state.datereducer.date);
  const timeLine = useSelector((state) => state.datereducer.events);
  const apiDate = moment(date).format("yyyy-MM-DDTHH:mm:ss");
  useEffect(() => {
    // axios
    //   .get(`http://localhost:5169/api/appointments/${apiDate}`)
    apiRequest({
      url: `${apiDate}`,
      method: REQUEST_TYPES.GET,
    })
      .then((response) => {
        dispatch(eventsAction(CHANGE_EVENTS, timeLine, response.data));
      })
      .catch((error) => console.log(error));
  }, [state, date]);
      
  return (
    <>
      <div className="timeline-container">
        <div className="events-container">
          {timeLine.map((data) => (
            <EventSubContainers events={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsContainer;
