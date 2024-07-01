const app = require('./app');
const port = 3000;
// NPM START 
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
