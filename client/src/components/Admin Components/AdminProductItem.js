import React, { useState } from "react";
import ProductModal from "../ProductModal";
import AdminEditProduct from "./AdminEditProduct";
import { useDeleteProductMutation } from "../../redux/store";
import { useSelector } from "react-redux";
import AdminConfirmDeleteProduct from "./AdminConfirmDeleteProduct";

const AdminProductItem = ({ product }) => {
  const [deleteProduct, deleteProductResults] = useDeleteProductMutation();
  const [editProduct, setEditProduct] = useState();
  const [deleteProductModal, setDeleteProductModal] = useState();
  const state = useSelector((state) => state);

  const openDeleteModal = () => {
    setDeleteProductModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteProductModal(false);
  };

  const editProductHandler = (product) => {
    setEditProduct(true);
  };

  const closeModalHandler = () => {
    setEditProduct(false);
  };

  let imagePath;
  if (product.imagePath) {
    imagePath = `/images/${product.imagePath}`;
  } else {
    imagePath = `images/${product._id}.jpeg`;
  }
  return (
    <div className="admin_product_list-item">
      <img src={imagePath} className="admin_product_item-image" alt="product" />
      <p className="admin_product_item-title">{product.title}</p>
      <p className="admin_product_item-description">{product.description}</p>
      <p className="admin_product_item-category">
        Category - {product.category}
      </p>
      <p className="admin_product_item-stock">Stock - {product.stock}</p>
      <p className="admin_product_item-price">Price - ${product.price}</p>
      <div className="admin_product-buttons">
        <button
          className="admin_delete_product-btn"
          onClick={() => openDeleteModal()}
        >
          Delete Item
        </button>
        <button
          className="admin_edit_product-btn"
          onClick={() => editProductHandler(product)}
        >
          Edit Item
        </button>
      </div>
      {editProduct && (
        <ProductModal wrapperId="editProductModal">
          <AdminEditProduct
            product={product}
            onCloseModal={() => closeModalHandler()}
          />
        </ProductModal>
      )}

      {deleteProductModal && (
        <ProductModal wrapperId="editProductModal">
          <AdminConfirmDeleteProduct
            productId={product._id}
            onCloseModal={closeDeleteModal}
          ></AdminConfirmDeleteProduct>
        </ProductModal>
      )}
    </div>
  );
};

export default AdminProductItem;
