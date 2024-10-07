// models/transation.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Transation = sequelize.define('Transation', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        totalValue: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        paymentMethod: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}