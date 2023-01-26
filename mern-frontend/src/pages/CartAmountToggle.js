import { Button, Flex, Input } from '@mantine/core'
import React, { useContext } from 'react'
import { ShoppingCartContext } from '../components/Context/ShopingCartContext'
import { showNotification as notify } from '@mantine/notifications'
import { IconX } from '@tabler/icons'

const CartAmountToggle = ({product}) => {

    const {cart, dispatch} = useContext(ShoppingCartContext)
        let found = undefined
        
        cart.cart ? found = cart.cart.find(each=>each._id===product._id) : void 0

        const setIncrease = (product) =>{
            cart.cart.map(each=>each._id===product._id ? each.qty<5 ? 
            dispatch({type: 'INCREASE', payload: product})
                : notify({title:'Threshold Reached', message: 'Maximum quantity selected, Item out of order', color: 'red', icon: <IconX />}) : null
            )
            // quantity < 5 ? setQuantity(quantity+1) : setQuantity(5)
          }
      
          const setDecrease = (product) => {
            cart.cart.map(each=>each._id===product._id ? each.qty>0 ? 
                dispatch({type: 'DECREASE', payload: product})
                    : notify({title:'Error', message: 'You can not reduce further', color: 'red', icon: <IconX />}) : null
                )
            
            // quantity > 0 ? setQuantity(quantity-1) : setQuantity(0)
          }
    
        const addToCart = (product) => {
            dispatch({type: 'ADD_TO_CART', payload: product})
        }

  return (
    <>
    {/* {cart.cart.length===0 ? <Button variant="outline" onClick={()=>addToCart(product)}>+ Add to cart</Button> : void 0} */}
        { found &&
            <Flex>
                <Button variant="outline" onClick={()=>setDecrease(product)}>-</Button>
                <Input component="button" mx="lg" px="xs" >{found.qty}</Input>
                <Button variant="outline" onClick={()=>setIncrease(product)}>+</Button>
            </Flex>
        }
        { found===undefined &&
            <Flex>
                <Button variant="outline" onClick={()=>addToCart(product)}>+ Add to cart</Button>
            </Flex>
        }

    </>
  )
}

export default CartAmountToggle
