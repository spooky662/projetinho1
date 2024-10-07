var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

//implementar as dependencias para o funcionamento da classe Cart
const db = require('../models'); // carregando o db

//Carregando as classes service e controller da carts
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

//Construi os objetos a partir das classes
const cartService = new CartService(db.Cart);
const cartController = new CartController(cartService);

/* GET carts listing. */
router.get('/', function (req, res, next) {
    res.send('Modulo de carrinho rodando.');
});

//Rota para adicionar um item ao carrinho
router.post('/add', auth.verifyToken, async (req, res) => {
    cartController.addProductToCart(req, res);
})

//Rota para deletar um item do carrinho
router.delete('/remove', auth.verifyToken, async (req, res) => {
    cartController.removeProductFromCart(req, res);
});

//Rota para retornar os itens do carrinho
router.get('/itens', auth.verifyToken, async (req, res) => {
    cartController.viewCartItems(req, res);
})

module.exports = router;
