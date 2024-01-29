import React, { useEffect } from "react";

const Verification = () => {
  const vefifyEmail = async () => {
    let result = await fetch("https://backend-sd55.onrender.com/email/verify", {
      method: "get",
    });
    result = await result.json();
    console.log(result);
  };

  useEffect(() => {
    vefifyEmail();
  }, []);

  return (
    <div>
      <h1>Email verified successfully !!!</h1>
    </div>
  );
};

export default Verification;
