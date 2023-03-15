const {Account} = require('../models');
const accountData = [
    {
        account: 'Xbox Live',
        type: 'Gaming',
        username: 'BetterThanYou42',
        gamerTag: 'BetterThanYou42',
        UserId: 1,
        color: "#048A81"
    },
    {
        account: 'Playstation Network',
        type: 'Gaming',
        username: 'HipSlickter420',
        gamerTag: 'HipSlickter420',
        UserId: 2,
        color: "#9D8420"
    },
    {
        account: 'Discord',
        type: 'Chat',
        username: 'Blockhead',
        gamerTag: 'n/a',
        UserId: 3,
        color: "#C97C5D"
    }
]

const seedAccounts = () => Account.bulkCreate(accountData);

module.exports = seedAccounts;