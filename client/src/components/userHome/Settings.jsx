import React from "react";
import SettingsOption from "./SettingsOption";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Settings({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: "#1B223F",
          overflow: "hidden",
          maxWidth: "50%",
          width: "100%",
          maxHeight: "100vh",
          padding: "0",
        },
      }}
    >
      <DialogTitle
        style={{
          cursor: "pointer",
          fontSize: "14px",
          paddingBottom: "2px",
          paddingTop: "5px",
          paddingLeft: "5px",
        }}
        onClick={onClose}
      >
        {"< Settings"}
      </DialogTitle>

      <DialogContent>
        <div className="row ">
          <div className="col-6  d-flex">
            <SettingsOption />
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <img
              src="src\assets\inviteFriendPhoto.png"
              alt=""
              className="img-fluid"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Settings;
