import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../../Services/Services";
import "../../styles/Agenda.scss";
import moment from "moment";
import EventCards from "./EventCards";
import ScheduledEvents from "./ScheduledEvents";
import { getAppointmentsForWeek, getRangeApi } from "../../Services/apiData";
import EventsDescription from "./EventsDescription";
const Agenda = ({ state }) => {
  const date = useSelector((state) => state.datereducer.date);
  const apiDate = moment(date).format("yyyy-MM-DDTHH:mm:ss");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [viewDescription, setViewDescription] = useState("");
  const fetchAppointmentForWeek = useCallback(async () => {
    var response = await getAppointmentsForWeek(apiDate);
    setUpcomingEvents(response.data);
  }, [state, date]);
  useEffect(() => {
    fetchAppointmentForWeek().catch(console.error);
  }, [fetchAppointmentForWeek]);
  const sendDescription = (content) => {
    setViewDescription(content);
  };
  return (
    <div className="agenda-container">
      <div className="agenda-title">Agenda for the Week</div>
      <div className="agenda-events-appointments-container">
        <div className="events-container">
          {upcomingEvents.length === 0 ? (
            <div className="no-events">No data To Display</div>
          ) : (
            upcomingEvents.map((data) => (
              <EventCards events={data} sendDescription={sendDescription} />
            ))
          )}
        </div>
        <div className="scheduled-events-display">
          <ScheduledEvents events={upcomingEvents} />
          <div className="view-description-container">
            {viewDescription === "" ? (
              "(No Description to show)"
            ) : (
              <EventsDescription display={viewDescription} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
