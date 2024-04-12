import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles/Otp.css";
import { generateOtp, register } from "../helper/helper";
import toast, { Toaster } from "react-hot-toast";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const [seconds, setSeconds] = useState(30);
  const [editBox, setEditBox] = useState(false);
  const token = localStorage.getItem("token");
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
  };
  const handleChangeEditedNumber = (event) => {
    setEditedPhoneNumber(event.target.value);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const { state } = location;
    if (state && state.phoneNumber) {
      setPhoneNumber(state.phoneNumber);
    }
  }, [location]);
  const editNumberBox = () => {
    setEditBox(true);
  };
  const resend = async () => {
    try {
      const response = await generateOtp(phoneNumber);
      const { status } = response;

      if (status === 201) {

        toast.success(`OTP has been sent to ${phoneNumber}`);
        navigate("/login");
        setSeconds(30);
        console.log("Form submitted:", phoneNumber);
      } else {
        toast.error("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP generation:", error);
      toast.error("Failed to generate OTP. Please try again.");
    }
  };

  const handleKeyDown = (index, event) => {
    const isNumericKey = /\d/.test(event.key);

    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    } else if (isNumericKey) {
      const newOtp = [...otp];
      newOtp[index] = event.key;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (event.key === "Backspace" && otp[index] !== "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    } else {
      event.preventDefault();
    }
    if (
      index === otp.length - 1 &&
      event.key !== "Backspace" &&
      otp[index].length >= 1
    ) {
      event.preventDefault();
    }
  };
  useEffect(()=>{
    if (token){
      navigate('/userhome')
    }
  },[token])
  useEffect(() => {
    if (otp.every((value) => value !== "")) {
      setIsOtpComplete(true);
    } else {
      setIsOtpComplete(false);
    }

    if (otp[otp.length - 1] !== "" && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [otp]);

  async function handleSubmit(submittedOtp) {
    console.log(phoneNumber);
    if (isOtpComplete) {
      try {
        const response = await register(phoneNumber, submittedOtp);
        const { status, data } = response;
  
        if (status === 201) {
          const token = localStorage.getItem("token");
  
          if (token) {
            navigate("/userinfo");
          } else {
            navigate("/");
          }
        } else if (status === 200 && data.token) {
          localStorage.setItem("token", data.token);
          navigate("/userhome");
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  }
  
  return (
    <>
      <div className="container-fluid a ">
        <Toaster></Toaster>
        <div className="row  gradient-overlay">
          <div className="col-12 d-flex m-0 justify-content-center">
            <img
              className="icon"
              src="src\assets\group-14-5qN.png"
              alt="Image1"
            />
            <p className="header1 ">SOULMATE</p>
          </div>
          <div className="col-12 d-flex m-0 justify-content-center">
            <p className="header2">Enter your OTP</p>
            {editBox ? (
              <p className="txt">
                A verification code has been <br />
                sent to{" "}
                <input
                  type="text"
                  style={{
                    background: "transparent",
                    border: "gray 1px solid",
                  }}
                  value={editedPhoneNumber}
                  onChange={handleChangeEditedNumber}
                  ref={(input) => input && input.focus()}
                />
                <button
                  style={{ width: "40px" }}
                  type="submit"
                  onClick={() => {
                    setPhoneNumber(editedPhoneNumber);
                    setEditBox(false);
                  }}
                >
                  ok
                </button>
              </p>
            ) : (
              <p className="txt">
                A verification code has been <br />
                sent to {phoneNumber}{" "}
                <span
                  style={{ color: "#5B7FFF", cursor: "pointer" }}
                  onClick={editNumberBox}
                >
                  Change
                </span>
              </p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(otp.join(""));
              }}
            >
              <div className="mt-3 otpbox">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}

                <div style={{ position: "absolute", right: "20%" }}>
                  {seconds === 0 ? (
                    <p style={{ color: "white" }}>
                      Resend? wait for {seconds}s{" "}
                      <a className="resend" onClick={resend}>
                        Resend
                      </a>
                    </p>
                  ) : (
                    <p style={{ color: "white" }}>
                      Resend? wait for {seconds}s
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  <button
                    className="nextbtn"
                    // ref={buttonRef}
                    type="submit"
                    style={
                      !isOtpComplete
                        ? { backgroundColor: "#636067", color: "#3C3544" }
                        : {}
                    }
                    disabled={!isOtpComplete}
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;