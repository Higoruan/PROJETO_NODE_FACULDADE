const connection = require('./connection');

const getSales = (callback) => {
    const query = `
        SELECT 
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
            product ON sale.product_id = product.id;
    `;
    connection.query(query, callback);
};

const insertSale = (name, functionary_id, customer_id, product_id, callback) => {
    const query = 'INSERT INTO sale (name, functionary_id, customer_id, product_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, functionary_id, customer_id, product_id], callback);
}

const deleteSale = (id, callback) => {
    const query = 'DELETE FROM sale WHERE id = ?';
    connection.query(query, [id], callback);
}


module.exports = {
    getSales,
    insertSale,
    deleteSale
};