import Sequelize from 'sequelize';
import sequelizeConnection from './index.js';

const OrderItem = sequelizeConnection.define('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
    },
}, { tableName: 'OrderItem' });

export default OrderItem;
