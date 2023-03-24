import axios from "axios";
import { useGetAllProductsQuery } from "../store";

export const updateProduct = (product, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put("/api/products/", { product }, config);

    if (response.status > 400) {
      console.log(response);
    }

    useGetAllProductsQuery("all");
    console.log(response.data);
  } catch (error) {}
};
