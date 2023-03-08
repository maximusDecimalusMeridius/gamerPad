const {Note} = require('../models');
const noteData = [
    {
        title: 'This Game Rocks Because CATS',
        textContent: 'Yo, read the title',
        color: 'salmon',
        authorId: 1,
        UserId: 1,
    }
]

const seedNote = () => Note.bulkCreate(noteData);

module.exports = seedNote;