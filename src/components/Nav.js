import React from "react";
import { Link, useNavigate } from "react-router-dom";

//Link is used to link the component to the particular routing link
const Nav = () => {
  const auth = localStorage.getItem("user");
  const Verifying = localStorage.getItem("Verifying");
  //useNavigate rerender the component if there is any change in the navigation
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("user");
    navigate("/login");
  };
  return (
    <div>
      <img
        className="logo"
        alt="logo"
        src="https://tse1.mm.bing.net/th/id/OIP.flVCRiphsKFuSEZewVEJ7QHaH_?rs=1&pid=ImgDetMain"
      />

      {JSON.parse(Verifying) === "False" ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
         
        </ul>
      )}
    </div>
  );
};

export default Nav;
