const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const connection = require('./Model/connection');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/cliente', (req, res) => {
    const query = 'SELECT * FROM customer';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        console.log(rows);
        res.render('Cliente', { rows });
    })

});

app.post('/cliente', (req, res) => {
    let name = req.body.name;
    let cpf = req.body.cpf;
    let address = req.body.address;
    let phone = req.body.phone;
    const query = 'INSERT INTO customer (name, cpf, address, phone) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, cpf, address, phone], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
         res.redirect('/cliente');
    });
});

app.get('/venda', (req, res) => {
    res.render('Venda')
});
app.get('/funcionario', (req, res) => {
    res.render('Funcionario')
});
app.get('/produto', (req, res) => {
    const query = 'SELECT * FROM product';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        console.log(rows);
        res.render('Produto', { rows });
    })

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})

