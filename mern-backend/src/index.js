import dotenv from "dotenv";
import express from "express";
import dbConnection from "./config/DB.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import chalk from "chalk";
import ('./passport.js')
import apiRouter from "./apiRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert { type: "json" }

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

//Swagger
// const options={
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Docs for Shopping site',
//       version: '1.0.0',
//     },
//     servers: [{url: 'http://localhost:8080/'}]
//   },
//   apis: ['./apiRouter.js']
// }
// const swaggerSpec = swaggerJSDoc(options)

// app.get('docs.json', (req, res)=>{
//   res.setHeader('Content-Type', 'application/json')
//   res.send(swaggerSpec)
// })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


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
  console.log(chalk.hex('#FFA500')(`app is running on : ${process.env.PORT}`))
);


