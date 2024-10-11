import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
    const dataResponse = await fetch(SummaryApi.categoryWishProduct.url, {
        method: SummaryApi.categoryWishProduct.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: category }),
    });
    const data = await dataResponse.json();
    return data;
}

export default fetchCategoryWiseProduct;