import { Container, Pagination, SimpleGrid} from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../components/Context/Product/ProductContext';
import StoreItem from './StoreItem';


const Store = () => {
    const {getPublicProducts, products} = useContext(ProductContext)
    const [activePage, setPage] = useState(1);

    useEffect(()=>{
        getPublicProducts(activePage)
        // localStorage.getItem('token') ? getUser() : void 0;
        // eslint-disable-next-line
    },[activePage]);


  return (
    <Container size="xl">
    <SimpleGrid cols={4} spacing="sm" breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>

        {products && products.map(product=>(
            <StoreItem key={product._id} product={product}/>
        ))}

    </SimpleGrid>
    <Pagination page={activePage} onChange={setPage} total={3} />;
    </Container>
  )
}

export default Store
