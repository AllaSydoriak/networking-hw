import express from 'express';
import sql from '../db/index.js';

// Models
import User from '../db/User.js';
import Order from '../db/Order.js';
import OrderItem from '../db/OrderItem.js';

import sequelize from '../db/index.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll();
        const resultData = await Promise.all(orders.map(async (order) => {
            const user = await User.findOne({ where: { id: order.userId } });
            const items = await OrderItem.findAll({ where: { orderId: order.id }});

            return {
                id: order.id,
                status: order.status,
                owner: `${user.firstname} ${user.lastname}`,
                items: items.map((e) => e.id),
            };
        }));
        res.send(resultData);
    } catch (e) {
        console.log(e);
        res.send({ error: 'Something whent wrong' });
    }
});

router.get('/:status', async (req, res) => {
    const { status } = req.params;
    try {
        const orders = await Order.findAll({ where: { status: status.toUpperCase() } })
        res.send(orders.map((item) => ({
            id: item.id,
            status: item.status,
            userId: item.userId,
        })));
    } catch (e) {
        console.log(e);
        res.send({ error: 'Something whent wrong' });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const { items, ...orderInfo } = req.body;
            const order = await Order.create(orderInfo);
    
            await Promise.all(items.map(async (item) => {
                await OrderItem.create({ orderId: order.id, itemId: item });
            }));

            return {
                id: order.id,
                userId: order.userId,
                status: order.status,
                items,
            }
        })

        res.send(result);
    } catch (e) {
        console.log(e);
        res.send({ error: 'Something whent wrong' });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sequelize.transaction(async (t) => {
            const order = await Order.findOne({ where: { id } });
            const items = await OrderItem.findAll({ where: { orderId: order.id }});

            order.status = req.body.status.toUpperCase();
            
            order.save();
            
            return {
                id: order.id,
                status: order.status,
                userId: order.userId,
                items: items.map((item) => item.id),
            };
        });
        
        res.send(result);
    } catch (e) {
        console.log(e);
        res.send({ error: 'Some error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Order.destroy({ where: { id } });
        
        res.send('Order was removed successfully');
    } catch (e) {
        res.send({ error: 'Some error' });
    }
});

export default router;