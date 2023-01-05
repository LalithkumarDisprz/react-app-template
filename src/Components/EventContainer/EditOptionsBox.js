import React, { useState,useContext,useEffect } from 'react'
import { options } from '../../Utils/Constants'
import "../../styles/EditOptionsBox.scss"
import { UserContext } from './EventContents'
// import useScrollLock from '../useScrollLock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { eventsAction } from '../../redux/actions'
import moment from 'moment'
const EditOptionsBox = ({displayUpdateDialogue,displayDeleteDialogue,scroll,closeEditOptions}) => {
  const events=useContext(UserContext)
  const [openUpdate,setOpenUpdate]=useState(false)
  const[openDelete,setOpenDelete]=useState(false)
     
  return (
    <>
    <div className='edit-options-background' onClick={closeEditOptions}>
      </div>
    <div className={`edit-options-container`} onClick={(e)=>e.stopPropagation()}>
      <div >
      <p>Choose your Option</p>
      <FontAwesomeIcon icon={faXmark} className='close-icon' size={"xl"}onClick={(e)=>{ closeEditOptions();e.stopPropagation()}}/>
      </div>
      <div className='edit-options-sub-flex'>
      <p>Title:</p>
      <p>{events.title}</p>
      </div>
      <div className='edit-options-sub-flex'>
        <p>Time:</p>
        <p>{moment(events.startTime).format("HH:mm")}</p>
        <p>-</p>
        <p>{moment(events.endTime).format("HH:mm")}</p>
      </div>
      <div className='edit-update-button'>
      <button onClick={displayUpdateDialogue}>{options.edit}</button>
      <button className='add-color' onClick={displayDeleteDialogue}>{options.delete}</button>
      </div>
    </div>
   </>
     
    
  )
}

export default EditOptionsBox
