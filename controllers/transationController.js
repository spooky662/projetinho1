// ./controllers/transationController.js
class TransationController {
    constructor(TransationService) {
        this.transationService = TransationService;
    }

    //Metodo para PIX
    async pixPayment(req, res) {
        const { id, userId, totalValue } = req.body;

        try {
            const transaction = await this.transationService.pixPayment(id, userId, totalValue);
            return res.status(200).json(transaction);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Ocorreu um erro ao realizar o pagamento.' });
        }
    }

    //Metodo para cartão de crédito
    async creditCardPayment(req, res) {
        const { id, userId, totalValue } = req.body;

        try {
            const transaction = await this.transationService.creditCardPayment(id, userId, totalValue);
            return res.status(200).json(transaction);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Ocorreu um erro ao realizar o pagamento.' });
        }
    }

    //Metodo para visualizar o pagamento
    async viewPayment(req, res) {
        const { id } = req.params;

        try {
            const transaction = await this.transationService.viewPayment(id);
            return res.status(200).json(transaction);
        } catch (error) {
            return res
                .status(404)
                .json({ error: 'Ocorreu um erro ao visualizar o carrinho.' });
        }
    }

}

module.exports = TransationController;