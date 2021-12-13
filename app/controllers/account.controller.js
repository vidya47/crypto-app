const Account = require('../models/account.model.js');

// Create and Save a new Account
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Account user details can not be empty"
        });
    }

    // Create a Account
    const account = new Account({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        email: req.body.email,
        dob: req.body.dob,
        mfa: req.body.mfa,
        referredBy: req.body.referredBy
    });

    // Save Account in the database
    account.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account."
        });
    });
};

// Retrieve and return all accounts from the database.
exports.findAll = (req, res) => {
    Account.find()
    .then(accounts => {
        res.send(accounts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving accounts."
        });
    });
};

// Find a single account with a accountId
exports.findOne = (req, res) => {
    Account.findById(req.params.accountId)
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });            
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving account with id " + req.params.accountId
        });
    });
};

// Update a account identified by the accountId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Account user email address can not be empty"
        });
    }

    // Find account and update it with the request body
    Account.findByIdAndUpdate(req.params.accountId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        email: req.body.email,
        dob: req.body.dob,
        mfa: req.body.mfa,
        referredBy: req.body.referredBy
    }, {new: true})
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with id " + req.params.accountId
            });                
        }
        return res.status(500).send({
            message: "Error updating account with id " + req.params.accountId
        });
    });
};
