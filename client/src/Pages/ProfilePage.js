import React from "react";
import {
  NavLink,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import MyInfo from "../components/Profile/MyInfo";
import Orders from "../components/Profile/Orders";
import Contact from "../components/Profile/Contact";
import "../styles/profilePage.css";

let activeStyle = {
  textDecoration: "underline",
};

const ProfilePage = () => {
  const location = useLocation();
  return (
    <>
      <div className="profile-wrapper">
        <nav className="profile-navigation">
          <ul className="profile-nav-list">
            <NavLink
              to="myinformation"
              style={({ isActive }) =>
                isActive | (location.pathname === "/profile")
                  ? activeStyle
                  : undefined
              }
            >
              My information
            </NavLink>
            <NavLink
              to="orders"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My orders
            </NavLink>
            <NavLink
              to="contact"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Contact us
            </NavLink>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="myinformation" />} exact></Route>

        <Route path="myinformation" element={<MyInfo />} exact></Route>
        <Route path="orders" element={<Orders />} exact></Route>
        <Route path="contact" element={<Contact />} exact></Route>
      </Routes>
    </>
  );
};

export default ProfilePage;
