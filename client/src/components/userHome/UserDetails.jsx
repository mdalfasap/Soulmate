// import React, { useState, useEffect } from "react";
// import { calculateAge } from "../../helper/helper";
// function UserDetails(props) {
//   return (
//       <div
//         className="position-absolute ps-3 pt-3 anta text-white"
//         style={{
//           fontSize: "3vw",
//           left: "33.4%",
//           width: "100%",
//           height: "50%",
//           bottom: "0",
//           zIndex: "1",
//           backdropFilter: "blur(20px)",
//           lineHeight: "1",
//         }}
//       >
//        <div className="d-flex justify-content-between align-items-center">
//         <div className="col-4 d-flex ">
//           {props.randomUser.firstName} {props.randomUser.lastName}
//         </div>
//         <div className="col-8 d-flex" >
//         <button className="text-white p-2 mt-2 " style={{width:'100px',fontSize:'18px',backgroundColor:'transparent', border:'rgb(161, 2, 82) 3px solid'}}>View profile</button>
//         </div>
//       </div>
//         <p className="mt-3" style={{fontSize:'20px'}}>
//           {props.randomUser?.dateOfBirth && (
//             <>{calculateAge(props.randomUser.dateOfBirth)} |</>
//           )}{" "} 
//           {props.randomUser?.city && props.randomUser.city}
//         </p>
//         {props.randomUser?.jobTitle&&
//         <div className="mt-2 text-black"style={{fontSize:'20px'}}>
//           <img src="src\assets\job.png" alt="" />{" "}
//           <span className="">{props.randomUser.jobTitle}</span>
//         </div>}
//         {props.randomUser?.schoolName&&
//         <div className="mt-2 text-black"style={{fontSize:'20px'}}>
//           <img src="src\assets\institute.png" alt="" />{" "}
//           <span className="">{props.randomUser.schoolName}</span>
//         </div>}
//         {props.randomUser?.describeYourself && (
//               <div className="pt-4">
//                 <div className="ms-3 text-light d-flex flex-wrap" style={{width:'40vw'}}>
//                   {props.randomUser.describeYourself.map((value, index) => (
//                     <div key={index} className="description-item">
//                       {value}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//       </div>

//   );
// }
// export default UserDetails;


import React from 'react';
import { calculateAge } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
function UserDetails(props) {
  const navigate = useNavigate();
  const openDetailedProfile = () => {
    const userId = props.randomUser?._id;
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };
  return (
    <>
      <div
        className="position-absolute ps-3 pt-3 anta text-white"
        style={{
          fontSize: "3vw",
          left: "33.4%",
          width: "100%",
          height: "50%",
          bottom: "0",
          zIndex: "1",
          backdropFilter: "blur(20px)",
          lineHeight: "1",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="col-3 d-flex ">
            {props.randomUser.firstName} {props.randomUser.lastName}
          </div>
          <div className="col-9 d-flex">
            <button className="text-white p-2 mt-2" style={{ width: '150px', fontSize: '18px', backgroundColor: 'transparent', border: 'rgb(161, 2, 82) 3px solid' }} onClick={() => openDetailedProfile(props.randomUser?._id)}>View profile</button>
          </div>
        </div>
        <p className="mt-3" style={{ fontSize: '20px' }}>
          {props.randomUser?.dateOfBirth && (
            <>{calculateAge(props.randomUser.dateOfBirth)} |</>
          )}{" "}
          {props.randomUser?.city && props.randomUser.city}
        </p>
        {props.randomUser?.jobTitle && (
          <div className="mt-2 text-black" style={{ fontSize: '20px' }}>
            <img src="src\assets\job.png" alt="" />{" "}
            <span className="">{props.randomUser.jobTitle}</span>
          </div>
        )}
        {props.randomUser?.schoolName && (
          <div className="mt-2 text-black" style={{ fontSize: '20px' }}>
            <img src="src\assets\institute.png" alt="" />{" "}
            <span className="">{props.randomUser.schoolName}</span>
          </div>
        )}
        {props.randomUser?.describeYourself && (
          <div className="pt-4">
            <div className="ms-3 text-light d-flex flex-wrap" style={{ width: '40vw' }}>
              {props.randomUser.describeYourself.map((value, index) => (
                <div key={index} className="description-item">
                  {value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default UserDetails;
