import expressAsyncHandler from "express-async-handler";
import User from "../models/users.js";
import jwt from 'jsonwebtoken'
import download from 'image-downloader'
import dotenv from 'dotenv'

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;
const SERVER_URL = process.env.SERVER_URL;

//Token creation process function
const generateToken = (user, options) => {
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '60m'});
    return authtoken;
  };

//passport login/success
const passportLoginSuccess = expressAsyncHandler(async (req,res)=>{
    if(req.user) {
        try {
            const email = req.user.email._json.email;
            const user = await User.findOne({ email })
            if(user) {
                //user.fullName = req.user.email.displayName;
                //user.provider = req.user.email.provider;
                //user.provider_id = req.user.email.id;
                
                //profile picture download options
                const options = {
                    url: req.user.email.photos[0].value,
                    dest: '../../public/avatar/'+ user._id+'.png',
                };
                download.image(options)
                .then(({filename})=> {
                    console.log(filename);
                    user.profile_pic==='' || user.profile_pic===null ?  user.profile_pic = `${SERVER_URL}/avatar/${user._id}.png` : console.log('unable to picture update mongodb');
                    user.save();
                    const authtoken = generateToken(user);
                    res.status(200).json ({ status: 'Passport Login successful', authtoken, user})    
                });
            } else {
                const user = await User.create({
                    fullName: req.user.email.displayName,
                    email: req.user.email._json.email,
                    password: req.user.email.id,
                    provider: req.user.email.provider,
                    provider_id: req.user.email.id,
                    profile_pic: req.user.email.photos[0].value,
                    role: 'user',
                    isVerified: true,
                    isActive: true,
                })
                // res.status(200).json({
                //     success: true,
                //     message: "successfull",
                //     user: user,
                // });
                const authtoken = generateToken(user);
                res.status(200).json ({ status: 'Passport Login successful', authtoken, user})
        
            }

            
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404).json({
            success: false,
            message: "Passport Authentication Failed"
        })
    }
});

//passport login/failed
const passportLoginFailed = expressAsyncHandler(async (req, res)=>{
        res.status(401).json({
            success: false,
            message: "failed second",
        });
});

const passportLogout = expressAsyncHandler(async (req,res)=>{
    req.logout();
    res.redirect(`${CLIENT_URL}`)
})

export { passportLoginSuccess, passportLoginFailed, passportLogout }