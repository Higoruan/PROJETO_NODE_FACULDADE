const express = require('express');
const router = express.Router();
const VendaModel = require('../Model/vendaModel');
const ClienteModel = require('../Model/clienteModel');
const FuncionarioModel = require('../Model/funcionarioModel');
const ProdutoModel = require('../Model/produtoModel');

const handleError = (res, errorMsg, err) => {
    console.error(errorMsg, err);
    res.status(500).send(errorMsg);
};

router.get('/', (req, res) => {
    VendaModel.getSales((err, sales) => {
        if (err) {
            handleError(res, 'Erro ao buscar vendas no banco de dados.', err);
            return;
        }
        ClienteModel.getCustomer((err, customers) => {
            if (err) {
                handleError(res, 'Erro ao buscar clientes no banco de dados.', err);
                return;
            }
            FuncionarioModel.getFunctionary((err, functionaries) => {
                if (err) {
                    handleError(res, 'Erro ao buscar funcionários no banco de dados.', err);
                    return;
                }
                ProdutoModel.getProduct((err, products) => {
                    if (err) {
                        handleError(res, 'Erro ao buscar produtos no banco de dados.', err);
                        return;
                    }
                    res.render('Venda', { customers, functionaries, products, sales });
                });
            });
        });
    });
});

router.post('/', (req, res) => {
    let { name, functionary_id, customer_id, product_id } = req.body;
    VendaModel.insertSale(name, functionary_id, customer_id, product_id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/venda');
    });
});

router.post('/delete/:id', (req, res) => {
    let id = req.params.id;
    VendaModel.deleteSale(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/venda');
    });
});

module.exports = router;
