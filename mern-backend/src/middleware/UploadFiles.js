import multer from "multer";
import sharp from "sharp";
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const __dirname = path.resolve();
        const productid = req.params.id;
        const userdir = __dirname + '/public/products/' + req.user._id;
        const productdir = __dirname + '/public/products/' + req.user._id + '/' + productid;
        //req.avatarname=file.originalname;
        
         if(!fs.existsSync(userdir)) {
             fs.mkdirSync(userdir);
         }
         if(!fs.existsSync(productdir)) {
            fs.mkdirSync(productdir);
        }
        cb(null, productdir);
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
});

const filter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

const multiple  = multer({
    storage: storage,
    fileFilter: filter
});

export default multiple;