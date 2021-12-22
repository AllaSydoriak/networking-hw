import Sequelize from 'sequelize';
import sequelizeConnection from './index.js';

// Models
import User from './User.js';
import OrderItem from './OrderItem.js';

const Order = sequelizeConnection.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('PENDING', 'CANCELLED', 'COMPLETE'),
    },
}, { tableName: 'Order' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

export default Order;
