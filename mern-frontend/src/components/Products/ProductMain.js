import { SimpleGrid } from "@mantine/core";
import { useContext, useEffect, useState } from "react"
import ProductContext from "../Context/Product/ProductContext"
import EditProduct from "./ManageProduct/EditProduct";
import ProductItem from "./ProductItem";

const ProductMain = () => {
    const {getProducts, products} = useContext(ProductContext)
    const [isEdit, setIsEdit] = useState(false);
    const [editProduct, setEditProduct] = useState({});

    const setEditTrue = (state) => {
      setIsEdit(true)
      setEditProduct(state)
    }
    const setEditFalse = () => {
      setIsEdit(false);
    }

    useEffect(()=>{
        getProducts()
        // eslint-disable-next-line
    },[]);

  return (
    <>
    {isEdit && <EditProduct cancelEdit={setEditFalse} productModify={editProduct}/> }
    
    <SimpleGrid cols={5} spacing="sm" breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}>
      {!isEdit &&
      products.map(product=> {
        return (
            // <Card shadow="lg" m="sm" key={product._id} withBorder>
                 <ProductItem key={product._id} product={product} handleEdit={setEditTrue} /> 
            // </Card>
        )
        }
      ) } 
    </SimpleGrid>
    </>
  )
}

export default ProductMain
