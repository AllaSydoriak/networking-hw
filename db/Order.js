import pkg from 'sequelize';
import sequelize from './index.js';

// Models
import User from './User.js';

const { Model, DataTypes } = pkg;

class Order extends Model {};

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(['PENDING', 'CANCELLED', 'COMPLETE']),
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'Order',
});

Order.belongsTo(User);

export default Order;
