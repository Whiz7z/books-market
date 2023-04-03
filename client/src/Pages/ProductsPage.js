import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import TagsSearchBar from "../components/TagsSearchBar";
import ProductsList from "../components/ProductsList";
import { useSelector } from "react-redux";
import { useLazyGetProductsByTagsQuery } from "../redux/store";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/store";
import CollectionsList from "../components/CollectionsList";

const ProductsPage = () => {
  const [showProductList, setShowProductList] = useState(false);
  const searchedProducts = useSelector((state) => state.products.products);
  const [trigger, { data: findedProductsByTags, isSuccess }] =
    useLazyGetProductsByTagsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedProducts && searchedProducts.length === 0) {
      localStorage.removeItem("searchedProducts");
    }
  }, [searchedProducts]);

  useEffect(() => {
    if (findedProductsByTags) {
      console.log(findedProductsByTags);
    }
  }, [findedProductsByTags]);

  const searchHandler = (tags) => {
    setShowProductList(false);
    trigger(tags).then((res) => {
      console.log(res.status);
    });
  };

  const clearSearch = () => {
    setShowProductList(true);
  };

  return (
    <div className="products-wrapper">
      <div className="products-sidebar">
        <TagsSearchBar onSearch={searchHandler} onClearSearch={clearSearch} />
      </div>
      <div className="products-content">
        {findedProductsByTags && isSuccess && !showProductList ? (
          <ProductsList products={findedProductsByTags} />
        ) : (
          <CollectionsList />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
