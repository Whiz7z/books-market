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

export const getAllTags = async (token) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get("/api/tags/", config);
    //console.log(response.data);
    if (response.status > 400) {
      console.log(response);
    } else {
      return response.data;
    }
  } catch (err) {}
};
