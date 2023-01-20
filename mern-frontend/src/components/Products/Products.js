import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductState from '../Context/Product/ProductState'
import AddProduct from './ManageProduct/AddProduct'
import ProductDetail from './ProductDetail'
import ProductHome from './ProductHome'

const Products = () => {
  return (
    <ProductState>
    <Routes>
      <Route path="/" element={<ProductHome />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/update" element={<ProductHome />} />
      <Route path="/product/:productid" element={<ProductDetail />} />
    </Routes>
    </ProductState>
  )
}

export default Products
