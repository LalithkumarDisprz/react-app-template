import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../../Services/Services";
import "../../styles/Agenda.scss";
import { URL_ROUTE, REQUEST_TYPES } from "../../Utils/RequestHeaderEnums";
import moment from "moment";
import EventCards from "./EventCards";
const Agenda = ({state}) => {
  const date = useSelector((state) => state.datereducer.date);
  const apiDate = moment(date).format("yyyy-MM-DDTHH:mm:ss");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    apiRequest({
      url: `${URL_ROUTE.RANGE}/${apiDate}`,
      method: REQUEST_TYPES.GET,
    })
      .then((response) => {
        setUpcomingEvents(response.data);
        
      })
      .catch((error) => console.log(error));
  }, [state]);
  console.log(upcomingEvents)
  return (
    <div className="agenda-container">
      <div className="events-container">
        {upcomingEvents === [] ? (
          <div>No data To Display</div>
        ) : 
            upcomingEvents.map((data) => (
                <EventCards events={data} />
              ))}
      </div>
    </div>
  );
};

export default Agenda;
