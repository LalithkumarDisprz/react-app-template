import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../../Services/Services";
import "../../styles/Agenda.scss";
import image from "../../assests/ff0942006e3927a25ca164770cf37e37.jpg";
import moment from "moment";
import EventCards from "./EventCards";
import ScheduledEvents from "./ScheduledEvents";
import { getAppointmentsForWeek, getRangeApi } from "../../Services/apiData";
import EventsDescription from "./EventsDescription";
import EventsAttachment from "./EventsAttachment";
const Agenda = ({ state }) => {
  const date = useSelector((state) => state.datereducer.date);
  const startRange = moment(date).format("yyyy-MM-DDTHH:mm:ss");
  const endRange = moment(date).add(7, "days").format("yyyy-MM-DDTHH:mm:ss");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [viewDescription, setViewDescription] = useState("");
  const [viewAttachment, setViewAttachment] = useState(null);
  const fetchAppointmentForWeek = useCallback(async () => {
    var response = await getAppointmentsForWeek(startRange, endRange);
    setUpcomingEvents(response.data);
  }, [state, date]);
  useEffect(() => {
    fetchAppointmentForWeek().catch(console.error);
  }, [fetchAppointmentForWeek]);
  const sendDescription = (text, content) => {
    setViewDescription(text);
    setViewAttachment(content);
    
  };
  return (
    <div className="agenda-container">
      <div className="agenda-title">Agenda for the Week</div>
      <div className="agenda-events-appointments-container">
        <div className="events-container">
          {upcomingEvents.length === 0 ? (
            <img src={image} className="no-events"></img>
          ) : (
            upcomingEvents.map((data) => (
              <EventCards events={data} sendDescription={sendDescription} />
            ))
          )}
        </div>
        <div className="scheduled-events-display">
          <ScheduledEvents events={upcomingEvents} />
          <div className="display-attachment-conatiner">
            {viewAttachment === null || viewAttachment.content === null ? (
              "(No attachments Attached)"
            ) : (
              <EventsAttachment display={viewAttachment} />
            )}
          </div>
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
