import React, { useState, useEffect } from "react";
import {
  chooseCategory,
  useCreateProductMutation,
  useGetAllProductsQuery,
} from "../../redux/store";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { Autocomplete, TextField } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/actions/uploadImage";

const EditingSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number().required("Required"),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  stock: Yup.number().required("Required"),
});

const AdminAddNewProduct = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const { data, error, isFetching, refetch } = useGetAllProductsQuery("all");
  const [iscategoryPanelOpen, setIsCategoryPanelOpen] = useState();
  const [categories, setCategories] = useState();
  const [fileImage, setFile] = useState();

  useEffect(() => {
    if (data) {
      setCategories([...new Set(data.map((product) => product.category))]);
    }
  }, [data]);
  const [createNewProduct, createProductResult] = useCreateProductMutation();

  const categoryPanelOpen = (is) => {
    setIsCategoryPanelOpen(is);
  };
  return (
    <div className="edit_product_modal-container">
      <div className="edit_product_form-container">
        <h3 className="admin_add-edit-form-title">Create new product</h3>
        <Formik
          enableReinitialize={true}
          initialValues={{
            title: "",
            description: "",
            price: "",
            category: "",
            stock: "",
          }}
          validationSchema={EditingSchema}
          onSubmit={async (value, actions) => {
            const productToCreate = {
              title: value.title,
              description: value.description,
              price: value.price,
              category: value.category,
              stock: value.stock,
            };

            const createdProduct = await createNewProduct(
              productToCreate
            ).unwrap();
            const file = new FormData();
            file.append("image", fileImage);
            file.append("productId", createdProduct._id);
            const uploadImageResponse = await uploadImage(file);
            console.log(uploadImageResponse);
            refetch();

            // actions.resetForm();
          }}
        >
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form className="inputs-container">
              <div className="form-field-label-container gmail-field-label-container">
                <label className="login_form-label">{`Title`}</label>

                <div className="login_form-field-container">
                  <Field name="title" className="edit-field" />
                  {errors.title && touched.title ? (
                    <div className="form-error">{errors.title}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label">{`Description`}</label>
                <div className="login_form-field-container">
                  <Field name="description" className="edit-field" />
                  {errors.description && touched.description ? (
                    <div className="form-error">{errors.description}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label">{`Price`}</label>
                <div className="login_form-field-container">
                  <Field name="price" className="edit-field" />
                  {errors.price && touched.price ? (
                    <div className="form-error">{errors.price}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container">
                <label className="login_form-label">{`Category`}</label>
                <div className="category_field-container">
                  <Field
                    name="category"
                    className="edit-field"
                    onClick={() => categoryPanelOpen(true)}
                    autoComplete="off"
                  ></Field>
                  {iscategoryPanelOpen && (
                    <div
                      className="category-options"
                      onMouseLeave={() => categoryPanelOpen(false)}
                    >
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="category-option"
                          onClick={() => {
                            setFieldValue("category", category);
                            categoryPanelOpen(false);
                          }}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.category && touched.category ? (
                    <div className="form-error">{errors.category}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label">{`Stock`}</label>
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
                  Create new product
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminAddNewProduct;
