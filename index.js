const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const connection = require('./Model/connection')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './public')))

app.get('/cliente', (req, res) => {
    res.render('Cliente')
})
app.get('/venda', (req, res) => {
    res.render('Venda')

})
app.get('/funcionario', (req, res) => {
    res.render('Funcionario')
})
app.get('/produto', (req, res) => {
    res.render('Produto')
    // Exemplo de consulta
    connection.query('SELECT * FROM product', (err, rows) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            return;
        }
        console.log('Dados retornados do banco de dados:', rows);
    });
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})

