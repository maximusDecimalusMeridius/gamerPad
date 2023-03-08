const {Note} = require('../models');
const noteData = [
    {
        title: 'This Game Rocks Because CATS',
        textContent: 'Yo, read the title',
        color: 'salmon'
    }
]

const seedNote = () => Note.bulkCreate(noteData);

module.exports = seedNote;