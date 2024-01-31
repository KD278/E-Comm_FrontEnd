import React, { useState, useEffect } from "react";
// useNavigate ia used to navigate to the particular page
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  const collectData = async () => {
    let result = await fetch("https://backend-sd55.onrender.com/register", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.response === "Use New Email") {
      alert("You can't use this email !!!");
      return;
    } else {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      localStorage.setItem("Verifying", JSON.stringify("Verifying"));
      try {
        const response = await fetch(
          "https://backend-sd55.onrender.com/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        if (data.message) {
          alert(`OTP sent to ${email}`);
          navigate("/verifyUser");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
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
      <button className="appButton" type="button" onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
