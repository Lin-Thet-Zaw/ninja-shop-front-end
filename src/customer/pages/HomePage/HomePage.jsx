import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../componenets/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../componenets/HomeSectionCarousel/HomeSectionCarousel";
import { Helmet } from "react-helmet";
import { CircularProgress } from "@mui/material"; // Import CircularProgress from Material-UI
import { getAllProducts } from "../../../State/Product/Action";


function HomePage() {
  const dispatch = useDispatch();

  // Fetch products and categories from Redux store
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts()); // Fetch all products on component mount
  }, [dispatch]);

  // Extract unique categories from the products
  const categories = products
    ? [...new Set(products.map((product) => product.category))]
    : [];

  return (
    <div>
      <Helmet>
        <title>Home - Ninja Shop</title>
        <meta name="description" content="Welcome to the homepage of our app." />
      </Helmet>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col">
        {loading && (
          <div className="flex justify-center items-center">
            <CircularProgress color="primary" />
          </div>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading &&
          !error &&
          categories.map((category) => (
            <HomeSectionCarousel key={category.id} sectionName={category.name} />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
