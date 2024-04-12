import React, { useEffect, useState } from "react";
import AddImage from "../userHome/AddImage";
import { fetchUserData } from "../../helper/helper";

const PhotoUpload = (props) => {
  const initialLimit = parseInt(localStorage.getItem("limit")) || 0;
  const [userData, setUserData] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const [limit, setLimit] = useState(initialLimit);
   
    const handleImageUpload = () => {

      if (limit <= 4) {
        setImageUpload(true);
      }
      setLimit(limit + 1);
      console.log(limit)
    };

    useEffect(() => {
      // Save the limit value to local storage whenever it changes
      localStorage.setItem("limit", limit.toString());
    }, [limit]);


  const handleCloseDialog = () => {
    setImageUpload(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setUserData(userData);
      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, [limit]);
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backdropFilter: "blur(20px)",
        height: "250px",
        width: "80vw",
        paddingTop: "20px",
        overflow: "SCROLL",
      }}
    >
      <AddImage userinfo open={imageUpload} onClose={handleCloseDialog} />
      {userData.photoUpload  &&
        userData.photoUpload.map((image, index) => (
          <div
            key={index}
            className="image-card"
            style={{
              marginRight: "10px",
              borderRadius: "10px",
              width: "150px",
              height: "200px",
              overflow: "hidden",
            }}
          >
            <img
              src={image}
              alt={`Uploaded ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
  {limit <= 4 && (
      <label
        htmlFor="upload-input"
        className="image-card add-option-card"
        style={{
          width: "150px",
          height: "200px",
          borderRadius: "10px",
          justifyContent: "center",
          backgroundColor: "#41434F",
          color: limit < 4 ? "#989898" : "#4A4A4A",
        }}
      >
        <div
          onClick={handleImageUpload} 
          style={{ marginTop: "40%", marginLeft: "40%", fontSize: "40px" }}
        >
          +
        </div>
        
          
       
      </label> )}
    </div>
  );
};

export default PhotoUpload;

// import React, { useEffect, useState } from 'react';
// import AddImage from '../userHome/AddImage';
// import { fetchUserData } from '../../helper/helper';

// const PhotoUpload = (props) => {
//   const [userData, setUserData] = useState([]);
//   const [imageList, setImageList] = useState([]);
//   const [limit, setLimit] = useState(0);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];

//     if (file && limit < 5) {
//       setImageList((prevImageList) => [...prevImageList, URL.createObjectURL(file)]);
//       setLimit((prevLimit) => prevLimit + 1);
//       const storedPhotoUpload = localStorage.getItem('photoUpload') || '[]';
//       const parsedPhotoUpload = JSON.parse(storedPhotoUpload);
//       parsedPhotoUpload.push(URL.createObjectURL(file));
//       localStorage.setItem('photoUpload', JSON.stringify(parsedPhotoUpload));

//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await fetchUserData();
//         setUserData(userData);
//       } catch (error) {
//         console.error("Error in UserProfile:", error);
//       }
//     };
//     fetchData();
//   }, [imageList]);
//   const photosinlocal = Array.from(JSON.parse(localStorage.getItem('photoUpload') || '[]'));

//   return (
//     <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', backdropFilter: 'blur(20px)', height: '250px', width: '80vw', paddingTop: '20px', overflow: 'SCROLL' }}>

//       {photosinlocal.map((image, index) => (
//         <div key={index} className="image-card" style={{ marginRight: '10px', borderRadius: '10px', width: '150px', height: '200px', overflow: 'hidden' }}>
//           <img src={image} alt={`Uploaded ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//         </div>
//       ))}

//       {limit < 5 && (
//         <label htmlFor="upload-input" className="image-card add-option-card" style={{ width: '150px', height: '200px', borderRadius: '10px', justifyContent: 'center', backgroundColor: '#41434F', color: limit < 4 ? '#989898' : '#4A4A4A' }}>
//           <div onClick={limit < 5 ? handleImageUpload : undefined} style={{ marginTop: '40%', marginLeft: '40%', fontSize: '40px' }}>+</div>
//           {limit < 5 && <input
//             type="file"
//             id="upload-input"
//             accept="image/*"
//             name={props.name}
//             result={userData}
//             onChange={handleImageUpload}
//             style={{ display: 'none' }}
//           />}
//         </label>
//       )}
//     </div>
//   );
// };

// export default PhotoUpload;
