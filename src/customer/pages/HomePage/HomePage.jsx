import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../componenets/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../componenets/HomeSectionCarousel/HomeSectionCarousel";
import { Helmet } from "react-helmet";
import { CircularProgress } from "@mui/material";
import { getAllProducts } from "../../../State/Product/Action";

function HomePage() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts()); // Fetch all products on component mount
  }, [dispatch]);

  console.log("Home Categories", products);

  // Group products by category
  const groupedCategories = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});

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
        {!loading && !error &&
          Object.keys(groupedCategories).map((categoryName) => (
            <HomeSectionCarousel
              key={categoryName}
              sectionName={categoryName}
              products={groupedCategories[categoryName]} // Pass the products for this category to the carousel
            />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
