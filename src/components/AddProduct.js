import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AppProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    let result = await fetch("https://backend-sd55.onrender.com/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      alert("Product added successfully !!!");
      navigate("/");
    }
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      {error && !name && (
        <span className="invalid-input"> Enter valid name</span>
      )}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      {error && !price && (
        <span className="invalid-input"> Enter valid price</span>
      )}
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      {error && !category && (
        <span className="invalid-input"> Enter valid category</span>
      )}
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      ></input>{" "}
      {error && !company && (
        <span className="invalid-input"> Enter valid company</span>
      )}
      <button className="appButton" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AppProduct;
