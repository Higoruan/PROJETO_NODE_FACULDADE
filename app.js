const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importa rotas
const clienteRoutes = require('./routes/cliente');
const funcionarioRoutes = require('./routes/funcionario');
const vendaRoutes = require('./routes/venda');
const produtoRoutes = require('./routes/produto');

// Usa as rotas
app.use('/cliente', clienteRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/venda', vendaRoutes);
app.use('/produto', produtoRoutes);

module.exports = app;
