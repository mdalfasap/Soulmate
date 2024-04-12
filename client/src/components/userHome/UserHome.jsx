import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import UserIcons from './UserIcons';
import { calculateAge, fetchAllUserData, fetchUserData, getLike, sendLike } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';
import { motion } from 'framer-motion';
import { Circles } from 'react-loader-spinner'

function UserHome() {
  const [loading, setLoading] = useState(true);
  const [allUserData, setAllUserData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [userData, setUserData] = useState(null);
  const [likeIcon, setLikeIcon] = useState(false);
  const [liked,setLiked]=useState()
  const [profile, setProfile] = useState(true);
  const [diamond, setDiamond] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (window.__isReactComponentRendered__) {
      return;
    }

    
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData();
        setUserData(userData);
        if (!userData?.firstName) {
          navigate('/userinfo')
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); 
      }
    };

    const fetchAllusersData = async () => {
      try {
        setLoading(true);
        const usersData = await fetchAllUserData();
        setAllUserData(usersData);
        if (usersData.length > 0) {
          const randomIndex = Math.floor(Math.random() * usersData.length);
          setRandomIndex(randomIndex);
          console.log('Random index:', randomIndex);
        }
      } catch (error) {
        console.error("Error fetching all users data:", error);
      } finally {
        setLoading(false); 
      }
    };

    const fetchDataAndUpdate = async () => {
      await fetchData();
      await fetchAllusersData();
    };

    fetchDataAndUpdate();

    if (!token) {
      navigate("/");
    }

    window.__isReactComponentRendered__ = true;
  }, [likeIcon, diamond,allUserData,loading]);

  const randomUser = allUserData && allUserData.length > 0 ? allUserData[randomIndex] : null;
  useEffect( ()=>{
    const fetch=async()=>{
      console.log(selectedUser._id);
      const likeStatus=await getLike(selectedUser._id)
      setLiked(likeStatus.liked)
    }
   fetch();
  },[selectedUser,randomIndex])
  const handleLike = () => {
    window.__isReactComponentRendered__ = false;
    setLikeIcon(true);
    setLiked(!liked)
    setShowDetails(false);
    sendLike(selectedUser._id,liked)
    setSelectedUser(randomUser);
    setTimeout(() => {
      setLikeIcon(false);
      setProfile(!profile);
    }, 400);
  };

  const handleDiamond = () => {
    window.__isReactComponentRendered__ = false;
    setDiamond(true);
    setShowDetails(false);
    setSelectedUser(randomUser); // Set the selectedUser to the clicked user
    setTimeout(() => {
      setDiamond(false);
      setProfile(!profile);
    }, 400);
  };
  const selectUser = (user) => {
    setSelectedUser(user);}
  const userDetails = (user) => {

    setTimeout(() => {
      setShowDetails(true);
    }, 500);
  };

  const enableUserDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div className="container-fluid bg-dark mt-0" style={{ height: '100vh' }}>
        <div  className="position-absolute" style={{ right: '10px', top:'10px',zIndex: '1' }}>
         <img src="src\assets\logo.png" alt="" style={{width:'6vw'}}/>
        </div>       
        {likeIcon &&
          <div className="position-absolute " style={{ left: '60%', top: '40%', zIndex: '1', transition: '.1s ease-in-out' }}>
            <img src="src\assets\liked.png" alt="" />
          </div>}

        {selectedUser || randomUser ? (
          <>
            {showDetails ? (
              <div onMouseLeave={enableUserDetails}>
                <UserDetails randomUser={selectedUser || randomUser} />
              </div>
            ) : (
              <>
                <div className="position-absolute link anta text-white" style={{ fontSize: '3vw', left: '35%', bottom: '10%', zIndex: '1', lineHeight: '1' }}>
                  <p onMouseEnter={() => userDetails(selectedUser || randomUser)}> {selectedUser?.firstName || randomUser?.firstName}{"  "}{selectedUser?.lastName || randomUser?.lastName} </p>
                  <p className="mt-3" style={{ fontSize: '25px' }}>
                    {(selectedUser || randomUser)?.dateOfBirth && (
                      <>{calculateAge((selectedUser || randomUser).dateOfBirth)} |</>
                    )}{" "}
                    {(selectedUser || randomUser)?.city && (selectedUser || randomUser).city}
                  </p>
                </div>
              </>
            )}
          </>
        ) : null}

        {diamond &&
          <div className="position-absolute " style={{ left: '60%', top: '40%', zIndex: '1', transition: '.1s ease-in-out' }}>
            <img src="src\assets\diamondaction.png" alt="" />
          </div>}
        <div className="row pt-0 ">
          <div
            className="col-4 d-flex align-items-center text-white"
            style={{
              background: `linear-gradient(rgb(0,0,0) 15%,rgb(50, 0, 22),rgb(100, 1, 50),rgb(161, 2, 82))`,
              height: '70px',
            }}
          >  {loading && (
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
            <Navbar small img={userData && userData.photoUpload[0]} fname={userData && userData.firstName}></Navbar>
          </div>
          <div className="col-8 ms-2 ps-1 pt-0 mt-0">

            <img src={(selectedUser || randomUser) && (selectedUser || randomUser).photoUpload[0] ? (selectedUser || randomUser).photoUpload[0] : 'https://i.pinimg.com/originals/66/b8/58/66b858099df3127e83cb1f1168f7a2c6.jpg'} style={{ width: '66.5%', height: '100vh', position: 'absolute', top: '0', right: '0', objectFit: 'fill', backgroundSize: '100% 100%' }} alt="" />

            <UserIcons liked={liked} handleLike={handleLike} handleDiamond={handleDiamond}></UserIcons>
          </div>
        </div>
        <div className="row">
          <div className="col-4 text-light pt-4" style={{ height: '88vh', backgroundColor: 'black' }}>
            <p className='ps-2 mb-4'>Suggested for you</p>
       
            {allUserData &&
              allUserData.map((user, index) => (     <motion.p
                className='mt-3'
                whileHover={{ scale: 1.05,backgroundColor:'#1B1212' }}
                transition={{ duration: 0.3 }}
              >
                <div key={index} className=" d-flex link" onClick={() => selectUser(user)}>
                {user.photoUpload && user.photoUpload[0] && (
                  <img
                    style={{ width: '50px', height: '50px', borderRadius: '100px', border: 'gray solid' }}
                    src={user.photoUpload[0]}
                    alt={`Suggested User ${index + 1}`}
                  />
                )}
                <p className='mt-2 ms-3'>{user.firstName}{" "}{user.lastName}</p>
              </div></motion.p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;
