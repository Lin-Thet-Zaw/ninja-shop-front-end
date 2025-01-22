import React from "react";
import { useDispatch } from "react-redux";

const HomeSectionCard = () => {
  return (
    <div
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg
    overflow-hidden w-full sm:w-[14rem] md:w-[15rem] mx-3 border"
    >
      {/* Image Section */}
      <div className="h-[12rem] w-full">
        <img
          className="object-cover object-center w-full h-full"
          src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/2/12_4.jpg"
          alt="Product"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 w-full text-center">
        <h3 className="text-lg font-medium text-gray-900 truncate">Victor</h3>
        <p className="mt-2 text-sm text-gray-700 truncate">Men solid</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
