import moment from "moment";
import React, { useState } from "react";
import { createContext } from "react";
import "../../styles/EventContents.scss";
import EditOptionsBox from "./EditOptionsBox";
import UpdateDialogueBox from "../PopUps/UpdateDialogueBox";
import DeleteDialogueBox from "../PopUps/DeleteDialogueBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
export const UserContext = createContext();
const EventContents = ({ events, changeIndexOfTimeline }) => {
  const [displayUpdateBox, setDisplayUpdateBox] = useState(false);
  const [displayDeleteBox, setDisplayDeleteBox] = useState(false);
  const [openEditOptions, setEditOptions] = useState(false);
  const difference =
    moment(events.endTime).format("HH") - moment(events.startTime).format("HH");
  const temp = moment(events.startTime).format("mm");
  const topStyle = (100 * parseInt(temp)) / 60;
  const correctedHeight = 100 - topStyle;
  const additionalPixel = 60 - parseInt(moment(events.endTime).format("mm"));
  const pixel = difference * 60 - additionalPixel;
  const startToDecimal = moment(events.startTime).format("HH:mm");
  const endToDecimal = moment(events.endTime).format("HH:mm");
  const duration =
    timeToDecimal(moment(events.endTime).format("HH:mm")) -
    timeToDecimal(moment(events.startTime).format("HH:mm"));
  function timeToDecimal(t) {
    var arr = t.split(":");
    var dec = parseInt((arr[1] / 6) * 10, 10);
    return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
  }
  const editOptions = (e) => {
    setEditOptions(true);
    changeIndexOfTimeline(true);
    e.stopPropagation();
  };
  const closeEditOptions = () => {
    setEditOptions(false);
    changeIndexOfTimeline(false);
  };
  const displayUpdateDialogue = () => {
    setDisplayUpdateBox(!displayUpdateBox);

    setEditOptions(false);
    changeIndexOfTimeline(false);
  };
  const displayDeleteDialogue = () => {
    setDisplayDeleteBox(!displayDeleteBox);
    setEditOptions(false);
    changeIndexOfTimeline(false);
  };
  const eventStyle = {
    top: `${topStyle}%`,
    height:
      moment(events.startTime).format("HH") <
      moment(events.endTime).format("HH")
        ? timeToDecimal(endToDecimal) ===
          timeToDecimal(startToDecimal) + difference
          ? `calc(${100 * difference}% - 2px)`
          : `calc(${correctedHeight}% + ${pixel - 2}px)`
        : `calc((${correctedHeight}% -  ${additionalPixel - 2}px)`,
    fontSize: duration < 0.5 ? (duration < 0.3 ? "6px" : "8px") : "12px",
    marginTop: duration >= 1 ? "4px" : "2px",
  };
  return (
    <>
      <div
        style={eventStyle}
        className={`overlay ${duration < 0.5 && "overlay-hover "} ${
          events.type === "Reminder" && "reminder-overlay"
        } ${events.type === "Out of office" && "no-schedule-overlay"}`}
        onClick={editOptions}
      >
        <div
          className={`contents-container ${
            duration < 0.7 && "overlay-contents"
          } `}
        >
          <div className="contents">
            <div>{events.title}</div>
          </div>
          <div
            className={`contents time-font-style ${
              duration < 0.7 && "time-font-less-duration"
            }`}
          >
            <div>{moment(events.startTime).format("HH:mm")}</div>
            <div>-</div>
            <div>{moment(events.endTime).format("HH:mm")}</div>
          </div>
        </div>
      </div>
      
        {openEditOptions ? (
          <EditOptionsBox
            events={events}
            displayUpdateDialogue={displayUpdateDialogue}
            displayDeleteDialogue={displayDeleteDialogue}
            closeEditOptions={closeEditOptions}
          />
        ) : (
          " "
        )}
        {displayUpdateBox ? (
          <UpdateDialogueBox  updateEvents={events} closeUpdateBox={displayUpdateDialogue} />
        ) : (
          " "
        )}
        {displayDeleteBox ? (
          <DeleteDialogueBox events={events} displayDeleteDialogue={displayDeleteDialogue} />
        ) : (
          " "
        )}
      
    </>
  );
};

export default EventContents;
