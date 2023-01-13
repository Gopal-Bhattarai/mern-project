import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import {  Button, Container,  Group, TextInput } from '@mantine/core'
import { AddProductAPI } from '../../../APIs/Product/AddProduct'
import { IconCheck, IconX } from '@tabler/icons'
import { showNotification as notify } from '@mantine/notifications'
import ProductImageUpload from './ProductImageUpload'

const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})

    const form = useForm({

        initialValues: {
            productName: '',
            brand:'',
            category:'',
            price: 0,
            discount:0,
            quantityInStock:0,
            description:'',
            sku:'',
            active: true,
            user: 'user',
            avatar: '',
            image: [],
        },

        validate: {
            productName: (value) => value ? null : 'Product name is required',
            price: (value) => value<=1 ? 'Price should be added' : null,
            sku: (value) => value ? null : 'SKU is unique id, is required'
        },
    })

    const handleSubmit = (values) => {
        
        setLoading(true);
        AddProductAPI(values)
        .then(response=>{
            console.log(response.data);
            setProduct(response.data);
            notify({title: 'Great', message: "Product Added", icon: <IconCheck /> })        
        })
        .catch(function (error) {
            notify({title: 'Error', message: "Internal Error", color:'red', icon: <IconX /> })        
            console.log(error);
            });
            setLoading(false)  
    }

  return (
    <Container size="lg">
    { product._id ?
        <ProductImageUpload productid={product._id} productImages={product.image} productAvatar={product.avatar}/>
    : (
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Group>
        <TextInput withAsterisk label="Product Name" placeholder='Your product name...'
        {...form.getInputProps('productName')} />

        <TextInput label="Brand" placeholder='Brand...'
        {...form.getInputProps('brand')} />

        <TextInput label="Category" placeholder='Category...'
        {...form.getInputProps('category')} />

        <TextInput withAsterisk label="Price" placeholder='Price...'
        {...form.getInputProps('price')} />

        <TextInput label="Discount" placeholder='Discount...'
        {...form.getInputProps('discount')} />

        <TextInput label="Quantity in Stock" placeholder='Quantity in Stock...'
        {...form.getInputProps('quantityInStock')} />

        <TextInput label="Description" placeholder='Description...'
        {...form.getInputProps('description')} />

        <TextInput withAsterisk label="SKU" placeholder='SKU...'
        {...form.getInputProps('sku')} />

        </Group>
        <Button my="md" type='submit' loading={loading}>Add New</Button>
      </form> ) }
    </Container>
  )
}

export default AddProduct
