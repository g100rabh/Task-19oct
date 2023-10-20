import React, { useState, useRef, useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import StoreContext from "../StoreContext/store-context";
import classes from "./OtpForm.module.css";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const strCtx = useContext(StoreContext);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = prevOtp.split("");
      newOtp[index] = value;
      return newOtp.join("");
    });

    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const verifyHandler = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("phone", strCtx.mobNum);
    urlencoded.append("dial_code", "+91");
    urlencoded.append("otp", otp);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const res = await fetch(
        "https://staging.fastor.in/v1/pwa/user/login",
        requestOptions
      );
      const resData = await res.json();
      //   console.log(resData.data.token);
      if (resData.status === "Success") {
        strCtx.setToken(resData.data.token);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${resData.data.token}`);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const res = await fetch(
          "https://staging.fastor.in/v1/m/restaurant?city_id=118",
          requestOptions
        );
        const resData2 = await res.json();
        if(res.ok){
            strCtx.setRestList(resData2);
        }
        navigate("/restaurant");
      } else {
        throw new Error(resData.error_message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={classes.otpCon}>
      <span className={classes.back} onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </span>
      <div className={classes.otpInner}>
        <div className={classes.otpHeader}>
          <h1>OTP Verification</h1>
          <p>Enter the verification code we just sent on your Mobile Number.</p>
        </div>
        <span>
          {Array.from({ length: 6 }, (_, index) => (
            <input
              type="text"
              maxLength="1"
              value={otp[index] || ""}
              onChange={(e) => handleChange(e, index)}
              ref={inputRefs[index]}
              key={index}
            />
          ))}
        </span>
        <button onClick={verifyHandler}>Verify</button>
        <p>Didn’t receive the code? Resend</p>
      </div>
    </div>
  );
};

export default OtpForm;
