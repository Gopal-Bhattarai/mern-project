import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { ImProfile } from 'react-icons/im'
import "react-toastify/dist/ReactToastify.css";
import { Box, Card, Container, FileInput, Group, Image, Loader, SimpleGrid, Tooltip } from '@mantine/core';
import { showNotification as notify } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import Resizer from "react-image-file-resizer";

const ProductImageUpload = ({productid, productImages, productAvatar, defaultImageChange}) => {
    const urlHost = process.env.REACT_APP_HOST;
    const postImagesURL = `${urlHost}/api/products/images/${productid}`;
    const [images, setImages] = useState(productImages);
    const [isUploading, setIsUploading] = useState(false);
    const userid = localStorage.getItem('userid');
    const folder = `${urlHost}/images/${userid}/${productid}`;

    const deleteProductImage = async (arrayIndex, imgName) => {
        setIsUploading(true)
        const response = await fetch(`${urlHost}/api/products/updateproduct/${productid}/image/${arrayIndex}`,{
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        })
        await response.json();
        setImages(images.filter((img)=>img!==imgName))  
        notify({title: 'Great', message: "Item Removed", icon: <IconCheck /> })        
        setIsUploading(false)
    }

    const makeDefaultPicture = async (arrayIndex, imgName) => {
        const response = await fetch(`${urlHost}/api/products/updateproduct/${productid}/default/${arrayIndex}`,{
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        })
        await response.json();
        notify({title: 'Great', message: "Process Completed", icon: <IconCheck /> })        

        //defaultImageChange(imgName);
    }

    const resizeFile = (file) =>
    // console.log(file);
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
            );
        });

    const check = async (f) => {
        let formData = new FormData();
        f.map(async e=>{
            const image = await resizeFile(e);
            formData.append("imageList", image, e.name) 
            setImages(images=>[...images, e.name])  

            const response = await fetch(postImagesURL, {
                method: 'POST',
                headers: {
                    "auth-token" : localStorage.getItem('token')
                },
                body: formData
            })
            await response.json();
        })

        
        setIsUploading(false)

        makeDefaultPicture(0); //making 0th image an Avatar
         
    }

return (
    <Container>

        <form encType="multipart/form-data" method="POST">
            <div className="form-group">
                <FileInput placeholder='Click me to upload images' type="file" id="imageList" name="imageList" multiple accept="image/*" onChange={(f)=>check(f) } />
                
            </div>
        </form>

        <SimpleGrid cols={4} spacing="lg" breakpoints={[
                { maxWidth: 980, cols: 3, spacing: 'md' },
                { maxWidth: 755, cols: 2, spacing: 'sm' },
                { maxWidth: 600, cols: 1, spacing: 'sm' },
            ]}>
            { isUploading && <Loader size="xl" variant="bars" />}
            { !isUploading &&  images.map ((each,i)=> 
                     (
                        <Card key={i} shadow="lg">
                                <Image src={`${folder}/${each}`}  />
                                { productAvatar !== each &&
                                    <Group m="sm" position="apart">
                                            <Tooltip label="Delete this picture">
                                                <Box my="sm" onClick={()=>deleteProductImage(i, each)}>
                                                        <RiDeleteBin6Line color={"red"} size={20} style={{cursor:"pointer"}} />
                                                </Box>
                                            </Tooltip>

                                            <Tooltip label="Make this default display picture">
                                                <Box my="sm" onClick={()=>makeDefaultPicture(i, each)}>
                                                        <ImProfile color={"navy"} size={20} style={{cursor:"pointer"}}/>
                                                </Box>
                                            </Tooltip>
                                    </Group>
                                }
                        </Card>
                    )
                )
            }

        </SimpleGrid>
    </Container>
  )
}

export default ProductImageUpload
