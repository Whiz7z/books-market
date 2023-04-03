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
  const [tagsSelected, setTagsSelected] = useState([]);
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

  const clearSearchAndTags = () => {
    setTagsSelected([]);
    [...tagRef.current.children].map(
      (child) => (child.style.backgroundColor = "#6a603c")
    );
    onClearSearch();
  };

  const selectTag = (e) => {
    e.target.style.backgroundColor = "#6a603c";
  };

  const unSelectTag = (e) => {
    e.target.style.backgroundColor = "#eab839";
  };

  return (
    <>
      <h2 className="categories-title">Find by tags</h2>
      <div className="categories_list-container" ref={tagRef}>
        {tagsData &&
          tagsData.map((tag) => {
            return (
              <div
                key={tag}
                onClick={(e) => {
                  if (tagsSelected && tagsSelected.find((el) => el === tag)) {
                    const index = tagsSelected.indexOf(tag);
                    if (index > -1) {
                      setTagsSelected((prev) =>
                        prev.filter((el) => el !== tag)
                      );
                      selectTag(e);
                      //e.target.style.backgroundColor = "#6a603c";
                    }
                  } else {
                    setTagsSelected((prev) => [...prev, tag]);
                    unSelectTag(e);
                    //e.target.style.backgroundColor = "#eab839";
                  }
                }}
                className="categories_list-item"
                style={
                  tag === choosenCategory
                    ? { backgroundColor: "#eab839" }
                    : { backgroundColor: "#6a603c" }
                }
              >
                {tag}
              </div>
            );
          })}
      </div>
      <button
        className="categories_search_by_tags-btn"
        onClick={() => searchByTagsHandler(tagsSelected)}
      >
        Search
      </button>
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
