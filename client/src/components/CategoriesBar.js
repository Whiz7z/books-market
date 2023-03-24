import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseCategory } from "../redux/store";
import { useGetAllProductsQuery } from "../redux/store";

const CategoriesBar = () => {
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetAllProductsQuery("all");

  const [categories, setCategories] = useState();

  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );

  useEffect(() => {
    if (data) {
      setCategories([...new Set(data.map((product) => product.category))]);
    }
  }, [data]);

  const chooseCategoryHandler = (category) => {
    dispatch(chooseCategory(category));
  };

  return (
    <>
      <h2 className="categories-title">Categories</h2>
      <div className="categories_list-container">
        <div
          key="all"
          onClick={() => chooseCategoryHandler("all")}
          className="categories_list-item"
          style={
            choosenCategory === "all"
              ? { backgroundColor: "#aee1e7" }
              : { backgroundColor: "#89d2dc" }
          }
        >
          All
        </div>
        {categories &&
          categories.map((category) => {
            return (
              <div
                key={category}
                onClick={() => chooseCategoryHandler(category)}
                className="categories_list-item"
                style={
                  category === choosenCategory
                    ? { backgroundColor: "#aee1e7" }
                    : { backgroundColor: "#89d2dc" }
                }
              >
                {category}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CategoriesBar;
