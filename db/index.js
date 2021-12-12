import Sequelize from 'sequelize';

const sequelize = new Sequelize('networking-hw', 'root', '', {
    dialect: 'sqlite',
    host: './db.sqlite3',
});

export default sequelize;