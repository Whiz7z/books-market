import React from "react";
import IconLocation from "./../Icons/IconLocation";
import IconTelephone from "./../Icons/IconTelephone";
import IconEmail from "./../Icons/IconEmail";
import "../../styles/contactUs.css";
import CartList from "./../CartList";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CgLaptop } from "react-icons/cg";
import { sendMessage } from "../../redux/actions/userActions";

const contactSchema = Yup.object().shape({
  email: Yup.string().email("It is not an email").required("Required"),
  message: Yup.string()
    .min(4, "Too Short!")
    .max(3550, "Too Long!")
    .required("Required"),
});

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact_main-title">Get in touch</h2>
      <div className="contact-ways">
        <div className="contact_way-address contact_way-block">
          <div className="contact_addres-icon icon-container">
            <IconLocation fill={"#eab839"} className="contact-icon" />
          </div>
          <h3 className="contact_way-title">Address</h3>
          <div className="contact_info-block">
            <h4 className="contact_info-title">Main office</h4>
            <p className="contact_info-paragraph">
              His Majesty The King Buckingham Palace, London, SW1A 1AA
            </p>
          </div>
        </div>
        <div className="contact_way-phone contact_way-block">
          <div className="contact_phone-icon icon-container">
            <IconTelephone fill={"#eab839"} className="contact-icon" />
          </div>
          <h3 className="contact_way-title">Phone</h3>
          <div className="contact_info-block">
            <h4 className="contact_info-title">Main service contact</h4>
            <p className="contact_info-paragraph">+44 7855 487955</p>
          </div>
        </div>
        <div className="contact_way-email contact_way-block">
          <div className="contact_email-icon icon-container">
            <IconEmail fill={"#eab839"} className="contact-icon" />
          </div>
          <h3 className="contact_way-title">Email</h3>
          <div className="contact_info-block">
            <h4 className="contact_info-title">Service</h4>
            <p className="contact_info-paragraph">supportflea@gmail.com</p>
            <h4 className="contact_info-title">Employment</h4>
            <p className="contact_info-paragraph">careerflea@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="contact_divide-line"></div>
      <div className="contact_messageUs">
        <div className="contact_message-side">
          <h1 className="contact_message-title">Message us</h1>
          <p className="contact_message-paragraph">
            Feel free to give your feedback, ask any questions.<br></br> Please
            provide youe e-mail, so we can respond to you
          </p>
        </div>
        <Formik
          initialValues={{ email: "", message: "" }}
          validationSchema={contactSchema}
          onSubmit={async (values, actions) => {
            const payload = {
              email: values.email,
              message: values.message,
            };
            sendMessage(payload)
              .then(alert("Message was sent!"))
              .then(actions.resetForm());
            console.log(payload);
          }}
        >
          {({ errors, touched }) => (
            <Form className="contact_form-container">
              <div className="form-field-label-container">
                <label className="contact_field-label">{`E-mail`}</label>

                <div className="contact_field-email">
                  <Field name="email" className="edit-field" />
                  {errors.email && touched.email ? (
                    <div className="form-error">{errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-field-label-container">
                <label className="contact_field-label">{`Message`}</label>
                <div className="contact_field-message">
                  <Field
                    as="textarea"
                    name="message"
                    className="edit-field-message"
                  />
                  {errors.message && touched.message ? (
                    <div className="form-error">{errors.message}</div>
                  ) : null}
                </div>
              </div>
              <button className="contact_submit-btn" type="submit">
                Send message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
