const express = require('express');
const router = express.Router();
const ClienteModel = require('../Model/clienteModel');

const handleError = (res, errorMsg, err) => {
    console.error(errorMsg, err);
    res.status(500).send(errorMsg);
};

router.get('/', (req, res) => {
    ClienteModel.getCustomer((err, rows) => {
        if (err) {
            handleError(res, 'Erro ao buscar clientes no banco de dados.', err);
            return;
        }
        res.render('Cliente', { rows });
    });
});

router.post('/', (req, res) => {
    let { name, cpf, address, phone } = req.body;
    cpf = cpf.replace(/[^\d]/g, '');
    phone = phone.replace(/[^\d]/g, '');
    ClienteModel.insertCustomer(name, cpf, address, phone, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/cliente');
    });
});

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    ClienteModel.loadCustomer(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao editar dados no banco de dados.');
            return;
        }
        res.render('ClienteEdit', { customer: results[0] });
    });
});

router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    const { name, cpf, address, phone } = req.body;
    const cleanCpf = cpf.replace(/[^\d]/g, '');
    const cleanPhone = phone.replace(/[^\d]/g, '');

    ClienteModel.updateCustomer(name, cleanCpf, address, cleanPhone, id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao atualizar dados no banco de dados.');
            return;
        }
        res.redirect('/cliente');
    });
});

router.post('/delete/:id', (req, res) => {
    let id = req.params.id;
    ClienteModel.deleteCustomer(id, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/cliente');
    });
});

module.exports = router;
