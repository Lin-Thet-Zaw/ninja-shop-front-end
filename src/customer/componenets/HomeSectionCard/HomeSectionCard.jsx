import React from "react";

const HomeSectionCard = ({ product }) => {
  console.log(product); // For debugging to see product details in the console

  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[14rem] md:w-[15rem] mx-3 border">
      {/* Image Section */}
      <div className="h-[12rem] w-full">
        <img
          className="object-cover object-center w-full h-full"
          src={product.imageUrl} // Use dynamic image URL from product
          alt={product.title}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 w-full text-center">
        {/* Product Title */}
        <h3 className="text-lg font-medium text-gray-900 truncate">{product.title}</h3>
        
        {/* Product Description */}
        <p className="mt-2 text-sm text-gray-700 truncate">{product.description}</p>
        
        {/* Product Category */}
        <p className="mt-2 text-sm text-gray-500">
          Category: {product.category.name}
        </p>

        {/* Product Price & Discount */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-900">
            ${product.discountedPrice}
          </span>
          {product.discountedPercent > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* Sizes */}
        <div className="mt-2 flex justify-center space-x-2">
          {product.sizes.map((size) => (
            <span
              key={size.name}
              className="text-xs px-2 py-1 border rounded-full text-gray-700"
            >
              {size.name} ({size.quantity} available)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSectionCard;
