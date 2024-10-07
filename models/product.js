// models/product.js

const { type } = require('express/lib/response');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('Product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type : Sequelize.DECIMAL,
            allowNull: false
        },
        stock: {
            type : Sequelize.INTEGER,
            allowNull: false
        }
    });
    
    return User;
}