import { IconCircleCheck } from '@tabler/icons';
import { Badge, Box,  Card, Flex, Group, Image,  List, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import noImage from '../components/img/noImage.png'
import { cardVariant } from "../components/motion/ProductMotion";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CartAmountToggle from './CartAmountToggle';



const StoreItem = ({product}) => {
    const MoCard = motion(Card)
    const urlHost = process.env.REACT_APP_HOST;

  return (
    <MoCard key={product._id} shadow="md" m="sm" radius="md" withBorder 
    variants = {cardVariant} 
    whileHover = 'hover' >
  <Card.Section component={Link} to={`/products/product/${product._id}`} >
     <Image src={product.avatar?`${urlHost}/images/${product._id}/${product.avatar}?v=${new Date().getTime()}`:noImage} height={160} alt={product.productName} /> 
  </Card.Section>

  <Group position="apart" mt="md" mb="xs" >
    <Text weight={500}>{product.productName}</Text>
    <Badge color="pink" variant="light">
      Rs. {product.price}
    </Badge>
  </Group>

  <Text size="sm" color="dimmed" style={{ height: 60 }}>{product.description}</Text>

  <List mt="md" spacing="xs" size="sm" center icon={
      <ThemeIcon color="teal" size={24} radius="xl">
        <IconCircleCheck size={16} />
      </ThemeIcon> } >
      <List.Item> Qty: {product.quantityInStock}</List.Item>
      <List.Item> Category: {product.category}</List.Item>
      <List.Item> SKU: {product.sku}</List.Item>
      <List.Item> Seller {product.user}</List.Item>
  </List>

  <Card.Section inheritPadding mt="sm" pb="md" style={{ height: 120 }}>
    <SimpleGrid cols={3}>
      { product.image.map((image, i) => (
        i<=2 ?
        <Box key={i}>
            <Image src={`${urlHost}/images/${product._id}/${image}`} key={i} radius="sm"/>
        </Box>
        : null
      ))} 
    </SimpleGrid>
  </Card.Section>

    <Flex style={{ height: 60 }}>
      <CartAmountToggle product={product} />
    </Flex>

</MoCard>
  )
}

export default StoreItem
