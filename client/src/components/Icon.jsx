import React from 'react';

function Icon(props) {
 if(props.home){

 }
 else{
  
 }
  const iconContainerStyle = {
    lineHeight: '2rem',
    position: 'relative',
    textAlign: 'center',  // Center the text horizontally
  };

  const image1Style = {
    width: '2em',
    height: '2rem',
    maxWidth: '100%',
    marginBottom: '0vh',
  };

  const image2Style = {
    width: '6.2rem',
    height: '1.4rem',
    maxWidth: '100%',
  };
  const user1={
    width: '50px',
    height: '50px',
    maxWidth: '100%',
    marginLeft: '3vw',
    marginBottom: '0vh',

  }
  const usermain={
    marginTop:'-80px',
  }

  return (
    <div className='mt-2 ms-3' style={props.user ? usermain :iconContainerStyle}>
      <img src='src\assets\group-14-5qN.png' style={props.user ? user1 : image1Style}  alt='Image1' />
      <br />
      <img src='src\assets\frame.png' style={image2Style} alt='Image2' />
    </div>
  );
}

export default Icon;
