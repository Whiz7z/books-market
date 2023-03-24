import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { setAddress } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingInSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  postcode: Yup.string().required("Required"),
});

const AddressCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="login_form-container">
      <h2 className="form_main-label">Your address</h2>
      <Formik
        initialValues={{
          country: "",
          city: "",
          address: "",
          postcode: "",
        }}
        validationSchema={SingInSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          dispatch(setAddress(values));
          navigate("/payment");
        }}
      >
        {({ errors, touched }) => (
          <Form className="inputs-container">
            <div className="form-field-label-container">
              <label className="login_form-label">Country</label>

              <div className="login_form-field-container">
                <Field name="country" className="login_form-field" />
                {errors.country && touched.country ? (
                  <div className="form-error">{errors.country}</div>
                ) : null}
              </div>
            </div>

            <div className="form-field-label-container ">
              <label className="login_form-label">City</label>
              <div className="login_form-field-container">
                <Field name="city" className="login_form-field" />
                {errors.city && touched.city ? (
                  <div className="form-error">{errors.city}</div>
                ) : null}
              </div>
            </div>

            <div className="form-field-label-container ">
              <label className="login_form-label">Address</label>
              <div className="login_form-field-container">
                <Field name="address" className="login_form-field" />
                {errors.address && touched.address ? (
                  <div className="form-error">{errors.address}</div>
                ) : null}
              </div>
            </div>

            <div className="form-field-label-container ">
              <label className="login_form-label">Postcode</label>
              <div className="login_form-field-container">
                <Field name="postcode" className="login_form-field" />
                {errors.address && touched.postcode ? (
                  <div className="form-error">{errors.postcode}</div>
                ) : null}
              </div>
            </div>

            <div className="login_form-buttons">
              <button type="submit" className="login_form-btn">
                Move to payment
              </button>

              <Link to="/cart">
                <button as={Link} type="button" className="login_form-btn">
                  Back to cart
                </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressCheckout;
