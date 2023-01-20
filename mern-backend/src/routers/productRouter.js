import express from 'express';
import isAuthenticated from '../middleware/Authentication.js';
import {addProduct, getProduct, getProducts, updateProduct, get, getPublicProduct,
    deleteProduct, uploadImages, makeDefaultImage, deleteImages, getImages} from '../controllers/productController.js'
const productRouter = express.Router();
import multiple from '../middleware/UploadFiles.js';

productRouter.use(express.json());

//showing products to public users without authentication
productRouter.get("/public/", get);
productRouter.get("/public/:id", getPublicProduct);

//Route to fetch single products for corresponding user: Login required
productRouter.get('/getProduct/:id', isAuthenticated, getProduct)

//Route to fetch all products for corresponding user: Login required
productRouter.get('/getProducts', isAuthenticated, getProducts)

//Route to create a new product for corresponding user: Login required
productRouter.post('/addproduct', isAuthenticated, addProduct)

//Route to update a new product for corresponding user: Login required
productRouter.put('/updateproduct/:id', isAuthenticated, updateProduct)

//Route to delete a new product for corresponding user: Login required
productRouter.delete('/deleteproduct/:id', isAuthenticated, deleteProduct)

//Images Upload 
productRouter.post("/images/:id", isAuthenticated, multiple.array('imageList'), uploadImages)
productRouter.get('/images/:id',  getImages)

//Route to delete an image from an array in a document corresponding user/product: Login required
productRouter.put('/updateproduct/:productid/image/:imageid', isAuthenticated, deleteImages)

//Route to make default image from an array in a document corresponding user/product: Login required
productRouter.put('/updateproduct/:productid/default/:imageid', isAuthenticated, makeDefaultImage)


export default productRouter;