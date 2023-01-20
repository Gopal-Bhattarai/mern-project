import { useContext } from 'react';
import ProductContext from "../Context/Product/ProductContext";
import noImage from '../img/noImage.png'
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Group, Image,  List, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { IconCheck, IconCircleCheck } from '@tabler/icons';
import { DeleteProductAPI } from '../../APIs/Product/DeleteProduct';
import { showNotification as notify } from '@mantine/notifications';
import { motion } from "framer-motion"
import { cardVariant } from "../motion/ProductMotion";



const ProductItem = ({product, handleEdit, user}) => {
    const urlHost = process.env.REACT_APP_HOST;
    const {products, setProducts} = useContext(ProductContext)
    const folder = `${urlHost}/images/${product._id}`;
    

    const MoCard = motion(Card)

    const handleDelete = async (id) => {
      DeleteProductAPI(id)
      .then(response=>{
        setProducts(products.filter(p=>p._id!==id))
        notify({title: 'Great', message: "Product Deleted", icon: <IconCheck /> })        
      }).catch (error => console.log(error))
    }
  return (
      <MoCard shadow="md" m="sm" radius="md" withBorder 
          variants = {cardVariant} 
          whileHover = 'hover' >
        <Card.Section component={Link} to={`/products/product/${product._id}`} >
          { user._id && <Image src={product.avatar?`${folder}/${product.avatar}?v=${new Date().getTime()}`:noImage} height={160} alt={product.productName} /> }
        </Card.Section>

        <Group position="apart" mt="md" mb="xs" >
          <Text weight={500}>{product.productName}</Text>
          <Badge color="pink" variant="light">
            Rs. {product.price}
          </Badge>
        </Group>

        {/* <Text size="sm" color="dimmed" style={{ height: 60 }}><div dangerouslySetInnerHTML={{__html: product.description}} /></Text> */}

        <List mt="md" spacing="xs" size="sm" center icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon> } >
            <List.Item> Qty: {product.quantityInStock}</List.Item>
            <List.Item> Category: {product.category}</List.Item>
            <List.Item> SKU: {product.sku}</List.Item>
            <List.Item> Seller: {product.user}</List.Item>
        </List>

        <Card.Section inheritPadding mt="sm" pb="md" style={{ height: 100 }}>
          <SimpleGrid cols={3}>
            {user._id && product.image.map((image, i) => (
              i<=2 ?
              <Image src={`${folder}/${image}`} key={i} radius="sm"/>
              : null
            ))} 
          </SimpleGrid>
        </Card.Section>

        <Group mt="sm" position="apart" >
          <Button compact variant='outline' radius="sm" mx="sm" onClick={()=>handleEdit(product)}>Edit</Button>
          <Button compact variant='outline' radius="sm" mx="sm" color="orange" onClick={()=>handleDelete(product._id)}>Delete</Button>
        </Group>

      </MoCard>
        
  )
}

export default ProductItem
