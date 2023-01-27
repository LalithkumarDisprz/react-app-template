import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../styles/EventsAttachment.scss";
const EventsAttachment = ({ display }) => {
  return (
    <div className="display-attachment">
      <a href={display.content} download={display.content}>
        Download Attachment
      </a>
      <div>
        <FontAwesomeIcon icon={faDownload} />
      </div>
    </div>
  );
};

export default EventsAttachment;
