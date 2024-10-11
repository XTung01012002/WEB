import React, { useState, useContext } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayVNDCurrency";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const context = useContext(Context);

  // Handle delete product
  const handleDelete = async () => {
    const response = await fetch(SummaryApi.deleteProduct.url, {
      method: SummaryApi.deleteProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: data._id }),
    });
    const dataApi = await response.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchData();
      context.fetchUserAddToCart();
    } else {
      toast.error(dataApi.message);
    }
    // Close confirmation dialog
    setShowConfirmDelete(false);
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayVNDCurrency(data.sellingPrice)}
          </p>

          <div className="flex gap-2 w-fit ml-auto">
            <div
              className="p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEditOutline />
            </div>
            <div
              className="p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setShowConfirmDelete(true)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductCard;
