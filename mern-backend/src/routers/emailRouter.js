import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import { sendEmail } from '../controllers/emailController.js';

dotenv.config();

const emailRouter = express.Router();

// emailRouter.use(express.json());

//Send Email 
emailRouter.post("/sendEmail", sendEmail)

  export default emailRouter;