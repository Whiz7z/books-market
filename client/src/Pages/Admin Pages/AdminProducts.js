import React, { useState } from "react";
import TagsSearchBar from "./../../components/TagsSearchBar";
import AdminProductsList from "../../components/Admin Components/AdminProductsList";
import AdminAddNewProduct from "../../components/Admin Components/AdminAddNewProduct";
import ProductModal from "../../components/ProductModal";

const AdminProducts = () => {
  const [addNewProduct, setAddNewProduct] = useState();

  const closeModalHandler = () => {
    setAddNewProduct(false);
  };
  return (
    <div className="products-wrapper">
      <div className="products-sidebar">
        <TagsSearchBar />
      </div>
      <div className="products-content">
        <button
          className="admin_add_new_product-btn"
          onClick={() => setAddNewProduct(true)}
        >
          Add new product
        </button>
        <AdminProductsList />
      </div>
      {addNewProduct && (
        <ProductModal wrapperId="editProductModal">
          <AdminAddNewProduct onCloseModal={() => closeModalHandler()} />
        </ProductModal>
      )}
    </div>
  );
};

export default AdminProducts;
