"use client";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Rating, Button, Grid, Box, LinearProgress } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  // const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const {products} = useSelector(store=>store)
  
  const handelAddToCard = ()=> {
    const data = {productId:params.productId,size:selectedSize.name}
    console.log("handleAddToCart data", data)
    dispatch(addItemToCart(data));
    navigate("/cart/")
  }

  useEffect(()=> {
    const data= {productId:params.productId}
    dispatch(findProductById(data))
  },[params.productId]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          {/* <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol> */}
        </nav>
        <settion className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                // alt={product.product>[0].alt}
                src={products.product?.imageUrl}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {/* {product.images.map((image) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
              ))} */}
            </div>
          </div>
          {/* Product info */}
          <div
            className="lg:col-span-1 max-auto max-w-2x1 px-4 pb-16 sm:px-6 lg:max-w-7x1 lg:px-8
          lg:pb-24"
          >
            <div className="lg:col-span-2">
              <h1 className="text-lg font-semibold text-gray-900">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg font-semibold text-gray-900 opacity-60 pt-1">
              {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">${products.product?.price}</p>
                <p className="opacity-50 line-through">${products.product?.discountedPrice}</p>
                <p className="text-green-700 font-semibold">{products.product?.discountedPercent}% off</p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={1.5} readOnly />
                  <p className="opacity-50 text-sm">5349 rating</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    234 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center gap-x-3"
                    >
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "size-8 rounded-full border border-black/10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div> */}

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a> */}
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {products.product?.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          // disabled={!size.inStock}
                          className={classNames(
                            size
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {/* {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )} */}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button
                  onClick={handelAddToCard}
                  variant="contained"
                  disabled={!selectedSize}
                  sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}
                >
                  Add to cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              {/* <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div> */}

              <div className="mt-10">
                {/* <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3> */}

                {/* <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{products.product?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </settion>
        {/* rating and reviews */}
        {/* <section>
          <h1 className="font-semibold text-lg pb-4">
            Recent Review and Ratings
          </h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1, 1, 1, 1].map((reviews) => (
                    <ProductReviewCard />
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
                <div className="flex items-center space-x-3">
                  <Rating value={4.5} precision={0.5} readOnly />
                  <p className="opacity-60">5345 Ratings</p>
                </div>
                <Box className="mt-5">
                  <Grid
                    container
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    gap={2}
                  >
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress sx={{bgcolor:"#d0d0d0", borderRadius:4, height:7}}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section> */}
        {/* Similar Products */}
        {/* <section className="pt-10">
            <h1 className="py-5 text-xl font-bold">Similar Products</h1>
            <div className="flex flex-wrap space-y-5">
                  {[1,1,1,1,].map((similar) =><HomeSectionCard product={product}/>)}
            </div>
        </section> */}
      </div>
    </div>
  );
}
