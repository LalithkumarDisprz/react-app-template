import { apiRequest } from "./Services";
import { REQUEST_TYPES } from "../Utils/RequestHeaderEnums";
import { URL_ROUTE } from "../Utils/RequestHeaderEnums";
export const postAppointment = (data) => {
  
  return apiRequest({
    url: "",
    method: REQUEST_TYPES.POST,
    data: data,
  });
};

export const getAppointment = (apiDate) => {
  return apiRequest({
    url: `${apiDate}`,
    method: REQUEST_TYPES.GET,
  });
};

export const deleteAppointment = (id, date) => {
  return apiRequest({
    url: `${id}/${date}`,
    method: REQUEST_TYPES.DELETE,
  });
};

export const updateAppointment = (data) => {
 
  return apiRequest({
    url: "",
    method: REQUEST_TYPES.PUT,
    data: data,
  });
};

export const getAppointmentsForWeek = (start, end) => {
  return apiRequest({
    url: `/${URL_ROUTE.RANGE}/${start}/${end}`,
    method: REQUEST_TYPES.GET,
  });
};
