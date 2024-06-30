const connection = require('./connection');

const getFunctionary = (callback) => {
    const query = 'SELECT * FROM functionary';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return callback(err, null);
        }
        callback(null, rows);
    });
};

const insertFunctionary = (name, cpf, address, phone, callback) => {
    const query = 'INSERT INTO functionary (name, cpf, address, phone) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, cpf, address, phone], callback);
};

const loadFunctionary = (id, callback) => {
    const query = "SELECT * FROM functionary WHERE id = ?";
    connection.query(query, [id], callback);
};

const updateFunctionary = (name, cpf, address, phone, id, callback) => {
    const query = "UPDATE functionary SET name = ?, cpf = ?, address = ?, phone = ? WHERE id = ?";
    connection.query(query, [name, cpf, address, phone, id], callback);
};

const deleteFunctionary = (id, callback) => {
    const query = "DELETE FROM functionary WHERE id = ?";
    connection.query(query, [id], callback);
};


module.exports = {
    getFunctionary,
    insertFunctionary,
    loadFunctionary,
    updateFunctionary,
    deleteFunctionary
};