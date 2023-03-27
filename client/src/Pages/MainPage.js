import React from "react";
import { Link } from "react-router-dom";
import "../styles/mainPage.css";

const MainPage = () => {
  return (
    <div className="main-page-wrapper">
      <div className="main-page-banner">
        <h1 className="main-page-title">New fancy books!</h1>
        <Link to="/products" className="main-page_banner-link">
          Go to products
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
