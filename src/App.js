import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AppProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Profile from "./components/Profile";
import Verification from "./components/Verification";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/add" element={<AppProduct />}></Route>
            <Route
              path="/update/:id"
              element={
                <h1>
                  <UpdateProduct />
                </h1>
              }
            ></Route>
            <Route path="/logout" element={<h1>Logout Component</h1>}></Route>
            <Route
              path="/update"
              element={
                <h2 className="product">
                  Please select the product from products list
                </h2>
              }
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/emailverify" element={<Verification />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
