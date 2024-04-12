import React from "react";
import NavbarContents from "./NavbarContents";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate=useNavigate()
  const handleProfile=()=>{
    navigate('/profile')
  }
  return (
    <>
      {props.small ? (
        <>
     
          <div
            className=" col-4 d-flex align-items-center justify-content-start text-white"

          >
            <div className="pt-2" style={{ display: "flex",zIndex:'1', cursor:"pointer"}} onClick={handleProfile}>
              <img src={props.img} alt="" style={{borderRadius:'50%',height:'40px'}} />
              <span className=" ms-2 mt-2">{props.fname}</span>
              </div>
              </div>
              <div
            className=" col-8 d-flex align-items-center justify-content-end text-white"
            style={{zIndex:'1'

            }}
          >

               <NavbarContents home/>
            </div> 
      

        </> 
      ) : (
        <>
          <div
            className="pt-2 col-12 d-flex align-items-center justify-content-end text-white"

          >

{/* <div className="col-1 link" onClick={handleHome} style={{ fontSize: '22px' }}>
  <RiHome2Line />
</div>
            <div className="col-1 ">
              <IoChatbubbleOutline style={{ cursor: "pointer",width: "30px", height: "22px" }} />
            </div>
            <div className="col-1 " style={{ verticalAlign: "middle" }}>
              <IoIosNotificationsOutline
                style={{ width: "30px", height: "22px", cursor: "pointer" }}
              />
            </div> */}
            <NavbarContents profile/>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
