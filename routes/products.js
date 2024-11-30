var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

//implementar as dependencias para o funcionamento da classe Product
const db = require('../models'); // carregando o db

//Carregando as classes service e controller da product
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

//Construi os objetos a partir das classes
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

/* GET products listing. */
router.get('/', function (req, res, next) {
    res.send('Modulo de produtos rodando.');
});

//Rota para registrar novo produto
router.post('/newProduct', auth.verifyToken, async (req, res) => {
    productController.createProduct(req, res);
});

//Rota para retornar todos os produtos
router.get('/allProducts', auth.verifyToken, async (req, res) => {
    productController.findAllProducts(req, res);
})

//Rota para retornar um produto pelo id
router.get('/getProductById', auth.verifyToken, async (req, res) => {
    productController.findProductById(req, res);
})

//Rota para atualizar um produto pelo id com dados 
router.put('/updateProduct', auth.verifyToken, async (req, res) => {
    productController.updateProduct(req, res)
})

router.delete('/deleteProduct', auth.verifyToken, async (req, res) => {
    productController.deleteProduct(req, res)
});

module.exports = router;
