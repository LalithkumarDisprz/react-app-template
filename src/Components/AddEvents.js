import React, { useCallback, useEffect} from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import ReactDOM from "react-dom";
// import DateTimePicker from 'react-datetime-picker
import DateTimePicker from "react-datetime-picker";
import TimePicker from "react-time-picker";
import "../styles/AddEvents.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ADD_POST, CHANGE_DATE, createAction } from "../redux/actions";
import ErrorDialogueBox from "./ErrorDialogueBox";
const AddEvents = (props) => {
  const postDate = useSelector((state) => state.datereducer.date);
  const dispatch = useDispatch();
  // const[title,setTitle]=useState(" ")
  // const[description,setDescripion]=useState(" ")
  // const[startTime,setStartTime]=useState(" ")
  // const[endTime,setEndTime]=useState(" ")
  const [dialogueBox, setDialogueBox] = useState(false);
  const [status, setStatus] = useState(" ");
  const [displayError, setDisplayError] = useState("");
  const [postCall, setPost] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start:moment(props.eventDate).format("yyyy-MM-DDTHH:mm"),
    end:moment(props.eventDate).format("yyyy-MM-DDTHH:mm"),
  });
  const newDate=useSelector(state=>state.datereducer.date)
  const closeEvent =(e)=> {
    props.close();
  };
  const addTitle = (e) => {
    setNewEvent({ ...newEvent, title: e.target.value });
    // setTitle(e.target.value)
  };
  const addDescription = (e) => {
    setNewEvent({ ...newEvent, description: e.target.value });
    // setDescripion(e.target.value)
  };
  const addStart = (e) => {
    setNewEvent({ ...newEvent, start: e.target.value });
    // setStartTime(e.target.value)
  };
  const addEnd = (e) => {
    setNewEvent({ ...newEvent, end: e.target.value });
    // setEndTime(e.target.value)
  };
  const closeErrorDialogueBox=()=>{
      setDialogueBox(false)
  }
  // const addEvents=()=>
  // {
  //   setNewEvent({ ...newEvent, title: title});
  //   setNewEvent({ ...newEvent, description:description });
  //   setNewEvent({ ...newEvent, start: startTime });
  //   setNewEvent({ ...newEvent, end: endTime });
  // }
  const handleClick = () => {
        
  if((newEvent.title).replace(/\s/g,"")!=="")
  {
    axios
      .post("http://localhost:5169/api/appointments", {
        date: moment(newEvent.start).format("MM-DD-yyyy"),
        title: newEvent.title,
        description: newEvent.description,
        startTime: newEvent.start,
        endTime: newEvent.end,
      })
      .then((response) => {
        setPost(response.data);
        dispatch({
          type: ADD_POST,
        });
        dispatch(createAction(CHANGE_DATE,newDate))
        if(response.data)
        {
          props.close();
        }
        
      })
      .catch((error) => {
         setStatus(error.response.status);
         setDialogueBox(true)
         setDisplayError(error.response.data)
      });
    }
  }
  return ReactDOM.createPortal(
    <>
      <div className="add-events-background" onClick={closeEvent}></div>
      <div className="add-events">
        <p>Add events</p>
        <div>Event Title</div>
        <div>
          <TextareaAutosize
            minRows={1}
            maxRows={4}
            type="text"
            placeholder="Add Event Name"
            value={newEvent.title}
            onChange={addTitle}
            className="text-area"
          />
        </div>
        <div>
          <TextareaAutosize
            minRows={1}
            maxRows={4}
            type="text"
            placeholder="Add Description"
            value={newEvent.description}
            onChange={addDescription}
            className="text-area"
          />
        </div>
        <div className="date-pick">
          <input
            type="datetime-local"
            value={newEvent.start}
            onChange={addStart}
          />
          <input type="datetime-local" value={newEvent.end} onChange={addEnd} />
        </div>
        <div className="button-flex">
          <button onClick={handleClick} className="close-button">
            OK
          </button>
          <button onClick={closeEvent} className="cancel-button">
            Cancel
          </button>
        </div>
        {((newEvent.title).replace(/\s/g,"")==="")?"Please Add a title":" "}
        
      </div>
      {dialogueBox?
      <ErrorDialogueBox status={status} displayError={displayError} closeErrorDialogueBox={closeErrorDialogueBox}/>: " "}
    </>,
    document.getElementById("portal")
  );
};
export default AddEvents;
