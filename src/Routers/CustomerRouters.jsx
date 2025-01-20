import React from 'react';
import Navigation from '../customer/componenets/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../customer/pages/HomePage/HomePage';
import Order from '../customer/componenets/Order/Order';
import Footer from '../customer/componenets/HomeSectionCarousel/Footer/Footer';
import Product from '../customer/componenets/Product/Product';
import ProductDetails from '../customer/componenets/ProductDetails/ProductDetails';
import Checkout from '../customer/componenets/Checkout/Checkout';
import OrderDetails from '../customer/componenets/Order/OrderDetails';
import Cart from '../customer/componenets/Cart/Cart';

const CustomerRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path='/login' element={<HomePage />} />
        <Route path='/register' element={<HomePage />} />
        <Route path='*' element={<HomePage />} />
        <Route path='/order' element={<Order />} />
        <Route path='/cart' element={<Cart/> } />
        <Route path='/:lavelOne/:lavelTow/:lavelThree' element={<Product />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/account/order' element={<Order />} />
        <Route path='/account/order/:orderId' element={<OrderDetails />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
