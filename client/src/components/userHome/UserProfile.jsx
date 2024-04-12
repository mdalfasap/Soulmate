import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Dialog,
  DialogContent,
  DialogActions,

} from "@mui/material";
import { fetchUserData} from "../../helper/helper";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoSettingsOutline } from "react-icons/io5";
import { calculateAge,deletePhotos } from "../../helper/helper";
import Settings from "./Settings";
import Update from "./Update";
import DpChange from "./DpChange";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import AddImage from "./AddImage";
import { Circles } from 'react-loader-spinner'
import { IoTrashOutline } from "react-icons/io5";
import iconText from '../../assets/logo.png'


function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const [userData, setUserData] = useState(null);
  const [addImage, setAddImage] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [settings, setSettings] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleCloseDialog = () => {
    setOpenUpdateDialog(false);
    setSettings(false);
    setProfileImage(false);
    setAddImage(false)
  };
  const handleFileChange = () => {
    handleCloseDialog()
    setProfileImage(true);

  };

  const handleSettings = () => {
    handleCloseDialog()
    setSettings(true);

  };

  const handleEdit = () => {
    handleCloseDialog()
    setOpenUpdateDialog(true);
  };
  const handleAddPhoto=()=>{
    handleCloseDialog()
    setAddImage(true)
  }
