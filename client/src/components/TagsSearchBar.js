import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseCategory, setProducts } from "../redux/store";
import {
  useGetAllProductsQuery,
  useGetAllTagsQuery,
  useLazyGetProductsByTagsQuery,
} from "../redux/store";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useSelectedTags } from "./zustand/store";

const selected = "#eab839";

const TagsSearchBar = ({ onSearch, onClearSearch }) => {
  const tagRef = useRef();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetAllProductsQuery("all");

  const {
    data: tagsData,
    error: tagsError,
    isFetching: tagsIsetching,
  } = useGetAllTagsQuery();

  const [categories, setCategories] = useState();
  const { tags, setTags, resetTags } = useSelectedTags((state) => state);
  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );

  useEffect(() => {
    if (data) {
      setCategories([...new Set(data.map((product) => product.category))]);
    }
    if (tags) {
      onSearch(tags);
    }
  }, [data]);

  const chooseCategoryHandler = (category) => {
    dispatch(chooseCategory(category));
  };

  const searchByTagsHandler = (tags) => {
    console.log(tags.length);
    if (tags.length !== 0) {
      onSearch(tags);
    }
  };

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

                      //e.target.style.backgroundColor = "#6a603c";
                    }
                  } else {
                    setTags([...tags, tag]);

                    //e.target.style.backgroundColor = "#eab839";
                  }
                }}
                className="categories_list-item"
                // style={
                //   tag === choosenCategory
                //     ? { backgroundColor: "#eab839" }
                //     : { backgroundColor: "#6a603c" }
                // }
              >
                {tag}
              </div>
            );
          })}
      </div>
      <Link
        to={tags.length !== 0 ? `tags/${tags}` : ""}
        state={{ tags: tags }}
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
    </>
  );
};

export default TagsSearchBar;
