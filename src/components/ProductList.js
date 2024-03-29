import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState(["Loading..."]);
  localStorage.setItem("Verifying", JSON.stringify("False"));
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const auth = localStorage.getItem("user");
    let result = await fetch(
      `https://backend-sd55.onrender.com/products/${JSON.parse(auth)._id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(
      `https://backend-sd55.onrender.com/product/${id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        method: "Delete",
      }
    );
    result = await result.json();
    if (result) {
      getProducts();
      alert("Product Deleted Successfully !!!");
    } else {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event;
    const auth = localStorage.getItem("user");
    if (key) {
      let result = await fetch(
        `https://backend-sd55.onrender.com/search/${
          JSON.parse(auth)._id
        }/${key}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      if (result) {
        setProducts(result);
      } else {
        getProducts();
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h2>Products List</h2>
      {products[0] === "Loading..." ? (
        <h2 className="product-list">Loading...</h2>
      ) : products.result === "No Products Found" ? (
        <h2 className="product-list">No product available</h2>
      ) : (
        <div>
          <input
            type="text"
            className="search-box"
            placeholder="Search Product"
            onChange={(e) => {
              searchHandle(e.target.value);
            }}
          ></input>
          <ul>
            <li>Sr.No</li>
            <li>Name</li>
            <li>Price (₹)</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operation</li>
          </ul>
          {products.length > 0 ? (
            products.map((item, index) => {
              return (
                <div key={index}>
                  <ul>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li>
                      <button
                        className="button"
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </button>
                      <button className="button">
                        <Link
                          to={`/update/${item._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Update
                        </Link>
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })
          ) : (
            <h2>No Result Found</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
