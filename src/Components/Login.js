import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StoreContext from "../StoreContext/store-context";

import classes from "./Login.module.css";

const Login = () => {
  const mobInputRef = useRef();
  const navigate = useNavigate();
  const strCtx = useContext(StoreContext);

  const sendCodeHandler = async (e) => {
    e.preventDefault();
    const mobNo = mobInputRef.current.value;
    if (mobNo.length < 10) {
      alert("Please give correct number");
      return;
    }
    var urlencoded = new URLSearchParams();
    urlencoded.append("phone", mobNo);
    urlencoded.append("dial_code", "+91");
    try {
      const res = await fetch(
        "https://staging.fastor.in/v1/pwa/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlencoded
        }
      );

      const data = await res.json();
      console.log(data);
      if(res.ok){
          strCtx.setMobNum(mobNo);
          navigate('/verify');
      } else {
          throw Error(data.error_message)
      }
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className={classes.loginCon}>
      <form className={classes.logForm}>
        <div className={classes.header}>
          <h2>Enter Your Mobile Number</h2>
          <p>We will send you 6 digit verification code</p>
        </div>
        <input
          type="tel"
          placeholder="Enter mobile number"
          ref={mobInputRef}
          maxLength="10"
        />
        <button onClick={sendCodeHandler}>Send Code</button>
      </form>
    </div>
  );
};

export default Login;
