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
    let cpf = req.body.cpf.replace(/[^\d]/g, '');
    let address = req.body.address;
    let phone = req.body.phone.replace(/[^\d]/g, '');
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

app.get('/cliente/edit/:id', (req, res) => {
    console.log(req.params);
    let id = req.params.id;
    const query = "SELECT * FROM customer WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao editar dados:', err);
            res.status(500).send('Erro ao editar dados no banco de dados.');
            return;
        }

        res.render('ClienteEdit', { customer: results[0] });
    });
})

app.post('/cliente/update/:id', (req, res) => {
    let id = req.params.id;
    const { name, cpf, address, phone } = req.body;
    const cleanCpf = cpf.replace(/[^\d]/g, '');
    const cleanPhone = phone.replace(/[^\d]/g, '');

    const query = "UPDATE customer SET name = ?, cpf = ?, address = ?, phone = ? WHERE id = ?";

    connection.query(query, [name, cleanCpf, address, cleanPhone, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar dados no banco de dados.');
            return;
        }

        res.redirect('/Cliente');
    });
});

app.post('/cliente/delete/:id', (req, res) => {
    let id = req.params.id;
    const query = "DELETE FROM customer WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/Cliente');
    });
});

//Rotas destinadas ao Funcionario

app.get('/funcionario', (req, res) => {
    const query = 'SELECT * FROM functionary';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        console.log(rows);
        res.render('Funcionario', { rows });
    })

});

app.post('/funcionario', (req, res) => {
    let name = req.body.name;
    let cpf = req.body.cpf.replace(/[^\d]/g, '');
    let address = req.body.address;
    let phone = req.body.phone.replace(/[^\d]/g, '');
    const query = 'INSERT INTO functionary (name, cpf, address, phone) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, cpf, address, phone], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/Funcionario');
    });
});

app.get('/funcionario/edit/:id', (req, res) => {
    console.log(req.params);
    let id = req.params.id;
    const query = "SELECT * FROM functionary WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao editar dados:', err);
            res.status(500).send('Erro ao editar dados no banco de dados.');
            return;
        }

        res.render('FuncionarioEdit', { functionary: results[0] });
    });
})

app.post('/funcionario/update/:id', (req, res) => {
    let id = req.params.id;
    const { name, cpf, address, phone } = req.body;
    const cleanCpf = cpf.replace(/[^\d]/g, '');
    const cleanPhone = phone.replace(/[^\d]/g, '');

    const query = "UPDATE functionary SET name = ?, cpf = ?, address = ?, phone = ? WHERE id = ?";

    connection.query(query, [name, cleanCpf, address, cleanPhone, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar dados:', err);
            res.status(500).send('Erro ao atualizar dados no banco de dados.');
            return;
        }

        res.redirect('/Funcionario');
    });
});

app.post('/funcionario/delete/:id', (req, res) => {
    let id = req.params.id;
    const query = "DELETE FROM functionary WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/Funcionario');
    });
});

//Rotas destinadas a Venda

app.get('/venda', (req, res) => {
    const customerQuery = 'SELECT * FROM customer';
    const functionaryQuery = 'SELECT * FROM functionary';
    const productQuery = 'SELECT * FROM product';
    const saleQuerry = `SELECT 
            sale.id AS sale_id,
            sale.name AS sale_name,
            customer.id AS customer_id,
            customer.name AS customer_name,
            functionary.id AS functionary_id,
            functionary.name AS functionary_name,
            product.id AS product_id,
            product.name AS product_name
        FROM 
            sale
        INNER JOIN 
            customer ON sale.customer_id = customer.id
        INNER JOIN 
            functionary ON sale.functionary_id = functionary.id
        INNER JOIN 
            product ON sale.product_id = product.id;`;
    connection.query(saleQuerry, (err, sales) => {
        if (err) {
            console.error('Erro ao buscar vendas:', err);
            res.status(500).send('Erro ao buscar vendas no banco de dados.');
            return;
        }
        connection.query(customerQuery, (err, customers) => {
            if (err) {
                console.error('Erro ao buscar clientes:', err);
                res.status(500).send('Erro ao buscar clientes no banco de dados.');
                return;
            }
            connection.query(functionaryQuery, (err, functionaries) => {
                if (err) {
                    console.error('Erro ao buscar funcionários:', err);
                    res.status(500).send('Erro ao buscar funcionários no banco de dados.');
                    return;
                }
                connection.query(productQuery, (err, products) => {
                    if (err) {
                        console.error('Erro ao buscar produtos:', err);
                        res.status(500).send('Erro ao buscar produtos no banco de dados.');
                        return;
                    }
                    res.render('Venda', { customers, functionaries, products, sales });
                });
            });
        });
    })

});

app.post('/venda', (req, res) => {
    let name = req.body.name;
    let id_functionary = req.body.functionary_id;
    let id_customer = req.body.customer_id;
    let id_product = req.body.product_id;
    const query = 'INSERT INTO sale (name, functionary_id, customer_id, product_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, id_functionary, id_customer, id_product], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/venda');
    });
});

app.post('/venda/delete/:id', (req, res) => {
    let id = req.params.id;
    const query = "DELETE FROM sale WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados no banco de dados.');
            return;
        }
        res.redirect('/venda');
    });
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

        res.render('ProdutoEdit', { product: results[0] });
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

