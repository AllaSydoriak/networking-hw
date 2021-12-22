import Sequelize from 'sequelize';
import sequelizeConnection from './index.js';

// Models
import OrderItem from './OrderItem.js';

const Item = sequelizeConnection.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    price: {
        type: Sequelize.NUMBER,
    }
}, { tableName: 'Item' });

Item.hasMany(OrderItem, { foreignKey: 'itemId' });

export default Item;
