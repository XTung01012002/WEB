import React, { useState, useEffect } from "react";
import UploadProduct from "../components/UpLoadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import productCategory from "../helpers/productCategory";

const AllProduct = () => {
  const [openUpLoadProduct, setOpenUpLoadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectAll, setSelectAll] = useState(true); // State for "Select All"

  // Function to fetch products based on selected categories
  const fetchProducts = async (categories = []) => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ category: categories }),
    });
    const data = await response.json();
    console.log("data", data);
    if (data.success) {
      setAllProduct(data.data);
      setFilteredProducts(data.data);
    }
  };

  useEffect(() => {
    // Update selected categories based on "Select All"
    if (selectAll) {
      const allCategoryKeys = productCategory.map((category) => category.value);
      setSelectedCategories(
        allCategoryKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    } else {
      // Handle case where "Select All" is unchecked
      const categories = Object.keys(selectedCategories).filter(
        (key) => selectedCategories[key]
      );
      fetchProducts(categories); // Fetch filtered products based on selected categories
    }
  }, [selectAll]);

  useEffect(() => {
    const categories = Object.keys(selectedCategories).filter(
      (key) => selectedCategories[key]
    );
    fetchProducts(categories); // Fetch filtered products based on selected categories
  }, [selectedCategories]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setSelectAll(checked);

    const updatedCategories = {};
    productCategory.forEach((category) => {
      updatedCategories[category.value] = checked;
    });

    setSelectedCategories(updatedCategories);
  };

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUpLoadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="py-2">
        <form className="text-sm flex flex-wrap gap-4 py-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="select-all"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label htmlFor="select-all">All</label>
          </div>
          {productCategory.map((category) => (
            <div className="flex items-center gap-2" key={category.value}>
              <input
                type="checkbox"
                name="category"
                value={category.value}
                id={category.value}
                checked={selectedCategories[category.value] || false}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category.value}>{category.label}</label>
            </div>
          ))}
        </form>
      </div>

      {/** filtered products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + "filteredProduct"}
              fetchData={() =>
                fetchProducts(
                  Object.keys(selectedCategories).filter(
                    (key) => selectedCategories[key]
                  )
                )
              }
            />
          ))
        ) : (
          <p>No products available for the selected categories.</p>
        )}
      </div>

      {/** upload product component */}
      {openUpLoadProduct && (
        <UploadProduct
          onClose={() => setOpenUpLoadProduct(false)}
          fetchData={() =>
            fetchProducts(
              Object.keys(selectedCategories).filter(
                (key) => selectedCategories[key]
              )
            )
          }
        />
      )}
    </div>
  );
};

export default AllProduct;
