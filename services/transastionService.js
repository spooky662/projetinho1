// ./services/transationServices.js
const auth = require('../auth');

const db = require('../models');

class TransationService {
    constructor(TransationModel) {
        this.Transation = TransationModel;
    }

    //Metodo para PIX
    async pixPayment(id, userId, totalValue) {
        const user = await db.User.findById(userId);
        const transaction = await this.Transation.findById(id);

        if (!user || !transaction) {
            throw new Error('Usuário ou transação inválidos');
        }

        transaction.status = 'Pendente';
        transaction.method = 'PIX';
        transaction.value = totalValue;

        await new Promise(resolve => {
            setTimeout(resolve, 2000)
        });

        // Atualizando o status para 'Concluído'
        transaction.status = 'Concluído';
        await transaction.save();

        return transaction;
    }

    //Metodo para cartão de crédito
    async creditCardPayment(id, userId, totalValue) {
        const user = await db.User.findById(userId);
        const transaction = await this.Transation.findById(id);

        if (!user || !transaction) {
            throw new Error('Usuário ou transação inválidos');
        }

        transaction.status = 'Pendente';
        transaction.method = 'Cartão de Crédito';
        transaction.value = totalValue;

        await new Promise(resolve => {
            setTimeout(resolve, 2000)
        });

        // Atualizando o status para 'Concluído'
        transaction.status = 'Concluído';
        await transaction.save();

        return transaction;
    }


    //Metodo para visualizar o pagamento
    async viewPayment(id) {
        const transaction = await this.Transation.findById(id);
    
        if (!transaction) {
            throw new Error('Transação não encontrada');
        }
    
        return transaction;
    }
    
}


module.exports = TransationService;