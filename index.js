import express from 'express';
import sequelize from './db/index.js';

// Settings
import corsMiddleware from './cors.js';

// Routers
import { userRouter, orderRouter, itemRouter } from './routes/index.js';

const port = process.env.PORT || 8080;

sequelize.sync().then(() => { console.log('db is ready') });

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/orders', orderRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
