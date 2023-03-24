import React from "react";
import { createPortal } from "react-dom";

const ProductModal = ({ children, wrapperId }) => {
  return createPortal(children, document.getElementById(wrapperId));
};

export default ProductModal;
