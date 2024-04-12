import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog, DialogContent } from '@mui/material';
import CropImageUserInfo from "./CropImageUserInfo";
import CropImage from "./CropImage";

function AddImage({userinfo ,open, onClose }) {
    return (
      <>
      {userinfo ? (
        <Dialog open={open}>
        <div
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            cursor: 'pointer',
          }}
        >
          <CancelIcon onClick={onClose} />
        </div>
        <DialogContent
          style={{
            width: '100vw',
            backgroundColor: 'rgba(104, 104, 104)',
            opacity: open ? 1 : 0, // Set opacity based on the open prop
            transition: 'opacity 0.5s ease-in-out', // Add transition effect
          }}
        >
          <CropImageUserInfo onClose={onClose} add/>
        </DialogContent>
      </Dialog>  
      ) : (
        <Dialog open={open}>
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              cursor: 'pointer',
            }}
          >
            <CancelIcon onClick={onClose} />
          </div>
          <DialogContent
            style={{
              width: '100vw',
              backgroundColor: 'rgba(104, 104, 104)',
              opacity: open ? 1 : 0, // Set opacity based on the open prop
              transition: 'opacity 0.5s ease-in-out', // Add transition effect
            }}
          >
            <CropImage onClose={onClose} add/>
          </DialogContent>
        </Dialog>  
        )}
        </>
      );
    }

export default AddImage