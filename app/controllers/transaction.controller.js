const Transaction = require('../models/transaction.model.js');
const RECEIVE = 'receive';

// Create and Save a new Transaction
exports.create = (req, res) => {
    // Validate request
    if(!req.body.userEmail) {
        return res.status(400).send({
            message: "Account email can not be empty"
        });
    }

    // Create a Account Transaction for source user
    const srcTransaction = new Transaction({
        userEmail: req.body.userEmail,
        amount: req.body.amount,
        type: req.body.type
    });

    // Create a Account Transaction for destination user
    const dstnTransaction = new Transaction({
        userEmail: req.params.userEmail,
        amount: req.body.amount,
        type: RECEIVE
    })

    // Save Account Transactions for sender and receiver in the database. It indirectly 
    // means to transfer funds from one account to other
    srcTransaction.save()
    .then(data => dstnTransaction.save().then(data => res.send(data)))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account Transaction."
        });
    });
};

// Find an account and debit/credit the account accordingly
exports.findAll = (req, res, Data) => {
    // Validate Request
    if(!req.body.amount | !req.body.type | !req.body.userEmail) {
        return res.status(400).send({
            message: "Amount, type and userEmail should be given to make a transaction!"
        });
    }

    // Create a Account Transaction
    const transaction = new Transaction({
        userEmail: req.body.userEmail,
        amount: req.body.amount,
        type: req.body.type
    });

    // Save Account Transaction in the database
    transaction.save()
    .then(data => {
        Transaction.find({userEmail: req.body.userEmail})
        .then(account => {
            if(!account) {
                return res.status(404).send({
                    message: "Account not found with userEmail " + req.body.userEmail
                });            
            }
            var totalAmount = 0;
            if (account.length > 0){
                account.forEach(element => {
                    if (element.type === 'receive') {
                        totalAmount += element.amount;
                    } else {
                        totalAmount -= element.amount;
                    }
                });
            }
            
            res.send({NewAmount: totalAmount});
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Account not found with id " + req.body.userEmail
                });                
            }
            return res.status(500).send({
                message: "Error updating account with id " + req.body.userEmail
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account Transaction."
        });
    });
};