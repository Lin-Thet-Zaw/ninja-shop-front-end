import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";

const OrderCard = () => {
  return (
    <div className="p-5 shadow-md shadow-black hover:shadow-2xl border">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item sx={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/2/12_4.jpg"
              alt="Order Card"
            />
            <div className="ml-5 space-y-2">
              <p className="">Men Slice Mid Rise Black Jeans</p>
              <p className="opacity-50 text-xs font-semibold">Size: M</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>$945</p>
        </Grid>
        <Grid item xs={4}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />{" "}
                <span>Deliver On March</span>
              </p>
              <p className="text-xs">Your Items Has Been Deliverd</p>
            </div>
          )}
          {false && (
            <p>
              {" "}
              <span>Expected Delivery On March</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
