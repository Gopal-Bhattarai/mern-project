import multer from "multer";

//Avatar upload configuration
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/avatar/')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          const newFileName = file.fieldname + '-' + uniqueSuffix + file.originalname;
          req.newfilename = newFileName
          cb(null, newFileName)
        }
      })

       const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) =>{
            if(file.originalname.match(/\.(JPG|JPEG|jpg|jpeg|PNG|png|gif|GIF|BMP|bmp)$/)){
                cb(null,true);
            }else {
                cb(null,false);
                return cb(new Error('Only .png, .jpg .jpeg, .gif or bmp format allowed'));
            }
        }
      });

      export {upload};