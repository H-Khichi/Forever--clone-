import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/mongoDB.js'; // Ensure correct path
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'
// App config
const app = express();
const port = process.env.PORT || 4000;

ConnectDB(); 
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API end points
app.use('/api/user', userRoutes);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log(`Server started on Port: ${port}`));
