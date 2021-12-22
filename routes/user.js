import express from 'express';

// Models
import User from '../db/User.js';
import ShippingAddress from '../db/ShippingAddress.js';

import sequelize from '../db/index.js';

const router = express.Router()

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
    const {
        firstname,
        lastname,
        role,
        country,
        address,
        zipCode,
    } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            const shippingAddress = await ShippingAddress.create({ country, address, zipCode });
            const user = await User.create({ firstname, lastname, role, shippingAddressId: shippingAddress.id });

            return {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
            };
        })
        
        res.send(result);
    } catch (e) {
        res.send({ error: 'Something went wrong' });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({ where: { id } });
    
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.role = req.body.role.toUpperCase();
    
            const address = await ShippingAddress.findOne({ where: { id: user.shippingAddressId }});
        
            address.country = req.body.country;
            address.address = req.body.address;
            address.zipCode = req.body.zipCode;
    
            address.save();
            user.save();
            
            return {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
            };
        });
        
        res.send(result);
    } catch (e) {
        res.send({ error: 'Some error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { id } });
        
        res.send('User was removed successfully');
    } catch (e) {
        res.send({ error: 'Some error' });
    }
});

router.get('/shipping-address/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ where: { id } });
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

export default router;