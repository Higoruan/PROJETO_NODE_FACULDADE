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

//Rotas destinadas ao Cliente

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

//Rotas destinadas ao Funcionario

app.get('/funcionario', (req, res) => {
    res.render('Funcionario')
});

//Rotas destinadas a Venda

app.get('/venda', (req, res) => {
    res.render('Venda')
});

// Rotas destinadas ao Produto

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

app.post('/produto', (req, res) => {
    let name = req.body.name;
    let brand = req.body.brand;
    let value = req.body.value;
    const query = 'INSERT INTO product (name, brand, value) VALUES (?, ?, ?)';
    connection.query(query, [name, brand, value], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/produto');
    });
});

app.get('/produto/edit/:id', (req, res) => {
    console.log(req.params);
    let id = req.params.id;
    const query = "SELECT * FROM product WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao editar dados:', err);
            res.status(500).send('Erro ao editar dados no banco de dados.');
            return;
        }

        res.render('ProdutoEdit', { customer: results[0] });
    });
});

app.post('/produto/update/:id', (req, res) => {
    let id = req.params.id;
    const { name, brand, value } = req.body;
    const query = "UPDATE product SET name = ?, brand = ?, value = ? WHERE id = ?";

    connection.query(query, [name, brand, value, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar dados no banco de dados.');
            return;
        }

        res.redirect('/Produto');
    });
});

app.post('/produto/delete/:id', (req, res) => {
    let id = req.params.id;
    const query = "DELETE FROM product WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/Produto');
    });
});

// Server

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})

