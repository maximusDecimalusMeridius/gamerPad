const {Account} = require('../models');
const accountData = [
    {
        account: 'Xbox Live',
        type: 'Gaming',
        username: 'BetterThanYou42',
        gamerTag: 'BetterThanYou42',
        UserId: 1,
    },
    {
        account: 'Playstation Network',
        type: 'Gaming',
        username: 'HipSlickter420',
        gamerTag: 'HipSlickter420',
        UserId: 2,
    },
    {
        account: 'Discord',
        type: 'Chat',
        username: 'Blockhead',
        gamerTag: 'n/a',
        UserId: 3,
    }
]

const seedAccounts = () => Account.bulkCreate(accountData);

module.exports = seedAccounts;