import React from "react";

const Profile = () => {
  const auth = localStorage.getItem("user");
  const name = JSON.parse(auth).name;
  const email = JSON.parse(auth).email;

  return (
    <div style={{ marginLeft: "35%" }}>
      <h1>User Details</h1>
      <div style={{ marginTop: "50px" }}>
        <h2>{`Name:   ${name}`}</h2>
        <h2>{`E-mail:   ${email}`}</h2>
      </div>
    </div>
  );
};

export default Profile;
