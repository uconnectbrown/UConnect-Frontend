import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Button from '@material-ui/core/Button'
import getCroppedImg from './cropImage'

// const img = this.state.imageUrl;
//   'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

function Crop(props) {
    const img = props.img
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const makeCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels)
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <div>
        <Cropper
          image={img}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        {/* <Button
          onClick={makeCroppedImage}
          variant="contained"
          color="primary"
        >
          Save Crop
        </Button> */}
        {/* {croppedImage && (<img src={croppedImage} alt="cropped" />)} */}
        {/* {croppedImage && (croppedImage)} */}
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
    </div>
  )
}

export default Crop