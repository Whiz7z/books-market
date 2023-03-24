import axios from "axios";
import { setOrderError, setOrderLoading } from "../store";

export const createOrder =
  ({ buyer, items, address }) =>
  async (dispatch) => {
    dispatch(setOrderLoading(true));

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "/api/orders/createOrder",
        { buyer, items, address },
        config
      );

      console.log(response.data);
    } catch (error) {
      dispatch(
        setOrderError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };
