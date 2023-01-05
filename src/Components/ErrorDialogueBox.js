import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import "../styles/ErrorDialogueBox.scss";
const ErrorDialogueBox=({status,displayError,closeErrorDialogueBox}) => {

  return (
    <div  className='error-dialogue-box-container' >
      <div className='dialogue-box-header'>Error:{status} </div> 
        <div className='error-dialogue-box-pop-up'>
            <p>{displayError}</p>
            <button className='error-ok-button' onClick={closeErrorDialogueBox}>OK</button>
        </div>
        
    </div>
  )
}

export default ErrorDialogueBox
