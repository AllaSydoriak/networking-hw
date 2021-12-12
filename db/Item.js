import pkg from 'sequelize';
import sequelize from './index.js';

// Models
import Order from './Order';

const { Model, DataTypes } = pkg;

class Item extends Model {};

Item.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    price: {
        type: DataTypes.NUMBER,
    }
}, {
    sequelize,
    modelName: 'Item',
    tableName: 'Item',
});

Item.belongsToMany(Order, { through: 'OrderItem', foreignKey: 'itemId', otherKey: 'orderId' });

export default Item;
