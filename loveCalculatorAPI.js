const axios = require('axios');

const options = {
    method:'GET',
    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
    params: { sname: 'Alia', fname: 'Ranbir' },
    headers: {
        'X-RapidAPI-Key': 'e51cab1eccmshfd3d083858be8f0p1529eajsn0860685ea5d1',
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
    }
};

axios.request(options).then(function (res) {
    console.log(res.data);
}).catch(function (err) {
    console.err(err);
})