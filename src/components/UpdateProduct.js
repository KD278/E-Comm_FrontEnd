import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    let result = await fetch(
      `https://backend-sd55.onrender.com/product/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    if (result) {
      alert("Product Updated Successfully !!!");
      navigate("/products");
    }
  };
  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getProductDetails = async () => {
    let result = await fetch(
      `https://backend-sd55.onrender.com/product/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  return (
    <div className="product">
      <h1 className="update">Update Product</h1>
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
      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
