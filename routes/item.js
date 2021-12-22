import express from 'express';

// Models
import Item from '../db/Item.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        const response = items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
        }));
        res.send(response);
    } catch (e) {
        res.send({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.send(item);
    } catch (e) {
        res.send({ error: 'Something whent wrong' });
    }
});

export default router;