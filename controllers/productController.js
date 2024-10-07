// ./controllers/productController.js

class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }
    
    async createProduct(req, res) {
        // Cria o produto
        const { name, description, price, stock } = req.body;
        try {
            const newProduct = await this.productService.create(name, description, price, stock);
            res.status(200).json(newProduct);
        }
        catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao gravar o novo produto' });
        }
    }

    async findAllProducts(req, res) {
        try {
            const AllProducts = await this.productService.findAll();
            res.status(200).json(AllProducts);
        }
        catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao localizar todos os produtos' });
        }
    }

    async findProductById(req, res) {
        const { id } = req.query;
        try {
            const User = await this.productService.findProductById(id);
            res.status(200).json(User);
        }
        catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao localizar o produto pelo id' });
        }
    }

    async updateProductController(req, res) {
        const { id } = req.params; // ID é passado como parâmetro de rota
        const updatedData = req.body; // Os dados para atualização vêm da requisição
        try {
            const updatedProduct = await this.productService.updateProduct(id, updatedData);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Produto não encontrado ou não atualizado' });
            }
        } catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao atualizar o produto' });
        }
    }

    async deleteProductController(req, res) {
        const { id } = req.params; // ID é passado como parâmetro de rota
        try {
            const deleted = await this.productService.deleteProduct(id);
            if (deleted) {
                res.status(204).send(); // 204 significa que não ha mais conteudo
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            res
                .status(500)
                .json({ error: 'Ocorreu um erro ao deletar o produto' });
        }
    }

}

module.exports = ProductController;