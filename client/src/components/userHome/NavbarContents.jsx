import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdMenu } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiHome2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Modal from 'react-modal';

export default function NavbarContents(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate=useNavigate()
  const handleProfile=()=>{
      navigate('/profile')
    }

    const handleClose = () => {
        setAnchorEl(null);
      };
      const handleHome=()=>{
        window.__isReactComponentRendered__ = false;
        navigate('/userhome')
      }

      const handleLogout = () => {
        setModalIsOpen(true);
      };
    
      const confirmLogout = () => {
        setModalIsOpen(false);
        localStorage.removeItem('token')
        navigate('/');
      };
    
      const cancelLogout = () => {
     
        setModalIsOpen(false);
      };
    
  return (
    <div>
         <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999, // Set a high zIndex value
          },
          content: {
            width: "300px",
            margin: "auto",
            textAlign: "center",
            paddingTop: "20px",
            borderRadius: "8px",
            border:'2px solid red',
            color:'black',
            maxHeight:'25vh'
          },
        }}
      >
        <p className=' pb-2 '>Are you sure you want to logout?</p>
        <button className=' p-2 ps-4 pe-4' onClick={confirmLogout}>Yes</button>
        <button className='ms-3 p-2 ps-4 pe-4' onClick={cancelLogout}>No</button>
      </Modal>
        {props.home?<>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MdMenu className="mt-2" style={{ color: "white", fontSize: "30px" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleHome} >
          <IoChatbubbleOutline   style={{ marginRight: ".5vw" }} />
          Message
        </MenuItem>

        <MenuItem >
          <IoIosNotificationsOutline style={{ marginRight: ".5vw" }} />
          Notification
        </MenuItem>

        <MenuItem onClick={handleProfile}>
          <AiOutlineUser style={{ marginRight: ".5vw" }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
        < CiLogout style={{ marginRight: ".5vw" }}/>  Logout
        </MenuItem>
      </Menu>
      </> :
      <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MdMenu className="mt-2" style={{ color: "white", fontSize: "30px" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        
        <MenuItem onClick={handleHome}>
          <RiHome2Line style={{ marginRight: ".5vw" }} />
          Home
        </MenuItem>
        <MenuItem  >
          <IoChatbubbleOutline   style={{ marginRight: ".5vw" }} />
          Message
        </MenuItem>

        <MenuItem >
          <IoIosNotificationsOutline style={{ marginRight: ".5vw" }} />
          Notification
        </MenuItem>

        <MenuItem onClick={handleLogout}>
        < CiLogout style={{ marginRight: ".5vw" }}/>  Logout
        </MenuItem>
      </Menu>
      </>
      }
    </div>
  );
}
