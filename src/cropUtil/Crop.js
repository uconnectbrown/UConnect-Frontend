import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { db, auth } from "../firebase";

import { generateDownload } from "../cropUtil/cropImage";

var atob = require("atob");

function Crop(props) {
  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    db.collection("profiles")
      .doc(auth.currentUser.email.split("@")[0])
      .onSnapshot((doc) => {
        props.update(doc.data().imageUrl);
      });
  }, []);

  const dataURItoBlob = (dataURI) => {
    dataURI = dataURI + "";
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  function onDownload() {
    generateDownload(image, croppedArea).then((url) => {
      console.log(url);
    });
  }

  return (
    <div className="crop-container">
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="container-buttons">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          color="default"
          onClick={triggerFileSelectPopup}
          style={{ marginRight: "10px" }}
        >
          Upload
        </Button>
        <Button variant="contained" color="default" onClick={onDownload}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default Crop;
