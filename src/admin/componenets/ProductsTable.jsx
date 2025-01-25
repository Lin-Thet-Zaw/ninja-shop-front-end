import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts, getAllProducts } from '../../State/Product/Action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const {products, auth} = useSelector(store=>store)
  const navigate = useNavigate();

  console.log("Admin products", products)
  console.log("Admin Products", auth)
  if(auth?.user?.role !="admin"){
    toast.info("You are not admin")
    navigate("/")
  }

  if(auth?.user === null) {
    // toast.info("Please login")
    navigate("/")
  }

  console.log("Filter Data:", products);
  useEffect(() => {
      // const data = {
      //   category: "Baby Sleep",
      //   color: "",
      //   size: [],
      //   minPrice: 100,
      //   maxPrice: 100000,
      //   minDiscounted: 0,
      //   sort: "price_low",
      //   pageNumber:  0,
      //   pageSize: 10,
      //   stock: "",
      // };    
      // dispatch(findProducts(data));
      // console.log("Filter Data:", data);
      dispatch(getAllProducts())
    }, [products.deleteProduct]);

    const handelProductDelete=(productId) => {
      dispatch(deleteProduct(productId));
    }
  return (
    <div>
      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="All Products"/>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align='left'>Brand</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Color</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align='left'>Sizes</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.products?.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              <TableCell align="left" scope="row">
                {item.title}
              </TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell align="left">{item.category.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.color}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              <TableCell>{item.sizes?.map((size)=><p>{size.name}</p>)}</TableCell>
              <TableCell align="left">
                <Button variant='outlined' onClick={() => handelProductDelete(item.id)}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </div>
  )
}

export default ProductsTable
