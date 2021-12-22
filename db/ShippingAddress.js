import Sequelize from 'sequelize';
import sequelizeConnection from './index.js';

const ShippingAddress = sequelizeConnection.define('ShippingAddress', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    country: {
        type: Sequelize.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    address: {
        type: Sequelize.TEXT,
        validate: {
            len: [0, 300],
        },
    },
    zipCode: {
        type: Sequelize.TEXT,
    },
}, { tableName: 'ShippingAddress' });

export default ShippingAddress;