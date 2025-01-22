import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const HomeSectionCarousel = ({ sectionName, products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const responsive = {
    0: { items: 1 },
    720: { items: 2 },
    1024: { items: 4 },
    1440: { items: 5.5 },
  };

  const slidePre = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const slideNext = () => {
    if (activeIndex < products.length - responsive[1024].items) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Map over the category products and create items for the carousel
  const items = products.map((product) => (
    <div key={product.id} className="flex justify-center mx-2">
      <HomeSectionCard product={product} />
    </div>
  ));

  return (
    <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5 px-7">{sectionName}</h2>
      <div className="relative p-6">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          activeIndex={activeIndex}
          animationDuration={600} // Smooth transition
        />
        {/* Left Arrow */}
        {activeIndex > 0 && (
          <Button
            onClick={slidePre}
            variant="contained"
            sx={{
              position: "absolute",
              top: "50%",
              left: "1rem",
              transform: "translateY(-50%)",
              bgcolor: "white",
              color: "blue",
              zIndex: 50,
              minWidth: "40px",
              minHeight: "40px",
              borderRadius: "50%",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
            aria-label="Previous"
          >
            <KeyboardArrowLeftIcon />
          </Button>
        )}
        {/* Right Arrow */}
        {activeIndex < products.length - responsive[1024].items && (
          <Button
            onClick={slideNext}
            variant="contained"
            sx={{
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              bgcolor: "white",
              color: "blue",
              zIndex: 50,
              minWidth: "40px",
              minHeight: "40px",
              borderRadius: "50%",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
            aria-label="Next"
          >
            <KeyboardArrowRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
