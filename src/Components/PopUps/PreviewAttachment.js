import React from 'react'
import { options } from '../../Utils/Constants'
import "../../styles/PreviewAttachment.scss"
const PreviewAttachment = ({previewOptions,media,typeOfFile,name}) => {
  
  return (
    <>
    <div className='preview-background' >
    </div>
    <div  className='preview-container'>
      {typeOfFile==="image"?
      <img src={media} className="preview-img"/>:<a href={media} className="preview-pdf">{name}</a>}
      <div className='button-flex preview-buttons'>
      <button className='ok-button' onClick={()=>{previewOptions(true)}}>Upload</button>
      <button className='cancel-button' onClick={()=>{previewOptions(false)}}>{options.delete}</button>
      </div>
    </div>
    </>
  )
}

export default PreviewAttachment
