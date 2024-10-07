// ./controllers/cartController.js
class CartController {
    constructor(CartService) {
        this.cartService = CartService;
    }

    // Método para adicionar um produto ao carrinho
    async addProductToCart(req, res) {
        const { cartId, productId, quantity } = req.body;
        try {
            const addedItem = await this.cartService.addProductToCart(cartId, productId, quantity);
            res.status(200).json(addedItem);
        } catch (error) {
            if (error.message === 'Produto não encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho' });
            }
        }
    }

    // Método para remover um produto do carrinho
    async removeProductFromCart(req, res) {
        const { cartId, productId } = req.body;
        try {
            const success = await this.cartService.removeProductFromCart(cartId, productId);
            if (success) {
                res.status(200).json({ message: 'Produto removido com sucesso' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado no carrinho' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao remover produto do carrinho' });
        }
    }

    // Método para visualizar os itens no carrinho
    async viewCartItems(req, res) {
        const { cartId } = req.query; // Obtém o cartId da query
        try {
            const items = await this.cartService.viewCartItems(cartId);
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao visualizar itens no carrinho' });
        }
    }
}

module.exports = CartController;
