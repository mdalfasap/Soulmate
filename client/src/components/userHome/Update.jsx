import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,

} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import { submitDetails } from "../../helper/helper";
import { FaMobileAlt } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import UpdateInput from "./UpdateInput";
import { GiThermometerScale } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BiDrink } from "react-icons/bi";
import { FaSmoking } from "react-icons/fa";
import { calculateAge, fetchUserData } from "../../helper/helper";
import { useNavigate } from "react-router-dom";

function Update({ open, onClose }) {
  const [userData, setUserData] = useState({});
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [name]: Array.isArray(prevUserData[name])
          ? value.split(',')
          : value,
      };
    });

  };
  
const handleSubmit= async (e) => {
    e.preventDefault()
      try {
        submitDetails(userData)
        .then((data) => {
        
          const { error } = data;
      
          if (!error) {
            navigate("/profile");
            toast.success('profile updated');
            onClose();
          } else {
            toast.error('Submit failed');
          }
        })
        .catch((err) => {
          toast.error('something went wrong');
        });
      } catch (error) {
        console.error('Error during submit:', error);
        toast.error('Failed to submit. Please try again.');
      } 
    };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setUserData(userData);
        console.log(userData)
      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <Toaster></Toaster>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Dialog
          open={open}
          onClose={onClose}
          sx={{ background: "transparent", textAlign: "center" }}
        >
          <div
            style={{
              backgroundColor: "rgba(104, 104, 104)",
              padding: "5px",
              overflow:'hidden'
            }}
          >
            <DialogContent>
              <div className="d-flex txtbox text-center ">
                <UpdateInput
                  icon={FaRegUser}
                  value={
                    userData &&
                    `${userData.firstName}${" "}${userData.lastName}`
                  }
                  placeholder="name"
                  locked
                ></UpdateInput>
                <UpdateInput
                  icon={GiThermometerScale}
                  value={userData && userData.height}
                  name='height'
                  sec
                  placeholder="height"
                   onChange={handleChange} 
                ></UpdateInput>
              </div>
              <div className="mt-3 d-flex txtbox text-center">
                <UpdateInput
                  icon={LiaBirthdayCakeSolid}
                  value={
                    userData?.dateOfBirth && calculateAge(userData.dateOfBirth)
                  }
               
                  placeholder="age"
                  locked
                ></UpdateInput>
                <UpdateInput
                  icon={FaBook}
                  sec
                  value={userData?.religion && userData.religion}
                  handleChange={handleChange}
                  name='religion'
                  placeholder="religion"
                   onChange={handleChange} 
                ></UpdateInput>
              </div>
              <div className="mt-3 d-flex txtbox text-center">
                <UpdateInput large placeholder="Add bio"
                name='bio'
                value={userData?.bio && userData.bio}
                onChange={handleChange} 
                ></UpdateInput>
                <UpdateInput
                  icon={MdOutlineWork}
                  name='jobTitle'
                  sec
                  value={userData?.jobTitle && userData.jobTitle}
                  placeholder="jobTilte"
                   onChange={handleChange} 
                ></UpdateInput>
              </div>
              <div className="mt-3 d-flex txtbox text-center">
                <UpdateInput
                  icon={FaMobileAlt}
                  value={userData && userData.number}
                  placeholder="mobile"
                  locked
                ></UpdateInput>
                <UpdateInput
                name='schoolName'
                  icon={MdOutlineCastForEducation}
                  value={userData?.schoolName && userData.schoolName}
                  lowpad
                  sec
                  placeholder="education"
                  onChange={handleChange} 
                ></UpdateInput>
              </div>
              <div className="mt-3 d-flex txtbox text-center">
                <UpdateInput
                name='email'
                  icon={MdOutlineMailOutline}
                  value={userData?.email && userData.email}
                  placeholder="email"
                //   locked
                ></UpdateInput>
                <UpdateInput
                  icon={FaSmoking}
                  lowpad
                  sec
                  name='smokingHabbit'
                  value={userData?.smokingHabbit && userData.smokingHabbit}
                  placeholder="smoking habbit"
                  onChange={handleChange} 
                ></UpdateInput>
              </div>
              <div className="mt-3 d-flex txtbox text-center">
                <UpdateInput
                  icon={FaTransgender}
                  value={userData?.gender && userData.gender}
                  onChange={handleChange} 
                  placeholder="gender"
                  locked
                ></UpdateInput>
                <UpdateInput
                  icon={BiDrink}
                  lowpad
                  name='drinkingHabbit'
                  sec
                  value={ userData?.drinkingHabbit && userData.drinkingHabbit}
                   onChange={handleChange} 
                  placeholder="drinking habbit"
                ></UpdateInput>
              </div>

              <div className="mt-3 d-flex txtbox text-center">
                <UpdateInput
                  icon={CiLocationOn}
                  name='city'
                  value={userData?.city && userData.city}
                  placeholder="location"
                   onChange={handleChange} 
                ></UpdateInput>
                <UpdateInput
                  icon={FaMobileAlt}
                  lowpadlarge
                  name='describeYourself'
                  sec
                  value={
                    Array.isArray(userData?.describeYourself)
                      ? userData.describeYourself.map(value => value.split(',')).join(',')
                      : userData?.describeYourself
                  }
                  placeholder="Interest"
                   onChange={handleChange} 
                />
              </div>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#F42D5D",
                  color: "white",
                  border: "none",
                  width: "100px",
                  height: "40px",
                  borderRadius: "10px",
                }}
                onClick={handleSubmit}
              >
                Save
              </button>
            </DialogActions>
          </div>
        </Dialog>
      </form>
    </>
  );
}

export default Update;
