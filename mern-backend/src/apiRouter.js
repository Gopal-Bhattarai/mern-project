import express from 'express'
import AuthRouter from "./routers/authRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import brandsRouter from "./routers/brandsRouter.js";
import productRouter from './routers/productRouter.js';
import orderRouter from "./routers/ordersRouter.js"; 
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";
import emailRouter from "./routers/emailRouter.js";

const apiRouter = express.Router();

/**
 * @swagger
 * /api/auth:
 *  get:
 *    tag:
 *      - Authentication
 *      description: Responds if the app is up and running
 *      responses:
 *        200:
 *          description: App is up and running
*/
apiRouter.use("/auth", AuthRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/brand", brandsRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/email", emailRouter);

export default apiRouter;