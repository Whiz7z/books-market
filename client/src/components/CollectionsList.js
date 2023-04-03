import React, { useEffect } from "react";
import { useGetCategoriesAndPreviewQuery } from "../redux/store";
import { Link } from "react-router-dom";

const CollectionsList = () => {
  const {
    data: dataCategories,
    error: errorCategories,
    isFetching: isFetchingCategories,
  } = useGetCategoriesAndPreviewQuery();

  useEffect(() => {
    if (dataCategories) {
      console.log(dataCategories);
    }
  }, [dataCategories]);
  return (
    <>
      <h2 className="products-title">Collections</h2>
      <div className="product_list-container">
        {dataCategories &&
          dataCategories.unique.map((el) => (
            <div key={el.category} className="product_categories-container">
              <div className="categories_item_image-container">
                <img
                  src={`http://localhost:5000/images/${el.imagePath}`}
                  alt={"preview"}
                  className="product_item-image"
                />
              </div>
              <h3 className="product_categories-title">{el.category}</h3>
              <p className="product_category-description">
                {dataCategories.counts[el.category]} Products
              </p>
              <Link
                to={`?category=${el.category}`}
                className="product_viev_product-btn"
              >
                View Products
              </Link>
            </div>
          ))}
        ;
      </div>
    </>
  );
};

export default CollectionsList;
