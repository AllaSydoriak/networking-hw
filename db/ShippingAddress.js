import pkg from 'sequelize';
import sequelize from './index.js';

const { Model, DataTypes } = pkg;

class ShippingAddress extends Model {};

ShippingAddress.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 100],
        },
    },
    address: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 300],
        },
    },
    zipCode: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    modelName: 'ShippingAddress',
    tableName: 'ShippingAddress',
});

export default ShippingAddress;