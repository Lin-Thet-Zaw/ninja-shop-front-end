import React from "react";
import MainCarousel from "../../componenets/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../componenets/HomeSectionCarousel/HomeSectionCarousel";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Home - Ninja Shop</title>
        <meta name="description" content="Welcome to the homepage of our app." />
      </Helmet>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col">
        <HomeSectionCarousel sectionName={"Man Shoes"} />
        <HomeSectionCarousel sectionName={"Man Wear"} />
        <HomeSectionCarousel sectionName={"Man Shirt"} />
      </div>
    </div>
  );
}

export default HomePage;
