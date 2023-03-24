import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/main.css";
import styled from "styled-components";
import { userLogout, removeAllItems } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const quantityOfItems = useSelector((state) => state.cart.totalItemsQuantity);
  const location = useLocation();
  let activeStyle = {
    textDecoration: "underline",
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(userLogout());
    dispatch(removeAllItems());
  };

  return (
    <nav className="menu">
      <ul className="menu-list">
        <li className="menu-list_item">
          <NavLink
            to="products"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            products.
          </NavLink>
        </li>
        <li>
          <NavLink
            to="profile"
            style={({ isActive }) =>
              isActive | (location.pathname === "/") ? activeStyle : undefined
            }
          >
            profile.
          </NavLink>
        </li>

        {userInfo && userInfo.isAdmin && (
          <li>
            <NavLink
              to="adminpanel"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              admin panel.
            </NavLink>
          </li>
        )}

        <li>
          {localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo")).token ? (
            <button
              className="menu_list_logout-btn"
              onClick={() => logoutHandler()}
            >
              Log out
            </button>
          ) : (
            <NavLink to="login">sing in.</NavLink>
          )}
        </li>
      </ul>
      <div className="shoping_cart-item">
        <NavLink to="cart" className="shopping_cart-btn">
          Shopping cart
        </NavLink>
        <div className="shopping_cart-btn-quantity">{quantityOfItems}</div>
      </div>
    </nav>
  );
};

export default Menu;
