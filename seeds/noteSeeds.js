const {Note} = require('../models');
const noteData = [
    {

    }
]

const seedNote = () => Note.bulkCreate(noteData);

module.exports = seedNote;