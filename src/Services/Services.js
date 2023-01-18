import axios from "axios";
export const BaseURL = "http://localhost:5169/api/appointments";

const defaultHeader = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const apiRequest = async (options) => {
  const client = axios.create({
    baseURL: `${BaseURL}/`,
    headers: defaultHeader(),
  });

  const onSuccess = (response) => {
    console.log(response.data,"lk");
    return response;
  };
  const onError = (error) => {
    console.log(error.response,"err");
    return(error.response);
  };
  return client(options).then(onSuccess).catch(onError);
};
