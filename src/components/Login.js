import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/verifyUser");
    }
  }, [navigate]);

  const handleLogin = async () => {
    let result = await fetch("https://backend-sd55.onrender.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      alert("User Loggedin Successfully !!!");
      navigate("/");
      localStorage.setItem("Verifying", JSON.stringify("False"));
      // localStorage.setItem("Verifying", JSON.stringify("Verifying"));
      // try {
      //   const response = await fetch("https://backend-sd55.onrender.com/send-otp", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email }),
      //   });
  
      //   const data = await response.json();
      //   if (data.message) {
      //     alert(`OTP sent to ${email}`);
      //     navigate("/verifyUser");
      //   }
      // } catch (error) {
      //   console.error("Error:", error);
      // }
    } else {
      alert("Please Enter Correct Details");
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button className="appButton" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
