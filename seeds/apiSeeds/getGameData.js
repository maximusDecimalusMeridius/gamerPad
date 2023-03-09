// const {Game} = require('../../models');
// require('dotenv').config();

const getRawgData = async () => {
    let count = 0;

    // let data = await testFetch();
    // data = await data.json()
    //console.log(data)
    const fetchTimer = setInterval(async function(){
        count ++;
        const iteration = 3
        const onePass = localStorage.getItem('onePass');
        //shut down fetch loop after one pass once server resets
        if(parseInt(onePass) >= iteration){
            clearInterval(fetchTimer);
            return
        }
        
        console.log(count);
        //clear interval
        if(count <= iteration) {
            console.log(`in fetch`);
            //fetch data
            data = await testFetch(count);
            data = await data.json();
            console.log(data);
        } else {
            clearInterval(fetchTimer);
        }
    }, 2000)
}

const testFetch = async (count) => {
    localStorage.setItem('onePass', `${count}`);
    const fetchRawgData = await fetch(`http://localhost:3000/api/games/rawg/${count}`);
    console.log(`in fetch`);
    return fetchRawgData;
}

const makeGames = async() => {
    const fetchArrayRaw = await fetch(`http://localhost:3000/api/games/rawg/create`);
    const fetchArray = await fetchArrayRaw.json();
    const cleanData = JSON.parse(fetchArray)
    console.log(cleanData);
}

//getRawgData();
makeGames();