import React, { useState } from "react";
import { options } from "../../Utils/Constants";
import "../../styles/DeleteDialogueBox.scss";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST, CHANGE_DATE, createAction } from "../../redux/actions";
import { deleteAppointment } from "../../Services/apiData";
const DeleteDialogueBox = ({ displayDeleteDialogue, events }) => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.datereducer.date);
  const deletePost = async () => {
    var response = await deleteAppointment(events.id, events.date);
    if (response.status === 204) {
      dispatch({
        type: ADD_POST,
      });
      dispatch(createAction(CHANGE_DATE, date));
      displayDeleteDialogue();
    } else alert(response.data);
  };

  return (
    <>
      <div
        className="confirmation-box-background"
        onClick={(e) => e.stopPropagation()}
      >
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
