import express from 'express';
import sequelize from './db/index.js';

// Models
import User from './db/User.js';
import Order from './db/Order.js';
import ShippingAddress from './db/ShippingAddress.js';

sequelize.sync().then(() => { console.log('db is ready') });

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        const response = users.map((item) => ({
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            role: item.role,
        }));
        res.send(response);
    } catch (e) {
        res.send({ error: 'Something went wrong' });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        res.send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
        });
    } catch (e) {
        res.send({ error: 'Something went wrong' });
    }
});

app.post('/users', async (req, res) => {
    const {
        firstname,
        lastname,
        role,
        country,
        address,
        zipCode,
    } = req.body;

    try {
        const shippingAddress = await ShippingAddress.create({ country, address, zipCode });
        const user = await User.create({ firstname, lastname, role, shippingAddressId: shippingAddress.id });
        
        res.send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
        });
    } catch (e) {
        res.send({ error: 'Something went wrong' });
    }
});

app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        user.firstname = req.body.firstname;
        user.save();
        
        res.send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
        });
    } catch (e) {
        res.send({ error: 'Some error' });
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log({ id });
    try {
        await User.destroy({ where: { id } });
        
        res.send('User was removed successfully');
    } catch (e) {
        res.send({ error: 'Some error' });
    }
});

app.get('/user-shipping-address/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
        console.log(user);
        const address = await ShippingAddress.findOne({ where: { id: user.shippingAddressId }});

        res.send({
            id: address.id,
            country: address.country,
            address: address.address,
            zipCode: address.zipCode,
        });
    } catch (e) {
        res.send({ error: 'Something whent wrong' });
    }
});

app.get('/orders', async (req, res) => {
    try {
        Order.findAll().then(async (orders) => {
            const result = await orders.map(async (order) => {
                const user = await User.findOne({ where: { id: order.userId } });

                return orders.map((item) => ({
                    id: item.id,
                    status: item.status,
                    owner: `${user.firstname} ${user.lastname}`,
                    items: [],
                }));
            });
            res.send(result);
        });
    } catch (e) {
        res.send({ error: 'Something whent wrongg' });
    }
});

app.post('/orders', async (req, res) => {
    try {
        console.log(req.body);
        const order = await Order.create(req);
        res.send(order);
    } catch (e) {
        res.send({ error: 'Something whent wrong' });
    }
});

app.listen(3000, () => {
    console.log('server is running on port 3000')
});