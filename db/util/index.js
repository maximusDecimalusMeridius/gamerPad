const { Game } = require('../../models');
const fs = require('fs');
const dayjs = require('dayjs')
const inquirer = require('inquirer');
require('dotenv').config()
const rawgKey = process.env.RAWG_KEY;


// To run this in Node.js you need to open a command terminal in the root directory and then navigate to the index.js via:
//    node db/util/index.js
//            or
//        npm run api

const init = async () => {
    console.log(`Please login to continue`);
    const apis = [`RAWG`, `Skip`]
    console.log(rawgKey);
    const apiPrompt = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select which API to pull from.',
                choices: apis,
                name: 'api'
            }
        ])
        .then(async (res) => {
            if(res.api === 'RAWG'){
                fetchData(res.api);
            } else {
                console.log(`No fetches were made.`);
                makeNewSeedData();
            }
        });
}

const fetchData = async (api) => {
    const fetchPrompt = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'List the length of data you would like to pull.',
                name: 'length'
            },
            {
                type: 'list',
                message: 'Do you wish to write over original seeds or append the data or make a new file?',
                choices: ['Rewrite', 'Append', 'New', 'Skip'],
                name: 'write'
            }
        ])
        .then(async (res) => {
            if (api === 'RAWG') {
                console.log(`RAWG`)
                const dataArray = [];
                const searchLength = Math.ceil(res.length / 40);

                for (let i = 0; i < searchLength; i++) {
                    const rawgDataRaw = await fetch(`https://api.rawg.io/api/games?key=${`d1e297a96ce247b58b25aa6d9f7a9918`}&page=${i + 1}&page_size=40`);
                    const rawgData = await rawgDataRaw.json();
                    dataArray.push(rawgData);
                }

                if (res.write === 'Rewrite') {
                    fs.writeFileSync('./db/apiData/rawgDataJSON.json', JSON.stringify(dataArray), (err) => err ? console.error(err) : console.log('Success!'));
                } else if (res.write === 'Append') {
                    fs.appendFileSync('./db/apiData/rawgDataJSON.json', JSON.stringify(dataArray), (err) => err ? console.error(err) : console.log('Success!'));
                } if (res.write === 'New') {
                    const date = dayjs().format('DDMMYYYYHHmmss');
                    fs.writeFileSync(`./db/apiData/rawgDataJSON${date}.json`, JSON.stringify(dataArray), (err) => err ? console.error(err) : console.log('Success!'));
                }

                makeNewSeedData();
            }
        });
}

const makeNewSeedData = async () => {
    const manipulat = await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Provide filename you wish to manipulate, do not include .json.',
                name: 'file'
            },
        ])
        .then(async res => {
            const file = res.file
            console.log(file);
            const jsonRaw = fs.readFileSync(`./db/apiData/${file}.json`, 'utf8', (err) => err ? console.error(err) : console.log('Success!'));
            const newJson = await JSON.parse(jsonRaw);

            let gamesArray = [];

            newJson.forEach(array => {
                gamesArray = gamesArray.concat(array.results);
            });

            const gamesObjs = gamesArray.map(game => {
                return (
                    {
                        title: game.name,
                        releaseDate: game.released,
                        images: game.short_screenshots,
                        // platforms: game.platforms,
                        // genres: game.genres,
                        // esrbRating: game.esrb_rating,
                        // rawgId: game.id,
                    }
                )
            });

            fs.writeFileSync('./db/apiData/newGameData.json', JSON.stringify(gamesObjs), function (err, data) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(data);
                    return res.json(data);
                }
            });
        });
}
init();