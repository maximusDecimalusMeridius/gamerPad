const {Account} = require('../models');
const accountData = [
    {
        account: 'Xbox Live',
        type: 'Digital',
        username: 'BetterThanYou42',
        gamerTag: 'BetterThanYou42',
        UserId: 1,
    }
]

const seedAccounts = () => Account.bulkCreate(accountData);

module.exports = seedAccounts;