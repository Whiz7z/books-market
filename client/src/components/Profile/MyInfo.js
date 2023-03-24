import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeInfo, changePassword } from "../../redux/actions/userActions";
import { createGlobalStyle } from "styled-components";

const SingInSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  surname: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SingInSchemaPasswordChange = Yup.object().shape({
  currentPassword: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  newPassword: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  newPasswordAgain: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

const MyInfo = () => {
  const dispatch = useDispatch();
  return (
    <div className="myInfo-container">
      <h2 className="myInfo-title">Presonal information</h2>
      <div className="myInfo_change-info-form-container">
        <h3 className="myInfo_change_info-title">
          Change personal information
        </h3>
        <Formik
          initialValues={{
            email:
              localStorage.getItem("userInfo") &&
              JSON.parse(localStorage.getItem("userInfo")).email,
            name:
              localStorage.getItem("userInfo") &&
              JSON.parse(localStorage.getItem("userInfo")).name,
            surname:
              (localStorage.getItem("userInfo") &&
                JSON.parse(localStorage.getItem("userInfo")).surname) ||
              "",
          }}
          validationSchema={SingInSchema}
          onSubmit={(values, actions) => {
            let payload = {
              name: values.name,
              surname: values.surname,
              email: values.email,
              token: JSON.parse(localStorage.getItem("userInfo")).token,
            };
            dispatch(changeInfo(payload));
          }}
        >
          {({ errors, touched }) => (
            <Form className="inputs-container">
              <div className="form-field-label-container gmail-field-label-container">
                <label className="login_form-label label-email">Name</label>

                <div className="login_form-field-container">
                  <Field name="name" className="login_form-field" />
                  {errors.name && touched.name ? (
                    <div className="form-error">{errors.name}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  Surname
                </label>
                <div className="login_form-field-container">
                  <Field name="surname" className="login_form-field" />
                  {errors.surname && touched.surname ? (
                    <div className="form-error">{errors.surname}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  E-mail
                </label>
                <div className="login_form-field-container">
                  <Field name="email" className="login_form-field" />
                  {errors.email && touched.email ? (
                    <div className="form-error">{errors.email}</div>
                  ) : null}
                </div>
              </div>

              <button type="submit" className="myInfo_save-changes-btn">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="myInfo_change-password-form-container">
        <h3 className="myInfo_change_info-title">Change password</h3>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            newPasswordAgain: "",
          }}
          validationSchema={SingInSchemaPasswordChange}
          onSubmit={(values, actions) => {
            if (values.newPassword === values.newPasswordAgain) {
              let payload = {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                token: JSON.parse(localStorage.getItem("userInfo")).token,
              };
              dispatch(changePassword(payload));
            } else {
              console.log("Password doesn't match");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="inputs-container">
              <div className="form-field-label-container gmail-field-label-container">
                <label className="login_form-label label-email">
                  Current password
                </label>

                <div className="login_form-field-container">
                  <Field name="currentPassword" className="login_form-field" />
                  {errors.currentPassword && touched.currentPassword ? (
                    <div className="form-error">{errors.currentPassword}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  New password
                </label>
                <div className="login_form-field-container">
                  <Field name="newPassword" className="login_form-field" />
                  {errors.newPassword && touched.newPasswordnewPassword ? (
                    <div className="form-error">{errors.newPassword}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-field-label-container password-field-label-container">
                <label className="login_form-label label-password">
                  New password again
                </label>
                <div className="login_form-field-container">
                  <Field name="newPasswordAgain" className="login_form-field" />
                  {errors.newPasswordAgain && touched.newPasswordAgain ? (
                    <div className="form-error">{errors.newPasswordAgain}</div>
                  ) : null}
                </div>
              </div>

              <button type="submit" className="myInfo_save-changes-btn">
                Save new password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyInfo;
