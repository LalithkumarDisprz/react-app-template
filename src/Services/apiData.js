import { apiRequest } from "./Services";
import { REQUEST_TYPES } from "../Utils/RequestHeaderEnums";
import { URL_ROUTE } from "../Utils/RequestHeaderEnums";
export const postApi = (data) => {
  return apiRequest({
    url: "",
    method: REQUEST_TYPES.POST,
    data: data,
  });
};

export const getApi = (apiDate) => {
  return apiRequest({
    url: `${apiDate}`,
    method: REQUEST_TYPES.GET,
  });
};

export const deleteApi = (id, date) => {
  return apiRequest({
    url: `${id}/${date}`,
    method: REQUEST_TYPES.DELETE,
  });
};

export const updateApi = (data) => {
  return apiRequest({
    url: "",
    method: REQUEST_TYPES.PUT,
    data: data,
  });
};

export const getRangeApi = (data) => {
  return apiRequest({
    url: `${URL_ROUTE.RANGE}/${data}`,
    method: REQUEST_TYPES.GET,
  });
};
