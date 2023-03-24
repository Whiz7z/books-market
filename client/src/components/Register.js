import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createGlobalStyle } from "styled-components";
import { BiCaretRight } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/userActions";

//style={{ gridTemplateRows: "1fr 1fr 1fr 1fr" }}

const SingInSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Register = () => {
  const dispatch = useDispatch();
  return (
    <div className="login_form-container">
      <h2 className="form_main-label">Registration</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
        }}
        validationSchema={SingInSchema}
        onSubmit={(values, actions) => {
          dispatch(register(values));
          actions.resetForm();
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="inputs-container">
            <div className="form-field-label-container gmail-field-label-container">
              <label className="login_form-label label-username">
                Username
              </label>

              <div className="login_form-field-container">
                <Field name="name" className="login_form-field" />
                {errors.name && touched.name ? (
                  <div className="form-error">{errors.name}</div>
                ) : null}
              </div>
            </div>

            <div className="form-field-label-container gmail-field-label-container">
              <label className="login_form-label label-email">E-mail</label>

              <div className="login_form-field-container">
                <Field name="email" className="login_form-field" />
                {errors.email && touched.email ? (
                  <div className="form-error">{errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="form-field-label-container password-field-label-container">
              <label className="login_form-label label-password">
                Password
              </label>
              <div className="login_form-field-container">
                <Field name="password" className="login_form-field" />
                {errors.password && touched.password ? (
                  <div className="form-error">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="login_form-buttons">
              <button type="submit" className="login_form-btn">
                Register
              </button>
              <Link to="/login">
                <button as={Link} type="button" className="login_form-btn">
                  Switch to Sign In
                </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
