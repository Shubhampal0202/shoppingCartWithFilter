import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const { cart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch()
  return (
    <div className="header">
      <h1 className="logo">Shopping Cart</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) =>
            dispatch({ type: "FILTER_BY_SEARCH", payload: e.target.value })
          }
        />
      </div>
      <div className="home">
        <Link to="/">Home</Link>
      </div>
      <div className="cart-symbol-cont">
        <Link to="/cart">
          <div className="cart">
            <FaShoppingCart className="cart-img" />
            <span className="cart-value">{cart.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
