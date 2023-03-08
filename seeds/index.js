//require all seed files
const seedAccounts = require('./accountSeeds');
const seedGame = require('./gameSeeds');
const seedNote = require('./noteSeeds');
const seedPlatform = require('./platformSeeds');
const seedUserFriend = require('./userFriendSeeds');
const seedUserGame = require('./userGameSeeds');
const seedUser = require('./userSeeds');

//bring in sequalize
const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
    
    await seedUser();
    console.log("\n----- USERS SEEDED -----\n");

    await seedAccounts();
    console.log("\n----- ACCOUNTS SEEDED -----\n");

    await seedGame();
    console.log("\n----- GAMES SEEDED -----\n");

    await seedNote();
    console.log("\n----- NOTES SEEDED -----\n");

    await seedPlatform();
    console.log("\n----- PLATFORMS SEEDED -----\n");

    await seedUserFriend();
    console.log("\n----- USERFRIENDS SEEDED -----\n");

    await seedUserGame();
    console.log("\n----- USERGAMES SEEDED -----\n");

    process.exit(0);
}

seedAll();