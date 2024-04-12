import React, { useState,useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURLtoFile";
import {fetchUserData, submitDP, submitPhotos } from "../../helper/helper";
import toast, {Toaster} from "react-hot-toast";


export default function CropImageUserInfo(props) {

  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();
  const [currentImage,setCurrentImage]=useState()
  const [upload,setUpload]=useState(true)
  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
 
  
  const uploadImage = async () => {
  
    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrlToFile = dataURLtoFile(canvasDataUrl, 'image.jpeg');
    
    const formdata = new FormData();
    formdata.append("imageUpload", convertedUrlToFile);
    props.add ? await submitPhotos(formdata) : await submitDP(formdata);
    props.onClose();
    setCurrentImage(canvasDataUrl);
    toast.success('Image uploaded successfully!', {
      duration: 2000,
    });

  };


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



const btnStyle = {
  backgroundColor:'#F42D5D',
  borderRadius:'5px',
  width:'100%',
  border:'none',
  marginRight:'10px'
};
  const containerStyle = {

    height: "50vh",
    width: "40%",
	marginLeft:'2%'
  };

  const containerCropperStyle = {
	
    height: "90%",
	width:'100%',
    padding: "10px",
  };

  const cropperStyle = {
    height: "100%",
    width: "100%",
    position: "relative",
  };



  const containerButtonsStyle = {
    // border: "1px solid #f5f5f5",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setCurrentImage(userData);
      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, [image,props.onClose]);
  return (
    <div style={containerStyle}><Toaster/>
      <div style={containerCropperStyle}>
        {image ? (
          <>
            <div style={cropperStyle}>
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

          </>
        ) :  <>
        
      {!props.add&&  <img className="ms-5"  style={{height:'100%',width:'80%'}} 
       src={currentImage && currentImage.photoUpload[0]}
        />}
        </>}
      </div>

      <div className="mt-2" style={containerButtonsStyle}>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />{image&&
		<button
          variant='contained'
          color='primary'
          onClick={()=>setImage(null)}
          style={btnStyle}
        >
         Clear
        </button>}
        {!image&&
        <button
          variant='contained'
          color='primary'
          onClick={triggerFileSelectPopup}
          style={btnStyle}
        >
          Choose Image
        </button>
       }

		{image&&
    <>{upload&&
         <button
         variant='contained'
         color='primary'
         onClick={uploadImage}
         style={btnStyle}
       >
         Upload
       </button>}
       {!upload&&
        <button
        variant='contained'
        color='primary'
        onClick={uploadImage}
        style={btnStyle}
      >
        Upload
      </button>}
</>
       }
      </div>
    </div>
  );
}
