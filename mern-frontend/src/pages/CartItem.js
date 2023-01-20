import React, { useContext } from 'react'
import { ActionIcon, Box,  Card, Container, Flex,  Image,  SimpleGrid, Text } from '@mantine/core';
import noImage from '../components/img/noImage.png'
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../components/Context/ShopingCartContext';
import CartAmountToggle from './CartAmountToggle'
import { IconTrash } from '@tabler/icons';



const CartItem = ({product}) => {
    const urlHost = process.env.REACT_APP_HOST;
    const {dispatch} = useContext(ShoppingCartContext)

    const removeFromCart = (product) => {
      dispatch({type: 'REMOVE_FROM_CART', payload: product})
    }


  return (
    <Container>
    <Card key={product._id} shadow="md" mx="lg" radius="md" >
      <SimpleGrid cols={5}>

      
        <Box sx={{textAlign: 'center'}} component={Link} to={`/products/product/${product._id}`} ml="md">
          <Image src={product.avatar?`${urlHost}/images/${product._id}/${product.avatar}?v=${new Date().getTime()}`:noImage} height={80} width={80} radius="lg" alt={product.productName} /> 
        </Box>

        <Box>
        <Text weight={700}>{product.productName}</Text>
          <Text color="pink" variant="light">
            Rs. {product.price}
          </Text>
        </Box>

        {/* <Flex>
            <Button variant="outline" onClick={()=>setQuantity(quantity-1)}>-</Button>
            <Input component="button" mx="xs"  > {product.qty}</Input>
            <Button variant="outline" onClick={()=>setQuantity(quantity+1)}>+</Button>
        </Flex> */}
        <Flex justify="flex-end" align="center">
          <CartAmountToggle product={product}/>
        </Flex>

        <Flex justify="flex-end" align="center">
          <Text color="pink" variant="light">
            Rs. {product.price*product.qty}
          </Text>
        </Flex>

        <Flex justify="center" align="center">
          <ActionIcon variant="light" onClick={()=>removeFromCart(product)}><IconTrash color="red" /></ActionIcon> 
        </Flex>
      </SimpleGrid>
    </Card>
    </Container>
  )
}

export default CartItem
