import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './app/config/index.js';
import productRouter from './app/routes/product.route.js';
import categoryRouter from './app/routes/category.route.js';
import cartRouter from './app/routes/cart.route.js';
import orderRouter from './app/routes/order.route.js';
import userRouter from './app/routes/user.route.js';
import ApiError from './app/api-error.js';

// Connect mongodb by mongoose
mongoose.connect(config.db.uri, () => {
    console.log('Connect to MongoDB successfully!!!');
});

const app = express();

app.use(cors());
app.use(express.json({ limit: '70mb' }));
app.use(express.urlencoded({ limit: '70mb', extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello Products!' });
});

// routes
app.use('/products', productRouter);
app.use('/categorys', categoryRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, 'Resource not found'));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

app.listen(3000, () => {
    console.log('Server is running on port ' + 3000);
});
export default app;
