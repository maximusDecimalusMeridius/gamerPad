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
    },
    {
        title: 'Why does Donkey Kong wear a tie?',
        textContent: 'He’s got monkey business to do later',
        color: '#6F4E37',
        author:'KaiInTheSky',
        AuthorId:2,
        isShared:true
    },
    {
        title: 'Why does Donkey Kong wear a tie?',
        textContent: 'He’s got monkey business to do later',
        color: '#6F4E37',
        author:'KaiInTheSky',
        SharedId:3,
        isShared:true
    },
    {
        title: 'Why does Donkey Kong wear a tie?',
        textContent: 'He’s got monkey business to do later',
        color: 'black',
        author:'KaiInTheSky',
        SharedId:4,
        isShared:true
    },
    {
        title: 'Why does Donkey Kong wear a tie?',
        textContent: 'He’s got monkey business to do later',
        color: 'pink',
        author:'KaiInTheSky',
        SharedId:5,
        isShared:true
    },
    {
        title: 'Why does Donkey Kong wear a tie?',
        textContent: 'He’s got monkey business to do later',
        color: '#1d6ba3',
        author:'KaiInTheSky',
        SharedId:6,
        isShared:true
    },
    {
        title: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
        textContent: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
        color: 'green',
        author:'SlickBud20',
        AuthorId:7,
        isShared:true
    },
    {
        title: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
        textContent: 'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
        color: 'green',
        author:'SlickBud20',
        SharedId:5,
        isShared:true
    },
    
]

const seedNote = () => Note.bulkCreate(noteData);

module.exports = seedNote;