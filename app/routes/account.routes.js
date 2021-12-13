module.exports = (app) => {
    const accounts = require('../controllers/account.controller.js');

    // Create a new Account
    app.post('/accounts', accounts.create);

    // Retrieve all Accounts
    app.get('/accounts', accounts.findAll);

    // Retrieve a single Account with accountId
    app.get('/accounts/:accountId', accounts.findOne);

    // Update a account with accountId
    app.put('/accounts/:accountId', accounts.update);
}