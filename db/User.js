import Sequelize from 'sequelize';
import sequelizeConnection from './index.js';

// Models
import ShippingAddress from './ShippingAddress.js';

const User = sequelizeConnection.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: Sequelize.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    lastname: {
        type: Sequelize.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    role: {
        type: Sequelize.ENUM('ADMIN', 'USER', 'MODERATOR'),
    },
}, { tableName: 'User' })

User.belongsTo(ShippingAddress, {foreignKey: 'shippingAddressId'});

export default User;
