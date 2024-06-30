const connection = require('./connection');

const getCustomer = (callback) => {
    const query = 'SELECT * FROM customer';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return callback(err, null);
        }
        callback(null, rows);
    });
};

const insertCustomer = (name, cpf, address, phone, callback) => {
    const query = 'INSERT INTO customer (name, cpf, address, phone) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, cpf, address, phone], callback);
};

const loadCustomer = (id, callback) => {
    const query = "SELECT * FROM customer WHERE id = ?";
    connection.query(query, [id], callback);
};

const updateCustomer = (name, cpf, address, phone, id, callback) => {
    const query = "UPDATE customer SET name = ?, cpf = ?, address = ?, phone = ? WHERE id = ?";
    connection.query(query, [name, cpf, address, phone, id], callback);
};

const deleteCustomer = (id, callback) => {
    const query = "DELETE FROM customer WHERE id = ?";
    connection.query(query, [id], callback);
};


module.exports = {
    getCustomer,
    insertCustomer,
    loadCustomer,
    updateCustomer,
    deleteCustomer
};