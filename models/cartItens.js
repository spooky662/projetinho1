// models/cartItems.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartItems = sequelize.define('CartItems', {
        cartId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts', // Nome da tabela de carrinhos
                key: 'id'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products', // Nome da tabela de produtos
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1 // Quantidade padrão
        }
    });

    CartItems.associate = (models) => {
        CartItems.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
        CartItems.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    };

    return CartItems;
}
