import dotenv from "dotenv";
import express from "express";
import dbConnection from "./config/DB.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import ('./passport.js')
import apiRouter from "./config/apiRouter.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

//session variable
app.use(cookieSession({
  name: "session",
  keys: [process.env.AUTH_KEYS],
  maxAge: 24 * 60 * 60 * 100
}))

//Init Passport
app.use(passport.initialize());
app.use(passport.session());

//CORS configuation
const CLIENT_URL = process.env.CLIENT_URL;
app.use(
  cors({
    origin: [CLIENT_URL,"http://localhost"],
    methods: "GET, POST, DELETE, PUT, PATCH, delete",
    credentials: true
  })
);

//making avatar(user profile picture) folder public
app.use('/avatar', express.static('public/avatar'))
app.use('/images', express.static('public/products'))

//defaul root route to check if server is serving or not
app.get("/", (req, res) => {
  res.send("API is running...");
});

//route
app.use('/api', apiRouter);

//connect with mongoDB
dbConnection();

//Initializing server to listen on given port
app.listen(
  process.env.PORT,
  console.log(`app is running on : ${process.env.PORT}`)
);


