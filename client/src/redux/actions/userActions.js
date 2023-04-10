import axios from "axios";
import { userLogin, setLoading, setError } from "../store";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      if (response.status > 400) {
        console.log(response);
      }
      dispatch(userLogin(response.data));
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

export const register =
  ({ email, password, name }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { name, email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

export const changeInfo =
  ({ name, surname, email, token }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/users/changeinfo",
        { name, surname, email },
        config
      );
      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

export const changePassword =
  ({ currentPassword, newPassword, token }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/users/changepassword",
        { currentPassword, newPassword },
        config
      );
      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

export const sendMessage = async ({ email, message }) => {
  try {
    const { data } = await axios.post("/api/users/sendContactMessage", {
      email,
      message,
    });
    console.log(data);

    return data;
  } catch (errr) {}
};
