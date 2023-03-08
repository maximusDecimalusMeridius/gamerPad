const {Account} = require('../models');
const accountData = [
    {

    }
]

const seedAccounts = () => Account.bulkCreate(accountData);

module.exports = seedAccounts;