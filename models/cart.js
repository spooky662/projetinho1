// models/cart.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
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
                model: 'Users', // Nome da tabela de usuários
                key: 'id'
            }
        }
    });

    Cart.associate = (models) => {
        // Associação com o usuário
        Cart.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        // Associação com os produtos
        Cart.belongsToMany(models.Product, {
            through: 'CartItems', // Tabela intermediária
            foreignKey: 'cartId',
            otherKey: 'productId',
            as: 'products'
        });
    };

    return Cart;
}