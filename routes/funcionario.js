const express = require('express');
const router = express.Router();
const FuncionarioModel = require('../Model/funcionarioModel');

const handleError = (res, errorMsg, err) => {
    console.error(errorMsg, err);
    res.status(500).send(errorMsg);
};

router.get('/', (req, res) => {
    FuncionarioModel.getFunctionary((err, rows) => {
        if (err) {
            handleError(res, 'Erro ao buscar funcionários no banco de dados.', err);
            return;
        }
        res.render('Funcionario', { rows });
    });
});

router.post('/', (req, res) => {
    let { name, cpf, address, phone } = req.body;
    cpf = cpf.replace(/[^\d]/g, '');
    phone = phone.replace(/[^\d]/g, '');
    FuncionarioModel.insertFunctionary(name, cpf, address, phone, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/funcionario');
    });
});

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    FuncionarioModel.loadFunctionary(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao editar dados no banco de dados.');
            return;
        }
        res.render('FuncionarioEdit', { functionary: results[0] });
    });
});

router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    const { name, cpf, address, phone } = req.body;
    const cleanCpf = cpf.replace(/[^\d]/g, '');
    const cleanPhone = phone.replace(/[^\d]/g, '');

    FuncionarioModel.updateFunctionary(name, cleanCpf, address, cleanPhone, id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao atualizar dados no banco de dados.');
            return;
        }
        res.redirect('/funcionario');
    });
});

router.post('/delete/:id', (req, res) => {
    let id = req.params.id;
    FuncionarioModel.deleteFunctionary(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/funcionario');
    });
});

module.exports = router;
