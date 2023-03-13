const {Game} = require('../../models');
const fs = require('fs');
const dayjs = require('dayjs')
const inquirer = require('inquirer');

const init = async () => {
    console.log(`Please login to continue`);
    const apis = [`RAWG`, `Steam`, `IGDB`, `All`]
    const login = await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select which API to pull from.',
                choices: apis,
                name: 'api'
            },
            {
                type: 'input',
                message: 'List the length of data you would like to pull.',
                name: 'length'
            },
            {
                type: 'list',
                message: 'Do you wish to write over original seeds or append the data or make a new file?',
                choices: ['rewrite', 'append', 'new'],
                name: 'write'
            },
        ])
        .then(async (res) => {
            if(res.api === 'RAWG') {
                console.log(`RAWG`)
                const dataArray = [];
                const searchLength = Math.ceil(res.length / 40);
                
                for (let i = 0; i < searchLength; i++) {
                    const rawgDataRaw = await fetch(`https://api.rawg.io/api/games?key=${`3cd34fbf61e14893a8511b086b8adee5`}&page=${i}&page_size=40`);
                    const rawgData = await rawgDataRaw.json();
                    console.log('loop')
                    dataArray.push(rawgData);
                }

                if(res.write === 'rewrite') {
                    fs.writeFileSync('../apiData/test.json', JSON.stringify(dataArray), (err) => err ? console.error(err) : console.log('Success!'));
                } else if(res.write === 'append') {
                    fs.appendFileSync('../apiData/test.json', JSON.stringify(dataArray), (err) => err ? console.error(err) : console.log('Success!'));
                } if(res.write === 'new'){
                    const date = dayjs().format('D-M-Y-H-m-s');
                    fs.writeFileSync(`../apiData/rawgDataJSON${date}.json`, JSON.stringify(dataArray), (err) => err ? console.error(err) : console.log('Success!'));
                }

            } else if(res.api === 'Steam') {
                console.log(`Steam`);
            } else if(res.api === 'IGDB') {
                console.log(`IGDB`);
            } if(res.api === 'All') {
                console.log(`All`);
            }
        }).then(res => {
            
        });
}

init();