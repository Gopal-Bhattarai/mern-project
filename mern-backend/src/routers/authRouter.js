import express from "express";
import passport from "passport";
import {passportLoginSuccess, passportLoginFailed,
    passportLogout} from '../controllers/authController.js'

const AuthRouter = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;

AuthRouter.get("/login/success", passportLoginSuccess);
AuthRouter.get("/login/failed", passportLoginFailed)
AuthRouter.get("/logout", passportLogout)

//GOOGLE
AuthRouter.get("/google",passport.authenticate("google", { scope:["profile","email"] }));

AuthRouter.get("/google/callback", passport.authenticate("google",{
    successRedirect:  `${CLIENT_URL}`, //"/auth/login/success", 
    failureRedirect: "/login/failed",
}));

//GITHUB
AuthRouter.get("/github",passport.authenticate("github", { scope:["email"] }));

AuthRouter.get("/github/callback",passport.authenticate("github",{
    successRedirect:  `${CLIENT_URL}`, //"/auth/login/success", 
    failureRedirect: "/login/failed",
}));

//FACEBOOK
AuthRouter.get("/facebook",passport.authenticate("facebook", { scope:["profile","email"] }));

AuthRouter.get("/facebook/callback",passport.authenticate("facebook",{
    successRedirect:  `${CLIENT_URL}`, //"/auth/login/success", 
    failureRedirect: "/login/failed",
}));

export default AuthRouter;