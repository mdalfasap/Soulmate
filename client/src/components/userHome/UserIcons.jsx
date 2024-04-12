import React from "react";

function UserIcons(props) {
  // Common style for images
  const imageStyle = {
    cursor: 'pointer',
    zIndex: '999',
    width: '2vw',
    height:'3vh'
  };

  // Common style for circular container
  const circleContainerStyle = {
    width: '4vw',
    height: '4vw',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div>
      <div className="position-absolute " style={{ right: "20px", bottom: '30px', display: 'flex', flexDirection: 'column' }}>
      {props.liked?
         <div className="mt-3" style={circleContainerStyle}>
          <img className="mt-3" src="src\assets\liked.png" style={{ ...imageStyle,width:'4vw',height:'8vh' }} alt="" onClick={props.handleLike} />
        </div>:
        <div className="mt-3" style={circleContainerStyle}>
          <img src="src\assets\like.png" style={{ ...imageStyle, }} alt="" onClick={props.handleLike} />
        </div>}
        <div className="mt-3" style={circleContainerStyle}>
          <img src="src\assets\diamond.png" style={{ ...imageStyle,  }} alt="" onClick={props.handleDiamond} />
        </div>
        <div className="mt-3 " style={circleContainerStyle}>
          <img  src="src\assets\boost.png" style={{ ...imageStyle, height:'4vh'}} alt="" onClick={props.handleBoost} />
        </div>
        <div className="mt-3" style={circleContainerStyle}>
          <img src="src\assets\filter.png" style={{ ...imageStyle, }} alt="" onClick={props.handleFilter} />
        </div>
      </div>
    </div>
  );
}

export default UserIcons;
