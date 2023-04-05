import React, { useState } from "react";
import AdminProductsList from "../../components/Admin Components/AdminProductsList";
import AdminAddNewProduct from "../../components/Admin Components/AdminAddNewProduct";
import ProductModal from "../../components/ProductModal";
import TagsSeTagsAdminSearchBar from "./../../components/Admin Components/TagsAdminSearchBar";
import { useLazyGetProductsByTagsQuery } from "../../redux/store";

const AdminProducts = () => {
  const [addNewProduct, setAddNewProduct] = useState();
  const [showProductsByTags, setshowProductsByTags] = useState(false);
  const [trigger, { data: findedProductsByTags, isSuccess }] =
    useLazyGetProductsByTagsQuery();

  const closeModalHandler = () => {
    document.getElementsByTagName("body").classList += "modal-open";
    setAddNewProduct(false);
  };

  const searchByTagsHandler = (tags) => {
    setshowProductsByTags(true);
    trigger(tags).then((res) => {
      console.log(res.status);
    });
  };

  const clearSearchHandler = () => {
    setshowProductsByTags(false);
  };

  return (
    <div className="products-wrapper">
      <div className="products-sidebar">
        <TagsSeTagsAdminSearchBar
          onSearch={searchByTagsHandler}
          onClearSearch={clearSearchHandler}
        />
      </div>
      <div className="products-content">
        <button
          className="admin_add_new_product-btn"
          onClick={() => setAddNewProduct(true)}
        >
          Add new product
        </button>
        {showProductsByTags ? (
          <AdminProductsList productsByTags={findedProductsByTags} />
        ) : (
          <AdminProductsList productsByTags={false} />
        )}
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
