import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseCategory, setProducts } from "../../redux/store";
import {
  useGetAllProductsQuery,
  useGetAllTagsQuery,
  useLazyGetProductsByTagsQuery,
} from "../../redux/store";

import { Link } from "react-router-dom";
import { useSelectedTags } from "../zustand/store";

const selected = "#eab839";

const TagsSeTagsAdminSearchBar = ({ onSearch, onClearSearch }) => {
  const tagRef = useRef();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetAllProductsQuery("all");

  const {
    data: tagsData,
    error: tagsError,
    isFetching: tagsIsetching,
  } = useGetAllTagsQuery();

  const [categories, setCategories] = useState();
  const {
    tags,
    setTags,
    resetTags,
    selectedCategory,
    setCategory,
    resetCategory,
  } = useSelectedTags((state) => state);
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

  const searchByTagsHandler = (tags) => {
    onSearch(tags);
  };

  const searchByCategoryHandler = (category) => {};

  const clearSearchAndTags = () => {
    resetTags();

    onClearSearch();
  };

  return (
    <>
      <h2 className="categories-title">Find by tags</h2>
      <div className="categories_list-container" ref={tagRef}>
        {tagsData &&
          tagsData.map((tag) => {
            let isSelected = tags.find((el) => el === tag);
            return (
              <div
                key={tag}
                style={
                  isSelected
                    ? { backgroundColor: "#eab839" }
                    : { backgroundColor: "#6a603c" }
                }
                onMouseEnter={(e) =>
                  (e.target.style.border = "2px solid #eab839")
                }
                onMouseLeave={(e) =>
                  (e.target.style.border = "2px solid transparent")
                }
                onClick={(e) => {
                  if (tags && tags.find((el) => el === tag)) {
                    const index = tags.indexOf(tag);
                    if (index > -1) {
                      setTags(tags.filter((el) => el !== tag));
                    }
                  } else {
                    setTags([...tags, tag]);
                  }
                }}
                className="categories_list-item"
              >
                {tag}
              </div>
            );
          })}
      </div>
      <Link
        to=""
        className="categories_search_by_tags-btn"
        onClick={() => searchByTagsHandler(tags)}
      >
        Search
      </Link>
      <button
        className="categories_clear_tags-btn"
        onClick={() => clearSearchAndTags()}
      >
        Clear
      </button>
      <h2 className="categories-title">Find by category</h2>
      <div className="categories_list-container">
        {categories &&
          categories.map((category) => {
            let isSelected = selectedCategory === category;
            return (
              <div
                className="categories_list-item"
                key={category}
                onMouseEnter={(e) =>
                  (e.target.style.border = "2px solid #eab839")
                }
                onMouseLeave={(e) =>
                  (e.target.style.border = "2px solid transparent")
                }
                style={
                  isSelected
                    ? { backgroundColor: "#eab839" }
                    : { backgroundColor: "#6a603c" }
                }
                onClick={(e) => {
                  if (selectedCategory === category) {
                    resetCategory();
                  } else {
                    setCategory(category);
                  }
                }}
              >
                {category}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TagsSeTagsAdminSearchBar;
