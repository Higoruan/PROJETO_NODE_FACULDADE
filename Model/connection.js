const mysql = require('mysql');

// Configurações da conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'HRJ'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL!');
});

// Encerrar conexão quando terminar de usar
connection.end((err) => {
  if (err) {
    console.error('Erro ao encerrar conexão:', err);
    return;
  }
  console.log('Conexão encerrada com sucesso.');
});

module.exports = connection