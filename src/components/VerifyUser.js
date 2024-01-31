import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/verifyUser");
    }
  }, [navigate]);
  const handleVerifyOtp = async () => {
    const email = JSON.parse(localStorage.getItem("user")).email;

    // Make API call to verify OTP
    try {
      const response = await fetch(
        "https://backend-sd55.onrender.com/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();
      if (data.message==="OTP verification successful") {
        alert("User verified successfully !!!");
        navigate("/");
        localStorage.setItem("Verifying", JSON.stringify("False"));
      } else {
        alert("OTP Invalid");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const Verifying = localStorage.getItem("Verifying");
  return (
    JSON.parse(Verifying) === "Verifying"?
    <div className="login">
      <h1>Enter OTP To Verify The User </h1>
      <div>
        <input
          className="inputBox"
          type="text"
          value={otp}
          onChange={handleOtpChange}
        />
      </div>
      <button className="appButton" onClick={handleVerifyOtp}>
        Verify OTP
      </button>
    </div>:navigate("/")
  );
};

export default VerifyUser;
