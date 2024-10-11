import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const responseData = await fetch(SummaryApi.addProductToCart.url, {
    method: SummaryApi.addProductToCart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
  const dataResponse = await responseData.json();
  if (dataResponse.success) {
    toast.success(dataResponse.message);
  }
  if (!dataResponse.success) {
    toast.error(dataResponse.message);
  }
};

export default addToCart;
