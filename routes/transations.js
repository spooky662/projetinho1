var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

//implementar as dependencias para o funcionamento da classe Product
const db = require('../models'); // carregando o db

//Carregando as classes service e controller da transation
const TransationService = require('../services/transationService');
const TransationController = require('../controllers/transationController');

//Construi os objetos a partir das classes
const transationService = new TransationService(db.Transation);
const transationController = new TransationController(transationService);

/* GET transations listing. */
router.get('/', function (req, res, next) {
    res.send('Modulo de transações rodando.');
});

// Rota para pagamento via PIX
router.post('/payment/pix', auth.verifyToken, async (req, res) => {
    TransationController.pixPayment.bind(TransationController);
});

// Rota para pagamento via cartão de crédito
router.post('/payment/credit-card', auth.verifyToken, async (req, res) => {
    TransationController.creditCardPayment.bind(TransationController);
})

// Rota para visualizar uma transação
router.get('/payment/:id', auth.verifyToken, async (req, res) => {
    TransationController.viewPayment.bind(TransationController);
})

module.exports = router;