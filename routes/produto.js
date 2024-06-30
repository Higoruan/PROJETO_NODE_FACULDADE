const express = require('express');
const router = express.Router();
const ProdutoModel = require('../Model/produtoModel');

const handleError = (res, errorMsg, err) => {
    console.error(errorMsg, err);
    res.status(500).send(errorMsg);
};

router.get('/', (req, res) => {
    ProdutoModel.getProduct((err, rows) => {
        if (err) {
            handleError(res, 'Erro ao buscar produtos no banco de dados.', err);
            return;
        }
        res.render('Produto', { rows });
    });
});

router.post('/', (req, res) => {
    let { name, brand, value } = req.body;
    ProdutoModel.insertProduct(name, brand, value, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/produto');
    });
});

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    ProdutoModel.loadProduct(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao editar dados no banco de dados.');
            return;
        }
        res.render('ProdutoEdit', { product: results[0] });
    });
});

router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    const { name, brand, value } = req.body;
    ProdutoModel.updateProduct(name, brand, value, id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao atualizar dados no banco de dados.');
            return;
        }
        res.redirect('/produto');
    });
});

router.post('/delete/:id', (req, res) => {
    let id = req.params.id;
    ProdutoModel.deleteProduct(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/produto');
    });
});

module.exports = router;
