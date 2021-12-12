import pkg from 'sequelize';
import sequelize from './index.js';

// Models
import ShippingAddress from './ShippingAddress.js';

const { Model, DataTypes } = pkg;

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    lastname: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    role: {
        type: DataTypes.ENUM(['ADMIN', 'USER', 'MODERATOR']),
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
});

User.belongsTo(ShippingAddress, {foreignKey: 'shippingAddressId'});

export default User;