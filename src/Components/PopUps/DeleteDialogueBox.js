import React, { useState } from "react";
import { options } from "../../Utils/Constants";
import { useContext } from "react";
import "../../styles/DeleteDialogueBox.scss";
import { UserContext } from "../EventContainer/EventContents";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ADD_POST, CHANGE_DATE, createAction } from "../../redux/actions";
import { apiRequest } from "../../Services/Services";
import { REQUEST_TYPES } from "../../Utils/RequestHeaderEnums";
const DeleteDialogueBox = ({ displayDeleteDialogue,events }) => {
  const dispatch = useDispatch();
  // const post = useContext(UserContext);
  const date = useSelector((state) => state.datereducer.date);
  const deletePost = async () => {
    // axios
    //   .delete(`http://localhost:5169/api/appointments/${post.id}`)
    await apiRequest({
      url: `${events.id}/${events.date}`,
      method: REQUEST_TYPES.DELETE,
      
    
    })
      .then((response) => {
        dispatch({
          type: ADD_POST,
        });

        dispatch(createAction(CHANGE_DATE, date));

        displayDeleteDialogue();
      })
      .catch((error) => alert(error.response.data));
  };
  return (
    <>
      <div className="confirmation-box-background">
        <div className="display-pop-up" onClick={(e) => e.stopPropagation()}>
          <p>Are you sure You want to delete ?</p>
          <div className="confirmation-button-flex">
            <button className="confirmation-button " onClick={deletePost}>
              {options.delete}
            </button>
            <button
              className="confirmation-button add-color"
              onClick={displayDeleteDialogue}
            >
              {options.cancel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialogueBox;
