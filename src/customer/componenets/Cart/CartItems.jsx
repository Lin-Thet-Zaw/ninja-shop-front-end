import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCartItem } from "../../../State/Cart/Action";

const CartItems = ({item}) => {
  const dispatch = useDispatch();
  const product = item.product || {};
  const handleUpdateCart = (num) =>{
    const data ={data:{quantity:item.quantity+num}, cartItemId:item?.id}
    console.log("Updata cart item",data)
    dispatch(updateCartItem(data))
  }

  const handelRemoveCartItem = () => {
    dispatch(removeItemFromCart(item.id));
  }
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={product.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{product.title}</p>
          <p className="opacity-70 mt-2">Size: {item.size},{product.color}</p>
          <p className="opacity-70 mt-2">Seller: {product.brand}</p>
          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">${item.price}</p>
            <p className="opacity-50 line-through">${item.discountedPrice}</p>
            <p className="text-green-700 font-semibold">{product.discountedPrice}% off</p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton onClick={()=>handleUpdateCart(-1)} disabled={item.quantity<=1}>
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item.quantity}</span>
            <IconButton onClick={()=>handleUpdateCart(1)} sx={{color:"RGB(145 85 253)"}}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
        </div>
        <div>
            <Button onClick={handelRemoveCartItem} sx={{color:"RGB(145 85 253)"}}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