const confirmDelete=()=>{
 deletePhotos(deleteIndex)
  setDeleteConfirmation(false);
  setDeleteIndex(null);
  setTimeout(() => {
    window.location.reload();
  }, 1000);


}
const deletePhoto=(index)=>{
  setDeleteConfirmation(true)
  setDeleteIndex(index)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await fetchUserData();
      setUserData(userData);
    } catch (error) {

    } finally {
      setLoading(false); // Set loading to false after data is fetched (or if there's an error)
    }
  };

  fetchData();
}, [openUpdateDialog]);

  const percentage = 66;
  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setDeleteIndex(null);
  };
  return (
    <>
 <Dialog
        open={deleteConfirmation}
        onClose={!deleteConfirmation}
        sx={{ background: "transparent", textAlign: "center" }}
      >
        <div style={{ backgroundColor: "rgba(104, 104, 104)", padding: "20px" }}>
          <DialogContent>
            <p>Are you sure you want to delete this?</p>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <button
              onClick={confirmDelete}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                width: "100px",
                height: "40px",
                borderRadius: "10px",
              }}
            >
              Confirm
            </button>
            <button
              onClick={cancelDelete}
              style={{
                backgroundColor: "gray",
                color: "white",
                border: "none",
                width: "100px",
                height: "40px",
                borderRadius: "10px",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Update open={openUpdateDialog} onClose={handleCloseDialog} />
      <Settings open={settings} onClose={handleCloseDialog} />
      <DpChange open={profileImage} onClose={handleCloseDialog} />
      <AddImage open={addImage} onClose={handleCloseDialog} />
      <div
        className="container-fluid  mt-0"
        style={{ height: "auto", backgroundColor: "#000" }}
      >

        <div className="row ">
          <div
            className="col-12"
            style={{
              background: `linear-gradient(rgb(0,0,0) 15%,rgb(50, 0, 22),rgb(100, 1, 50),rgb(161, 2, 82))`,
              height: "70px",
              overflowY:'scroll',
             
            }}
          >
       {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)", // Adjust the opacity for the desired blur effect
            zIndex: 1000, // Make sure the overlay is on top
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Circles height="50" width="50" color="white" visible={true} />
        </div>
      )}
            <Navbar></Navbar>
          </div>
        </div>
        <div className="row">
          <div
            className="col-4 pt-3 pb-4 "
            style={{
              backgroundColor: "black",
              overflowY: "scroll",
              height: "90vh",
            }}
          >
            <div
              className="mt-2"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={userData?.photoUpload[0]?userData.photoUpload[0]:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJc2kkGGn8Drj0k4Z5psNnldyam7ccYL1Kg&usqp=CAU' }
                style={{ height: "15vw", width: "15vw", borderRadius: "50%",border:'gray solid' }}
                alt=""
              />
              <div
                style={{ position: "absolute", color: "white", bottom: "10px" }}
              >
                <button
                  onClick={handleFileChange}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                  }}
                >
                  {" "}
                  <CameraAltIcon />{" "}
                </button>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "2.5vw", color: "white" }}>
                {userData && userData.firstName} {userData && userData.lastName}
              </p>
              {userData?.dateOfBirth && (
                <div
                  style={{
                    position: "absolute",
                    justifyContent: "center",
                  }}
                  className="pt-5"
                >
                  {" "}
                  <p style={{ fontSize: "1.5vw", color: "white" }}>
                    {calculateAge(userData.dateOfBirth)} |{"  "}
                    {userData?.city && userData.city}
                  </p>
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  right: "1vw",
                  display: "flex",
                  top: "-32vh",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <a onClick={handleSettings}>
                  {" "}
                  <IoSettingsOutline
                    style={{ fontSize: "2.5vw", cursor: "pointer" }}
                  />
                </a>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "0px",
                  width: "60px",
                  height: "80px",
                  display: "flex",
                  top: "-7vh",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: "#F42D5D",
                    textColor: "white",
                    trailColor: "lightgray",
                  })}
                />
                <button
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(10, 82, 82, 0.2)",
                    width: "5vw",
                    height: "8vh",
                    borderRadius: "10px",
                    border: "none",
                    color: "white",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </div>

            {userData?.jobTitle && (
              <div className="col-12 ps-2 pt-4" style={{}}>
                <img src="src\assets\job.png" alt="" />
                <span className="ms-3 text-light">{userData.jobTitle}</span>
              </div>
            )}
            {userData?.schoolName && (
              <div className="col-12 ps-2 pt-2 text-light">
                <img src="src\assets\institute.png" alt="" />
                <span className="ms-3">{userData.schoolName}</span>
              </div>
            )}
             {userData?.bio?
              <div className="pt-3">
              <div className="ms-2 text-light d-flex flex-wrap">
              {userData.bio}
                </div></div>
              :<div className="pt-3">
              <div className="ms-2 d-flex flex-wrap" style={{color:'gray'}}>
              You didnt add any bio
                </div></div>}
              <div
              className="col-4 ps-2 pt-4 text-light "
              style={{ display: "flex", height: "50px" }}
            >{userData?.height &&
              <>
              <img src="src\assets\height.png" alt="" />
              <span className="ms-3">
                 {userData.height}
              </span>{" "}
              <span className="ms-3">|</span></>}
              {userData?.drinkingHabbit &&
              <>
              <img src="src\assets\drink.png" className="ms-3" alt="" />
              <span className="ms-3">
                {userData.drinkingHabbit }
              </span>{" "}
              <span className="ms-2">|</span></>}
              {userData?.smokingHabbit && 
              <>
              <img src="src\assets\smoke.png" className="ms-3 mb-1" alt="" />
              <span className="ms-3 ">
               {userData.smokingHabbit}
              </span>{" "}
              <span className="ms-2">|</span></>}
              {userData?.religion &&
              <>
              <img src="src\assets\religion.png" className="ms-3 " alt="" />
              <span className="ms-3 ">
                 {userData.religion}
              </span>
              </>}
            </div>
            {/* )} */}
             
            {userData?.describeYourself && (
              <div className="pt-4">
                <div className="ms-3 text-light d-flex flex-wrap">
                  {userData.describeYourself.map((value, index) => (
                    <div key={index} className="description-item">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            )}
                  
            <button
              className="ms-5 mt-2"
              style={{
                textAlign: "center",
                width: "300px",
                border: "none",
                color: "white",
                borderRadius: "20px",
                height: "40px",
                backgroundColor: "rgba(10, 82, 82, 0.2)",
              }}
            >
              Connect to Instagram
            </button>
          </div>

          <div
            className="col-8 pt-4 "
            style={{
              height: "90vh",
              background:
                "linear-gradient(to top, rgba(229, 43, 90, 0.36),rgba(255, 0, 100, 0.67)25%,rgba(56, 40, 68),rgba(0, 0, 0, 0.7292),rgba(19, 25, 45, 0.1725))",
              display: "flex",
              flexWrap: "wrap",
              overflow: "scroll",
              alignContent: "flex-start",
            }}
          >
{userData &&
  userData.photoUpload
    .filter((imageUrl) => imageUrl)
    .slice(1) // Skip the first item
    .map((imageUrl, index) => (
      <div key={index} className="col-4 ps-3 pb-4" style={{ position: 'relative' }}>
        <div className="link" onClick={() => deletePhoto(index)} style={{ position: 'absolute', right: '15%', top: '0' }}>
          <IoTrashOutline />
        </div>
        <img
          src={imageUrl}
          alt={`Image ${index + 1}`}
          style={{ width: "18vw", height: "30vh", objectFit: "fill" }}
        />
      </div>
    ))}



              <div
                className="d-flex justify-content-center align-items-center ms-3 "
                style={{
                  width: "18vw",
                  height: "30vh",
                  backgroundColor: "#232C52",
                  cursor: "pointer",
              
                }}
                onClick={handleAddPhoto}
              >
                <BiImageAdd size={50} color="white" className="link"/>
              </div>

          </div>
        </div>
        <div
          className="position-absolute link"
          onClick={()=>{
            window.__isReactComponentRendered__ = false;
            navigate('/userhome')
          }}
          style={{ left: "1vw", top: "2vh", zIndex: "1", width: "10px" }}>
          <img
            src={iconText}
            style={{ width: "5vw", left: "3px" }}
            alt=""
          />
        </div>
      </div> 
    </>
  );
}
export default UserProfile;
