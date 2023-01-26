import React, { useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import "../../styles/EventsContainer.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAppointment } from "../../Services/apiData";
import { CHANGE_EVENTS, eventsAction } from "../../redux/actions";
import EventSubContainers from "./EventSubContainers";
const EventsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.getEventsReducer.getValue);
  const date = useSelector((state) => state.datereducer.date);
  const timeLine = useSelector((state) => state.datereducer.events);
  const dateToBeFetched = moment(date).format("yyyy-MM-DDTHH:mm:ss");
  const fetchAppointment = useCallback(async () => {
    var response = await getAppointment(dateToBeFetched);
    dispatch(eventsAction(CHANGE_EVENTS, timeLine, response.data));
  }, [state, date]);
  useEffect(() => {
    fetchAppointment().catch(console.error);
  }, [fetchAppointment]);
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
