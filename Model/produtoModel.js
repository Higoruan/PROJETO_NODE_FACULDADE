const connection = require('./connection');

const getProduct = (callback) => {
    const query = 'SELECT * FROM product';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return callback(err, null);
        }
        callback(null, rows);
    });
};

const insertProduct = (name, brand, value, callback) => {
    const query = 'INSERT INTO product (name, brand, value) VALUES (?, ?, ?)';
    connection.query(query, [name, brand, value], callback);
};

const loadProduct = (id, callback) => {
    const query = "SELECT * FROM product WHERE id = ?";
    connection.query(query, [id], callback);
};

const updateProduct = (name, brand, value, id, callback) => {
    const query = "UPDATE product SET name = ?, brand = ?, value = ? WHERE id = ?";
    connection.query(query, [name, brand, value, id], callback);
};

const deleteProduct = (id, callback) => {
    const query = "DELETE FROM product WHERE id = ?";
    connection.query(query, [id], callback);
};


module.exports = {
    getProduct,
    insertProduct,
    loadProduct,
    updateProduct,
    deleteProduct
};