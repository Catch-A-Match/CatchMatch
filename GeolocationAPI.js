// Tom Tom API Key
// 0CASV6bB6j5YhCkgymYl9GAcFvvZ1meR
const axios = require('axios');

axios.get('https://api.tomtom.com/search/2/nearbySearch/.json?key=0CASV6bB6j5YhCkgymYl9GAcFvvZ1meR&lat=36.98844&lon=-121.97483')
.then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.log(err);
})