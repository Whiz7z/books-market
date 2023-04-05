import React, { useState, useEffect } from "react";
import "../../styles/modal.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateProduct } from "../../redux/actions/adminActions";
import { useDispatch } from "react-redux";
import { useUpdateProductMutation } from "../../redux/store";
import { uploadImage } from "../../redux/actions/uploadImage";
import { createGlobalStyle } from "styled-components";
import { getAllTags } from "../../redux/actions/adminActions";

const EditingSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  author: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(4, "Too Short!")
    .max(3550, "Too Long!")
    .required("Required"),
  tags: Yup.string().min(2, "Too Short!").max(1500, "Too Long!"),
  price: Yup.number().required("Required"),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  stock: Yup.number().required("Required"),
});

const AdminEditProduct = ({ product, onCloseModal }) => {
  const [updateProduct, results] = useUpdateProductMutation();
  const [tagsSelected, setTagsSelected] = useState([]);
  const [fileImage, setFile] = useState();
  const [tags, setTags] = useState();

  useEffect(() => {
    const getTagsRequest = async () => {
      const resp = await getAllTags(
        JSON.parse(localStorage.getItem("userInfo")).token
      );
      console.log(resp);
      setTags(resp);
    };

    getTagsRequest();
  }, []);

  useEffect(() => {
    setTagsSelected(product.tags);
  }, []);

  console.log(tagsSelected);

  return (
    <div className="edit_product_modal-container">
      <div className="edit_product_form-container">
        <h3 className="admin_add-edit-form-title">Update product</h3>
        <Formik
          initialValues={{
            title: product.title,
            author: product.author,
            description: product.description,
            price: product.price,
            category: product.category,

            stock: product.stock,
          }}
          validationSchema={EditingSchema}
          onSubmit={async (value, actions) => {
            const productToChange = {
              id: product._id,
              title: value.title,
              author: value.author,
              description: value.description,
              price: value.price,
              category: value.category,
              tags: value.tags
                ? value.tags
                    .split(", ")
                    .concat(tagsSelected)
                    .filter(
                      (value, index, array) => array.indexOf(value) === index
                    )
                : tagsSelected,
              stock: value.stock,
              isPhotoChanged: fileImage ? true : false,
            };
            await updateProduct(productToChange)
              .unwrap()
              .then((data) => {
                onCloseModal();
                console.log("updated product", data);
                if (fileImage) {
                  const file = new FormData();
                  file.append("image", fileImage);
                  file.append("productId", data._id);
                  const uploadImageResponse = uploadImage(file);
                  console.log(uploadImageResponse);
                }
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="inputs-container">
              <div className="form-field-label-container gmail-field-label-container">
                <label className="login_form-label label-email">
                  {`Title  (current - ${product.title})`}
                </label>

                <div className="login_form-field-container">
                  <Field name="title" className="edit-field" />
                  {errors.title && touched.title ? (
                    <div className="form-error">{errors.title}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container gmail-field-label-container">
                <label className="login_form-label label-email">
                  {`Author  (current - ${product.author})`}
                </label>

                <div className="login_form-field-container">
                  <Field name="author" className="edit-field" />
                  {errors.author && touched.author ? (
                    <div className="form-error">{errors.author}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  {`Description  (current - ${product.description})`}
                </label>
                <div className="login_form-field-container">
                  <Field name="description" className="edit-field" />
                  {errors.description && touched.description ? (
                    <div className="form-error">{errors.description}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  {`Price  (current - ${product.price})`}
                </label>
                <div className="login_form-field-container">
                  <Field name="price" className="edit-field" />
                  {errors.price && touched.price ? (
                    <div className="form-error">{errors.price}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  {`Category  (current - ${product.category})`}
                </label>
                <div className="login_form-field-container">
                  <Field name="category" className="edit-field" />
                  {errors.category && touched.category ? (
                    <div className="form-error">{errors.category}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label">{`Tags (current - ${product.tags})`}</label>
                <div className="tags-container">
                  {tags &&
                    tags.map((tag) => {
                      return (
                        <div
                          key={tag}
                          className="form_tag-item"
                          style={
                            product.tags.find((el) => el === tag)
                              ? { backgroundColor: "#eab839" }
                              : { backgroundColor: "#083d77" }
                          }
                          onClick={(e) => {
                            if (
                              tagsSelected &&
                              tagsSelected.find((el) => el === tag)
                            ) {
                              const index = tagsSelected.indexOf(tag);
                              if (index > -1) {
                                setTagsSelected((prev) =>
                                  prev.filter((el) => el !== tag)
                                );
                                e.target.style.backgroundColor = "#083d77";
                              }
                            } else {
                              setTagsSelected((prev) => [...prev, tag]);
                              e.target.style.backgroundColor = "#eab839";
                            }
                          }}
                        >
                          {tag}
                        </div>
                      );
                    })}
                </div>
                <p className="login_form-label">{`Add more`}</p>
                <div className="login_form-field-container">
                  <Field as="textarea" name="tags" className="edit-field" />
                  {errors.tags && touched.tags ? (
                    <div className="form-error">{errors.tags}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  {`Stock  (current - ${product.stock})`}
                </label>
                <div className="login_form-field-container">
                  <Field name="stock" className="edit-field" />
                  {errors.stock && touched.stock ? (
                    <div className="form-error">{errors.stock}</div>
                  ) : null}
                </div>
              </div>

              <label htmlFor="file" className="create_product_file-input-label">
                Choose Photo
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="create_product_file-input"
                onChange={(event) => {
                  setFile(event.currentTarget.files[0]);
                }}
              />
              {fileImage && (
                <img
                  src={fileImage && URL.createObjectURL(fileImage)}
                  alt="none"
                  className="create_product_preview-image"
                />
              )}

              <div className="edit_product_buttons">
                <button
                  className="edit_buttons-cancel"
                  onClick={() => onCloseModal()}
                >
                  Cancel
                </button>
                <button className="edit_buttons-save" type="submit">
                  Save Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminEditProduct;
