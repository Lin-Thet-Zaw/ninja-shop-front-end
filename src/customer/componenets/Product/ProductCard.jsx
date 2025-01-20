import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`product/${product.id}`)} 
            className="productCard w-full sm:w-[15rem] md:w-[18rem] lg:w-[20rem] m-3 transition-all cursor-pointer">
            
            <div className="h-[20rem] sm:h-[18rem] md:h-[20rem]">
                <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            <div className="textPart bg-white p-3">
                <div className="mb-2">
                    <p className="font-bold opacity-60">{product.topLevelCategory} </p>
                    <p>{product.secondLevelCategory}</p>
                </div>
                
                <div className="mb-2">
                    <p className="text-lg font-semibold">{product.title}</p>
                    <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="mb-2">
                    <p className="font-bold text-blue-600">Brand: {product.brand}</p>
                    <p>Color: <span className="capitalize">{product.color}</span></p>
                </div>
                
                <div className="mb-2">
                    <p className="text-gray-500">Available Sizes:</p>
                    <ul className="flex space-x-2">
                        {product.sizes.map((size) => (
                            <li 
                                key={size.name} 
                                className="border px-2 py-1 rounded-md text-sm">
                                {size.name} ({size.quantity})
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mb-2">
                    <p className="font-semibold text-xl">${product.price}</p>
                    <p className="line-through text-gray-400">${product.discountedPrice}</p>
                    <p className="text-green-600 font-semibold">{product.discountedPercent}% off</p>
                </div>
                
                <div>
                    <p className="text-sm text-gray-600">Total Quantity: {product.quantity}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
