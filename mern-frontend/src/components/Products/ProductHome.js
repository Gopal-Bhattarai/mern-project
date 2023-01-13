import { Box, Button, Container, Indicator } from '@mantine/core';
import { useRef, useState } from 'react';
import AddProduct from './ManageProduct/AddProduct';
import ProductMain from './ProductMain'

const ProductHome = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addNewBtnText, setAddNewBtnText] = useState('Add New Product')
  const addNewRef = useRef(null);


  const addProduct = () => {
    if(isAdd) {
      setIsAdd(false)
      setAddNewBtnText('Add New Product')
    } else {
      setIsAdd(true);
      setAddNewBtnText('Go Back')
    }
  }

  return (
    <Container size="xl">

     {/* header row  */}
    <Box mx="sm"> 
      {/* <div className="col-md-8">Advertisement Premium Rs. 5000</div> */}
      <Indicator inline color="green" withBorder>
        <Button type="button" onClick={addProduct} ref={addNewRef} className='btn btn-primary active shadow rounded-3 position-relative'>
          {addNewBtnText}
        </Button>
      </Indicator>
    </Box>

     {/* body row  */}
    <Box>
      {/* <div className="col-6 col-md-2"><ProductLeftBar /></div> */}
      {!isAdd && <ProductMain /> } {isAdd && <AddProduct cancelAdd={addProduct} /> }
      {/* <div className="col-6 col-md-2"><ProductRightBar /></div> */}
    </Box>


  </Container>
  )
}

export default ProductHome
