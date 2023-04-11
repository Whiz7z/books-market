import React from "react";
import { useDeleteProductMutation } from "../../redux/store";
import "../../styles/confirmDeleteProduct.css";

const AdminConfirmDeleteProduct = ({ productId, onCloseModal }) => {
  const [deleteProduct, deleteProductResults] = useDeleteProductMutation();
  const deleteProductHandler = (product) => {
    console.log(productId);
    deleteProduct(productId);
    onCloseModal();
  };
  return (
    <div className="confirm_delete-container">
      <div className="confirm_delete_form-container">
        <h3 className="confirm_delete_form-title">
          Are You sure, You want to delete this product?
        </h3>
        <div className="confirm_delete-buttons">
          <button className="confirm_goback-btn" onClick={() => onCloseModal()}>
            Go back
          </button>
          <button
            className="confirm_confirm-btn"
            onClick={() => deleteProductHandler(productId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfirmDeleteProduct;
