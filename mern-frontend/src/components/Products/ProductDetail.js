import { Container } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleProduct } from '../../APIs/SingleProduct';

const ProductDetail = () => {
    const params = useParams();
    const [product,setProduct] = useState({})

    useEffect(()=>{
      SingleProduct(params.productid)
      .then(response=>setProduct(response.data))
      .catch(error=>console.log(error))
      // eslint-disable-next-line
    },[])


  return (
    <Container>
      <h1>Product Name: {product.productName}</h1>
      <h3>Description: <div dangerouslySetInnerHTML={{__html: product.description}} /></h3>
    </Container>
  )
}

export default ProductDetail
