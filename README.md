# crypto-app

#### User
* `firstName` (Account Holder First Name)
* `lastName` (Account Holder Last Name)
* `country` (Country code)
* `email` (Account Holder email, unique)
* `dob` (Account Holder Date of Birth)
* `mfa` (multi factor authentication possible values: [null, 'TOTP', 'SMS'])
* `createdAt` (Account creation date)
* `updatedAt` (Account update date)
* `referredBy` (email of referral account)

#### Transaction
* `userEmail` (Account Holder Email)
* `amount` (Number of tokens in transaction)
* `type` (Possible values: ['send', 'receive'])
* `createdAt` (Transaction creation date)

A transaction can only be associated with one user. A user can be associated with many transactions.

The API should be able to handle the following requests:
    * The admin user should be able to get an account and its current balance (the data provided may contain negative balances).
    * The admin user should be able to debit and credit an account;
    * The admin user should be able to make an amount transfer from one user to another.
    
    
