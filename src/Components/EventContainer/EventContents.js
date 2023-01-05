import moment from "moment";
import React, { useState } from "react";
import { createContext } from "react";
import "../../styles/EventContents.scss";
// import useScrollLock from "../useScrollLock";
import EditOptionsBox from "./EditOptionsBox";
import UpdateDialogueBox from "../UpdateDialogueBox";
import DeleteDialogueBox from "../DeleteDialogueBox";
export const UserContext = createContext();
const EventContents = ({ events }) => {
  // const [scrollLock,toggle]=useScrollLock()
  // const [scrollLock, setScrollLock] = useState(false);
  // const bodyStyle = document.body.style;
  const [displayUpdateBox, setDisplayUpdateBox] = useState(false);
  const [displayDeleteBox, setDisplayDeleteBox] = useState(false);
  const [openEditOptions, setEditOptions] = useState(false);
  const difference =
    moment(events.endTime).format("HH") - moment(events.startTime).format("HH");
  const temp = moment(events.startTime).format("mm");
  const topStyle = (100 * parseInt(temp)) / 60;
  const correctedHeight = 100 - topStyle;
  const additionalPixel =
    60 - (parseInt(moment(events.endTime).format("mm")));
  const temp2 = 60 - parseInt(moment(events.endTime).format("mm"));
  const pixel = difference * 60 - temp2;
  const startToDecimal = moment(events.startTime).format("HH:mm");
  const endToDecimal = moment(events.endTime).format("HH:mm");
  const duration=(timeToDecimal(moment(events.endTime).format("HH:mm")) -
  timeToDecimal(moment(events.startTime).format("HH:mm")));
  var moveLeft= 5;
  function timeToDecimal(t) {
    var arr = t.split(":");
    var dec = parseInt((arr[1] / 6) * 10, 10);

    return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
  }
  const editOptions =(e) => {
    setEditOptions(true);
    e.stopPropagation();
  };
  const closeEditOptions=()=>
  {
    setEditOptions(false);
  }
  const scrollLockFromDialogueBox = () => {
  };
  const displayUpdateDialogue = () => {
    setDisplayUpdateBox(!displayUpdateBox);
    setEditOptions(false);
  };
  const displayDeleteDialogue =()=> {
    setDisplayDeleteBox(!displayDeleteBox);
    setEditOptions(false);
  };
 const eventStyle={
  top: `${topStyle}%`,
  height:
    moment(events.startTime).format("HH") <
    moment(events.endTime).format("HH")
      ? timeToDecimal(endToDecimal) ===
        timeToDecimal(startToDecimal) + difference
        ? `${100 * difference}%`
        : `calc(${correctedHeight}% + ${pixel}px)`
      : `calc((${correctedHeight}% -  ${additionalPixel}px)`,
  fontSize:
    (duration)<
    0.50
      ? (duration) <
    0.30 ? "6px":"10px"
      : "12px",
      }
     
  return (
    <>
      <div
        style={eventStyle}
        className={`overlay ${duration<0.30 && "overlay-hover "} `}
        onClick={editOptions}
      >
        <div className="contents-container">
        <div className="contents">
        <div>Title:{events.title}</div>
        <div>description:{events.description}</div>
        <div>startTime:{moment(events.startTime).format("HH:mm")}</div>
        <div>endTime:{moment(events.endTime).format("HH:mm")}</div>
        </div>
      </div>
      </div>
      <UserContext.Provider value={events}>
        {openEditOptions ? (
          <EditOptionsBox
            displayUpdateDialogue={displayUpdateDialogue}
            displayDeleteDialogue={displayDeleteDialogue}
            scroll={true}
            closeEditOptions={closeEditOptions}
          />
        ) : (
          " "
        )}
        {displayUpdateBox ? (
          <UpdateDialogueBox
            closeUpdateBox={displayUpdateDialogue}
            lockScroll={scrollLockFromDialogueBox}
          />
        ) : (
          " "
        )}
        {displayDeleteBox?
        <DeleteDialogueBox displayDeleteDialogue={displayDeleteDialogue}/>: " "}
      </UserContext.Provider>
    </>
  );
};

export default EventContents;
