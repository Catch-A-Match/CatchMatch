
const axios = require('axios');
/**
 * https://rapidapi.com/kapsystem/api/bulksmsapi
 */
/** 
const options = {
    methods: "GET",
    url: 'https://kapsystem-bulksmsapi-v1.p.rapidapi.com/api/',
    params: { username: 'test', password: 'test', cmd: 'X' },
    headers: {
        'X-RapidAPI-Key': 'e51cab1eccmshfd3d083858be8f0p1529eajsn0860685ea5d1',
        'X-RapidAPI-Host': 'kapsystem-bulksmsapi-v1.p.rapidapi.com'
    }
}

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});
*/

/**
 * https://rapidapi.com/linkses/api/afilnet-sms/
 */
const encodedParams = new URLSearchParams();
encodedParams.append("user", "rc1");
encodedParams.append("from", "8968243805");
encodedParams.append("to", "9465203577");
encodedParams.append("sms", "OTP");
encodedParams.append("method", "sendsms");
encodedParams.append("class", "sms");
encodedParams.append("password", "123");

const options = {
    method: 'POST',
    url: 'https://afilnet-sms.p.rapidapi.com/',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'e51cab1eccmshfd3d083858be8f0p1529eajsn0860685ea5d1',
        'X-RapidAPI-Host': 'afilnet-sms.p.rapidapi.com'
    },
    data: encodedParams
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});