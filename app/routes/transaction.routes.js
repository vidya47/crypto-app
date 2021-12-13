module.exports = (app) => {
    const transactions = require('../controllers/transaction.controller.js');

    // Create a new Account Transaction
    app.post('/transactions/:userEmail', transactions.create);

    // Find an account and debit/credit accordingly
    app.get('/transactions', transactions.findAll);
}