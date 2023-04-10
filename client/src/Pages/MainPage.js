import React from "react";
import { Link } from "react-router-dom";
import "../styles/mainPage.css";
import Contact from "../components/Profile/Contact";

const MainPage = () => {
  return (
    <div className="main-page-wrapper">
      <div className="main-page-banner">
        <h1 className="main-page-title">We are open!!!</h1>
        <Link to="/products" className="main-page_banner-link">
          Go to products
        </Link>
      </div>
      <Contact />
    </div>
  );
};

export default MainPage;
