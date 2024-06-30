const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ClienteModel = require('./Model/clienteModel');
const FuncionarioModel = require('./Model/funcionarioModel');
const VendaModel = require('./Model/vendaModel');
const ProdutoModel = require('./Model/produtoModel');

//Rotas destinadas ao Cliente

app.get('/cliente', (req, res) => {
    ClienteModel.getCustomer((err, rows) => {
        if (err) {
            handleError(res, 'Erro ao buscar clientes no banco de dados.', err);
            return;
        }
        console.log(rows);
        res.render('Cliente', { rows });
    });
});

app.post('/cliente', (req, res) => {
    let name = req.body.name;
    let cpf = req.body.cpf.replace(/[^\d]/g, '');
    let address = req.body.address;
    let phone = req.body.phone.replace(/[^\d]/g, '');
    ClienteModel.insertCustomer(name, cpf, address, phone, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir dados no banco de dados.');
            return;
        }
        res.redirect('/cliente');
    });
});

app.get('/cliente/edit/:id', (req, res) => {
    let id = req.params.id;
    ClienteModel.loadCustomer(id, (err, results) => {
        if (err) {
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

    ClienteModel.updateCustomer(name, cleanCpf, address, cleanPhone, id, (err, results) => {
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
    ClienteModel.deleteCustomer(id, (err, results) => {
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
    FuncionarioModel.getFunctionary((err, rows) => {
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
    FuncionarioModel.insertFunctionary(name, cpf, address, phone, (err, results) => {
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
    FuncionarioModel.loadFunctionary(id, (err, results) => {
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
    FuncionarioModel.updateFunctionary(name, cleanCpf, address, cleanPhone, id, (err, results) => {
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
    FuncionarioModel.deleteFunctionary(id, (err, results) => {
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
    VendaModel.getSales((err, sales) => {
        if (err) {
            console.error('Erro ao buscar vendas:', err);
            res.status(500).send('Erro ao buscar vendas no banco de dados.');
            return;
        }
        ClienteModel.getCustomer((err, customers) => {
            if (err) {
                console.error('Erro ao buscar clientes:', err);
                res.status(500).send('Erro ao buscar clientes no banco de dados.');
                return;
            }
            FuncionarioModel.getFunctionary((err, functionaries) => {
                if (err) {
                    console.error('Erro ao buscar funcionários:', err);
                    res.status(500).send('Erro ao buscar funcionários no banco de dados.');
                    return;
                }
                ProdutoModel.getProduct((err, products) => {
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
    VendaModel.insertSale(name, id_functionary, id_customer, id_product, (err, results) => {
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
    VendaModel.deleteSale(id, (err, results) => {
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
    ProdutoModel.getProduct((err, rows) => {
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
    ProdutoModel.insertProduct(name, brand, value, (err, results) => {
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
    ProdutoModel.loadProduct(id, (err, results) => {
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
    ProdutoModel.updateProduct(name, brand, value, id, (err, results) => {
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
    ProdutoModel.deleteProduct(id, (err, results) => {
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

