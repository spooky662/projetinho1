// ./services/userServices.js
const auth = require('../auth');
const bcrypt = require('bcrypt');
var round_salts = 10;

const db = require('../models');

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    }

    async create(email, data_nasc, password) {
        try {
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
            const newUser = await this.User.create({
                email: email,
                data_nasc: data_nasc,
                password: hashpassword
            });
            return newUser ? newUser : null;
        }
        catch (error) {
            throw error;
        }
    }

    //Metodo para retornar todos os usuarios
    async findAll() {
        try {
            const AllUsers = await this.User.findAll();
            return AllUsers ? AllUsers : null;
        }
        catch (error) {
            throw error;
        }
    }

    //Metodo para retornar o usuario pela id
    async findById(id) {
        try {
            const User = await this.User.findByPK(id);
            return User ? User : null;
        }
        catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const User = await this.User.findOne({
                where: { email }
            });
            //Verificar senha caso usuario exista
            if (User) {
                //Comparar a senha
                if (await bcrypt.compare(password, User.password)) {
                    //Gerar o token user
                    const token = await auth.generateToken(User);
                    User.dataValues.Token = token;
                    User.dataValues.password = '';
                }
                else {
                    throw new Error('Senha inválida');
                }
            }
            return User ? User : null;
        }
        catch (error) {
            throw error;
        }
    }
}


module.exports = UserService;