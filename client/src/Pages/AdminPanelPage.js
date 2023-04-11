import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  NavLink,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import AdminProducts from "./Admin Pages/AdminProducts";
import AdminOrders from "./Admin Pages/AdminOrders";
import AdminUsers from "./Admin Pages/AdminUsers";
import AdminMessages from "./Admin Pages/AdminMessages";
import "../styles/adminPanel.css";

const AdminPanelPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [content, setContent] = useState();
  const location = useLocation();
  let activeStyle = {
    textDecoration: "underline",
  };
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const isAdminRequest = async () => {
      const response = await axios.get("/api/users/admin", config);
      setContent(response.data);
    };

    isAdminRequest();
  }, []);

  return (
    <>
      <div className="adminPanel-nav">
        <ul className="adminPanel-nav-list">
          <NavLink
            to="adminProducts"
            style={({ isActive }) =>
              isActive | (location.pathname === "/adminpanel")
                ? activeStyle
                : undefined
            }
          >
            Products
          </NavLink>
          <NavLink
            to="adminOrders"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Orders
          </NavLink>

          <NavLink
            to="adminMessages"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Messages
          </NavLink>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="adminProducts" />} exact></Route>

        <Route path="adminProducts" element={<AdminProducts />} exact></Route>

        <Route path="adminOrders" element={<AdminOrders />} exact></Route>

        <Route path="adminMessages" element={<AdminMessages />} exact></Route>
      </Routes>
    </>
  );
};

export default AdminPanelPage;
