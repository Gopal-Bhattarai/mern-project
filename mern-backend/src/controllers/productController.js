import expressAsyncHandler from "express-async-handler"
import Product from "../models/products.js"
import User from "../models/users.js";

const addProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const { productName, description, active, sku, brand, 
            category, price, discount, quantityInStock
             } = req.body;
             console.log(req.body);
        const product = new Product ({
            productName, description, active,sku, brand, 
            category, price, quantityInStock, discount, user: req.user.id
        })
        const saveproduct = await product.save()
        res.json(saveproduct)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const updateProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const { productName, description, active, brand, 
            category, price, discount, quantityInStock, sku
             } = req.body;

        //find a product with same user token to be updated
        const product = await Product.findOne({_id: req.params.id, user: req.user.id});
 
        if(!product) {return res.status(404).send("Product Not Available")}
  
        if(productName){product.productName=productName};
        if(brand){product.brand=brand};
        if(category){product.category=category};
        if(price){product.price=price};
        if(discount){product.discount=discount};
        if(quantityInStock){product.quantityInStock=quantityInStock};
        if(description){product.description=description};
        if(sku){product.sku=sku};
        if(active){product.active=active};
        //update the note
        await product.save();
        res.status(200).send({product})
        console.log(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
})

const getProducts = expressAsyncHandler(async(req, res)=>{
    try {
        const product = await Product.find({user: req.user.id}).sort({ createdAt: -1 });
        res.json(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

//showing products to public users without authentication with limit to 6 and 1 page
const get = expressAsyncHandler(async(req, res)=>{
    try {
        const {page=1, limit=6} = req.query; 
        const count = await Product.countDocuments({ });
        const product = await Product.find({ }).limit(limit*1).skip((page-1)*limit).sort({ createdAt: -1 });

        res.json({success: true, totalResults: count, products: product});
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const getProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const product = await Product.findOne({_id: req.params.id, user: req.user.id});
        res.json(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const deleteProduct = expressAsyncHandler(async(req, res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findOne({_id: req.params.id, user: req.user.id});
        
        //find a product with same user token to be deleted
        if(!product) {return res.status(404).send("Product Not Available")}

        //delete if found
        await product.deleteOne();

        res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const uploadImages = expressAsyncHandler( async (req, res)=>{
    try {
    const id = req.params.id;
    const product = await Product.findOne({_id: id, user: req.user._id})

    //find a product with same user token to be deleted
    if(!product) {return res.status(404).send("Product Not Available")}
    
    const files = req.files;
    files.forEach((e,i)=>{
        product.image.push(e.originalname);
    })
        await product.save();
      res.status(200).json ({message: 'Avatar updated successfully'})
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message);
    }
    //res.status(200).json({message: 'Images uploaded'});
});
  
const getImages = expressAsyncHandler(async (req,res)=>{
    try {
      console.log(req.params.id);
      const user = await User.findById(req.params.id)
  
      if(!user || !user.avatar){
          throw new Error()
      }
      res.set('Content-Type','image/png')
      res.send(user.avatar)
  }catch(e) {
      console.log(`Error: ${error.message}`);
      res.status(400).send(error.message);
  }
});
  
const deleteImages = expressAsyncHandler(async (req,res)=>{
    try {
        console.log(req.params);
        // //find a product with same user token to be updated
        const product = await Product.findOne({_id: req.params.productid, user: req.user.id});
 
        if(!product) {return res.status(404).send("Product Not Available")}
  
        const imagesArr = product.image;
        imagesArr.splice(req.params.imageid, 1)
        product.image = imagesArr

        await product.save();
        res.status(200).send({ message: 'Image Deleted' })
        // console.log(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const makeDefaultImage = expressAsyncHandler(async (req,res)=>{
    try {
        console.log(req.params);
        // //find a product with same user token to be updated
        const product = await Product.findOne({_id: req.params.productid, user: req.user.id});
 
        if(!product) {return res.status(404).send("Product Not Available")}
  
        const defaultImageArrayId = req.params.imageid;
        const getNamefromDBArray = product.image[req.params.imageid]
        product.avatar = getNamefromDBArray;

        await product.save();
        res.status(200).send({ message: 'Image Deleted' })
        // console.log(product);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

export {
    get, addProduct, getProduct, getProducts, updateProduct, deleteProduct, uploadImages, getImages, deleteImages, makeDefaultImage
}