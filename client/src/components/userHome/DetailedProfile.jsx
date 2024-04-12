import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubscription, getUserById } from '../../helper/helper';
import Navbar from './Navbar';
import { calculateAge } from "../../helper/helper";
import jobImage from '../../assets/job.png'
import instituteImage from '../../assets/institute.png'
import religionImage from '../../assets/religion.png'
import smokeImage from '../../assets/smoke.png'
import drinkImage from '../../assets/drink.png'
import heightImage from '../../assets/height.png'
import { MdBlock } from "react-icons/md";
import { MdReportGmailerrorred } from "react-icons/md";
import iconText from '../../assets/logo.png'
import { Circles } from 'react-loader-spinner'
import SubscribeDialogue from './Subscribe/SubscribeDialogue';
const DetailedProfile = () => {
    const [userData,setUserData]=useState([])
    const [loading, setLoading] = useState(true);
    const [subscribed,setSubscribed]=useState(false)
  const { userId } = useParams();
  const navigate=useNavigate()
  const handleHome=()=>{
    window.__isReactComponentRendered__ = false;
    navigate('/userhome')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
  
        if (userId) {
          const user = await getUserById(userId);
          setUserData(user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched (or if there's an error)
      }
    };
  
    fetchData();
  }, [userId]);
const sendMessage=async()=>{
  const res=await getSubscription()
  if(res === 200){
    navigate(`/message/${userId}`)
  }else if(res === 201)
    setSubscribed(true)
}
const closeMessage=()=>{
  setSubscribed(false)
}
  return (
    <>
     <div
        className="container-fluid  mt-0"
        style={{ height: "auto", backgroundColor: "#000" }}
      >
         
         <SubscribeDialogue open={subscribed} userData={userData} close={closeMessage}/>
         
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
              overflowX:'hidden'
            }}
          >
           <div className="mt-2" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img
          src={userData?.photoUpload?.[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgJc2kkGGn8Drj0k4Z5psNnldyam7ccYL1Kg&usqp=CAU'}
          style={{ height: '15vw', width: '15vw', borderRadius: '50%' ,border:'gray solid'}}
          alt=""
        />
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
  </div>

{userData?.jobTitle && (
  <div className="col-12 ps-3 pt-4" style={{}}>
 <img src={jobImage} alt="" />
    <span className="ms-3 text-light">{userData.jobTitle}</span>
  </div>
)}
{userData?.schoolName && (
  <div className="col-12 ps-3 pt-3 text-light">
    <img src={instituteImage} alt="" />
    <span className="ms-3">{userData.schoolName}</span>
  </div>
)}
{userData?.bio?<>
              <div className="pt-3">
              <div className="ms-2 text-light d-flex flex-wrap">
              {userData.bio}
                </div></div>
                <div className="mt-2 d-flex justify-content-center ">
    <button style={{ height: '7vh', width: '16vw',backgroundColor:'#DA2A59',border:'none',color:'white',fontSize:'18px',borderRadius:'10px' }}onClick={sendMessage}>Send Message</button>
</div></>: <div className="mt-4 d-flex justify-content-center ">
    <button style={{ height: '7vh', width: '16vw',backgroundColor:'#DA2A59',border:'none',color:'white',fontSize:'18px',borderRadius:'10px' }} onClick={sendMessage}>Send Message</button>
</div>}

                <div
              className="col-4  pt-4 text-light "
              style={{ display: "flex", height: "50px" }}
            >{userData?.height &&
              <>
              <img src={heightImage} alt="" />
              <span className="ms-2">
                 {userData.height}
              </span>{" "}
              <span className="ms-3">|</span></>}
              {userData?.drinkingHabbit &&
              <>
              <img src={drinkImage} className="ms-2" alt="" />
              <span className="ms-2">
                {userData.drinkingHabbit }
              </span>{" "}
              <span className="ms-3">|</span></>}
              {userData?.smokingHabbit && 
              <>
              <img src={smokeImage} className="ms-2 mb-1" alt="" />
              <span className="ms-2 ">
               {userData.smokingHabbit}
              </span>{" "}
              <span className="ms-3">|</span></>}
              {userData?.religion &&
              <>
              <img src={religionImage} className="ms-2" alt="" />
              <span className="ms-2 ">
                 {userData.religion}
              </span>
              </>}
            </div>
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
{userData?.photoUpload &&
  userData.photoUpload
    .filter((imageUrl) => imageUrl)
    .slice(1)
    .map((imageUrl, index) => (
      <div key={index} className="col-4 ps-3 pb-4" style={{ position: 'relative' }}>
        <img
          src={imageUrl}
          alt={`Image ${index + 1}`}
          style={{ width: "18vw", height: "30vh", objectFit: "fill" }}
        />
      </div>
    ))}
     </div>
        </div>
        <div
          className="position-absolute link"
          onClick={handleHome}
          style={{ left: "1vw", top: "2vh", zIndex: "1", width: "10px" }}>
          <img
            src={iconText}
            style={{ width: "5vw", left: "3px" }}
            alt=""
          />
        </div>
        <div
  className="position-absolute text-light"
  style={{ right: "6vw", bottom: "3.5vh", zIndex: "1", display: "flex", alignItems: "center" }}
>
  <MdBlock style={{ marginRight: '5px' }} />
  <span>Block</span>
  <span className='ms-3'><MdReportGmailerrorred/></span>
  <span>Report Profile</span>
</div>
      </div>
    </>
  );
};

export default DetailedProfile;
