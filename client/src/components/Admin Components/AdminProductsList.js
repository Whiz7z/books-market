import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProductItem from "./AdminProductItem";
import { useGetAllProductsQuery } from "../../redux/store";

const AdminProductsList = () => {
  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );
  const { data, error, isFetching } = useGetAllProductsQuery(choosenCategory);
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="admin_products-title">Products</h2>
      <div className="admin_product_list-container">
        {data &&
          data.map((product) => (
            <AdminProductItem key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default AdminProductsList;
