const {Note} = require('../models');
const noteData = [
    {
        title: 'This Game Rocks Because CATS',
        textContent: 'Yo, read the title',
        color: 'salmon',
        author:'CoolKat83',
        AuthorId:1,
        isShared:false
    },
    {
        title: 'Sims 4 PC Cheat Codes',
        textContent: 'motherlode: Gives you 50,000 simoleons',
        color: 'Green',
        author:'ChillCucumber76',
        AuthorId:3,
        isShared:true
    },
    {
        title: 'Sims 4 PC Cheat Codes',
        textContent: 'motherlode: Gives you 50,000 simoleons',
        color: 'Green',
        author:'ChillCucumber76',
        SharedId:1,
        isShared:true
    }
]

const seedNote = () => Note.bulkCreate(noteData);

module.exports = seedNote;