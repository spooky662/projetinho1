// ./services/cartService.js
const db = require('../models'); // Certifique-se de que os modelos estão corretamente importados

class CartService {
    constructor(CartModel, CartItemsModel) {
        this.Cart = CartModel;
        this.CartItems = CartItemsModel;
    }

    // Método para adicionar um produto ao carrinho
    async addProductToCart(cartId, productId, quantity) {
        try {
            // Verifica se o item já existe no carrinho
            const existingItem = await this.CartItems.findOne({
                where: {
                    cartId,
                    productId
                }
            });

            if (existingItem) {
                // Se o item já existir, atualiza a quantidade
                existingItem.quantity += quantity;
                await existingItem.save();
                return existingItem;
            } else {
                // Se não existir, cria um novo item
                const newItem = await this.CartItems.create({
                    cartId,
                    productId,
                    quantity
                });
                return newItem;
            }
        } catch (error) {
            throw error;
        }
    }

    // Metodo para remover um produto do carrinho
    async removeProductFromCart(cartId, productId) {
        try {
            const deletedCount = await this.CartItems.destroy({
                where: {
                    cartId,
                    productId
                }
            });
            return deletedCount > 0; // Retorna verdadeiro se um item foi deletado
        } catch (error) {
            throw error;
        }
    }

    // Metodo para visualizar os itens no carrinho
    async viewCartItems(cartId) {
        try {
            const items = await this.CartItems.findAll({
                where: { cartId },
                include: [
                    {
                        model: db.Product,
                        as: 'product'
                    }
                ]
            });
            return items; // Retorna os itens encontrados
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;
