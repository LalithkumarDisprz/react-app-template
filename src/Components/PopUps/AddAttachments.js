import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../styles/AddAttachment.scss";
import PreviewAttachment from "./PreviewAttachment";
const AddAttachments = ({ boxName, getData, getType, getName }) => {
  const [preview, setPreview] = useState(false);
  const [previewMedia, setPreviewMedia] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const upload = async (e) => {
    const file = e.target.files[0];
    var checking = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
    const image = checking.includes(file.type);
    if (image) {
      var type = "image";
    } else {
      type = "pdf";
    }
    setPreview(true);
    const base64 = await convertBase64(file);
    setPreviewMedia(base64);
    setFileName(file.name);
    setFileType(type);
    e.target.value = null;
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const previewOptions = (value) => {
    if (value === false) {
      setPreview(false);
      setFileType("");
      setPreviewMedia("");
      setFileName("");
    } else {
      getType(fileType);
      getData(previewMedia);
      getName(fileName);
      setPreview(false);
    }
  };
  return (
    <>
      <div className="attachment-container">
        <FontAwesomeIcon icon={faPaperclip} className="clip-icon" />
        <label for="file-upload" className="attachment-button">
          {(boxName = "addevents" ? "Add Attachments" : "Add New Events")}
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".jpg, .jpeg, .png,.webp,.pdf"
          onChange={upload}
          className="input-hide-button"
        />
      </div>
      {preview ? (
        <PreviewAttachment
          previewOptions={previewOptions}
          media={previewMedia}
          typeOfFile={fileType}
          name={fileName}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AddAttachments;
