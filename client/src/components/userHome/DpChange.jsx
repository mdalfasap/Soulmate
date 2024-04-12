import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { Dialog, DialogContent } from '@mui/material';
import CropImage from "./CropImage";

function DpChange({ open, onClose }) {
  return (
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
        <CropImage onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default DpChange;
