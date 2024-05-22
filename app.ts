import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { productRoutes } from './src/app/modules/product/product.route';
import { OrderRoutes } from './src/app/modules/orders/order.route';

//parsers:
app.use(express.json());
app.use(cors());

app.use('/api', productRoutes)
app.use('/api', OrderRoutes)



export default app;
