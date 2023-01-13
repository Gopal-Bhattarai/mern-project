import { Box, Button, Card, Group, Select, SimpleGrid, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react"
import ProductContext from "../../Context/Product/ProductContext";
import ProductImageUpload from "./ProductImageUpload";

const EditProduct = ({productModify : product, cancelEdit}) => {

    const urlHost = process.env.REACT_APP_HOST;
    const {products, setProducts} = useContext(ProductContext)
    const [loading, setLoading] = useState(false)

    const form = useForm({

        initialValues: product,

        validate: {
            productName: (value) => value ? null : 'Product name is required',
            price: (value) => value<=1 ? 'Price should be added' : null,
            sku: (value) => value ? null : 'SKU is unique id, is required'
        },
    })

    const handleClick = async (e) =>{
        // e.preventDefault();
        setLoading(true);

        //update in database
        const response = await fetch(`${urlHost}/api/products/updateproduct/${product._id}`,{
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({...e})
        })
        await response.json();
        setProducts(products.map(p=>p._id===e._id ? ({...p, ...e}) : p))
        cancelEdit();
        setLoading(false)  

    }

  return (
    
    <>
    {product.productName &&
    <SimpleGrid cols={2} spacing="sm" breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}>
        <Box>
            <Title order={2} my="sm">Modify {product.productName}</Title>

            <form onSubmit={form.onSubmit((values) => handleClick(values))}>
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

            <Select label="Active Status" data={[{value: true, label: 'active'},{value: false, label: 'inactive'}]}
            {...form.getInputProps('active')} />

            </Group>
            <Button mx="sm" my="md" type='submit' loading={loading}>Update</Button>
            <Button mx="sm" onClick={cancelEdit}>Cancel</Button>
        </form>
        </Box>

        <Box>
            <Card shadow="md">
                <ProductImageUpload productid={product._id} productImages={product.image} productAvatar={product.avatar} />
            </Card>
        </Box>
    </SimpleGrid>
    }
    </>
  )
}

export default EditProduct
