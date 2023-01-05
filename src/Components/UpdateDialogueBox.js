import React, { useState } from 'react'
import { useContext } from 'react';
import"../styles/AddEvents.scss";
import ReactDOM from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import { UserContext } from './EventContainer/EventContents';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { ADD_POST ,CHANGE_DATE,createAction} from '../redux/actions';
import ErrorDialogueBox from './ErrorDialogueBox';
import e from 'cors';
const UpdateDialogueBox = ({closeUpdateBox,lockScroll}) => {
   const updateData=useContext(UserContext)
   const date=useSelector(state=>state.datereducer.date)
   const [dialogueBox,setDialogueBox]=useState(false)
   const [displayStatus,setDisplayStatus]=useState("")
   const [displayError,setDisplayError]=useState(" ")
  const dispatch=useDispatch();
  const [update,setUpdate]=useState(false);
  const[events,setEvents]=useState({title:updateData.title,
                                    description:updateData.description,
                                    start:updateData.startTime,
                                    end:updateData.endTime,
                             })
  const closeErrorDialogueBox=()=>
  {
    setDialogueBox(false)
    lockScroll();
  }
  const handleClick=(e)=>
  {
    axios.put("http://localhost:5169/api/appointments",{
      id: updateData.id,
      date:updateData.date,
      title:events.title,
      description:events.description,
      startTime:events.start,
      endTime:events.end,
    })
    .then((response) => {
      setUpdate(response.data);
      dispatch(
              {
                type:ADD_POST,
              }
             )
             dispatch(createAction(CHANGE_DATE,date))
      if(response.data)
      {
       closeUpdateBox();
       lockScroll();
      }
    }).catch((error) => {
      setDisplayStatus(error.response.status);
      setDialogueBox(true)
      setDisplayError(error.response.data)
      console.log(error.response.data)
      
   });
    
  }
  const updateDescription=(e)=>
  {
    e.preventDefault();
    setEvents({...events,description:e.target.value})
  }
  const updateTitle=(e)=>
  {
    e.preventDefault();
    setEvents({...events,title:e.target.value})
  }
  const updateStart=(e)=>
  {
    setEvents({...events,start:e.target.value})
  }
  const updateEnd=(e)=>
  {
    setEvents({...events,end:e.target.value})
  }
  return ReactDOM.createPortal(
    <>
    <div className="add-events-background" onClick={(e)=>{closeUpdateBox();e.stopPropagation()}}>
    </div>
    <div className="add-events" onClick={(e)=>e.stopPropagation()}>
      <p>
        Update events
      </p>
        <div>Event Title</div>
        <div>
            <TextareaAutosize minRows={1} maxRows={4} type="text"placeholder='Add Event Name' value={events.title} onChange={updateTitle} className="text-area"/>
        </div>
         <p>Description</p>
        <div>
        <TextareaAutosize minRows={1} maxRows={4} type="text"placeholder='Add Description' value={events.description} onChange={updateDescription} className="text-area"/>
        </div>
         <div className='date-pick'>
        <input type="datetime-local" value={events.start} onChange={updateStart} />
        <input type="datetime-local" value={events.end} onChange={updateEnd} />
        </div>
         <div className='button-flex'>
         <button onClick={handleClick} className="close-button">OK</button> 
         <button onClick={(e)=>{closeUpdateBox();}} className="cancel-button">
        Cancel
        </button>
        </div>
      </div>
    
    {dialogueBox?
      <ErrorDialogueBox status={displayStatus} displayError={displayError}  closeErrorDialogueBox={closeErrorDialogueBox}/>
      : " "
    }
    </>,
     document.getElementById("portal")
  )
}

export default UpdateDialogueBox
