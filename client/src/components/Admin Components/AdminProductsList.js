import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProductItem from "./AdminProductItem";
import { useGetAllProductsQuery } from "../../redux/store";
import { useSelectedTags } from "../zustand/store";

const AdminProductsList = ({ productsByTags }) => {
  const { selectedCategory } = useSelectedTags((state) => state);
  const { data, error, isFetching } = useGetAllProductsQuery(selectedCategory);
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="admin_products-title">Products</h2>
      <div className="admin_product_list-container">
        {productsByTags &&
          productsByTags.map((product) => (
            <AdminProductItem key={product._id} product={product} />
          ))}
        {!productsByTags &&
          data &&
          data.map((product) => (
            <AdminProductItem key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default AdminProductsList;
