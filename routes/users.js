var express = require('express');
var router = express.Router();
const auth = require('../auth'); //Carregar os objetos do auth.js

//implementar as dependencias para o funcionamento da classe User
const db = require('../models'); // carregando o db

//Carregando as classes service e controller da user
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

//Construi os objetos a partir das classes
const userService = new UserService(db.User);
const userController = new UserController(userService);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Modulo de usuarios rodando.');
});

//Rota para login
router.post('/login', async (req, res) => {
  userController.login(req, res);
})

//Rota para registrar novo usuario
router.post('/novouser', async (req, res) => {
  userController.createUser(req, res);
});

//Rota para retornar todos os usuarios
router.get('/allusers', auth.verifyToken, async (req, res) => {
  userController.findAllUsers(res, res);
})

//Rota para retornar um usuario pelo id
router.get('/getUserById', async (req, res) => {
  userController.findUserById(req, res);
})

module.exports = router;
