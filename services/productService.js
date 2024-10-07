// ./services/productServices.js
const auth = require('../auth');

const db = require('../models');

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    async create(name, description, price, stock) {
        try {
            const newProduct = await this.Product.create({
                name: name,
                description: description,
                price: price,
                stock: stock
            });
            return newProduct ? newProduct : null;
        }
        catch (error) {
            throw error;
        }
    }

    //Metodo para retornar todos os produtos
    async findAllProducts() {
        try {
            const AllProducts = await this.Product.findAll();
            return AllProducts ? AllProducts : null;
        }
        catch (error) {
            throw error;
        }
    }

    //Metodo para retornar o produto pela id
    async findProductById(id) {
        try {
            const Product = await this.Product.findByPK(id);
            return Product ? Product : null;
        }
        catch (error) {
            throw error;
        }
    }
    
    //Metodo para atualizar o produto
    async updateProduct(id, updatedData) {
        try {
            const [updatedCount, updatedProducts] = await this.Product.update(updatedData, {
                where: { id }
            });
            return updatedCount > 0 ? updatedProducts : null;
        } catch (error) {
            throw error;
        }
    }

    //Metodo para deletar o produto
    async deleteProduct(id) {
        try {
            const deletedCount = await this.Product.destroy({
                where: { id }
            });
            return deletedCount > 0;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = ProductService;