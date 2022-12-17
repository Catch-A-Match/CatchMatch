An only chat based Dating App

Currently this build is going on

https://www.youtube.com/watch?v=f6oyA6kkt1w&ab_channel=Cabbage

## Usage
### 1. SignUp

1. POST Request to send OTP
```
localhost:3001/api/user/signup
```
2. POST Request to Validate OTP and Save user
```
http://localhost:3001/api/user/signup/verify
```
### 2. Add Profile data
1. PATCH Request to add User data
```
http://localhost:3001/api/user/update/:username
```
Add details according to the 

### 3. LoveCalculator API
1. GET Request to get Compatibility Score for `fname` and `sname`.
```
http://localhost:3001/api/calculate
```

### 4. Geolocation API
Currently working on `Tom Tom` Geolocation API
- https://developer.tomtom.com/search-api/documentation/search-service/nearby-search

GET Request to Get Nearby Info on a `Latitude` and `Longitude`
```
https://api.tomtom.com/search/2/nearbySearch/.json?key=0CASV6bB6j5YhCkgymYl9GAcFvvZ1meR&lat=30.656780&lon=76.807358
```
## User Profile Schema
```
1. Name
2. Instagram
3. Age
4. Alias
5. Gender
6. Sexual Orientation
7. Abstract (500 words)
8. Intrests (3 Min, 10 Max)
9. Zodiac
10. Pets
11. Company / Job
12. Drinking?
13 Smoking?
14. Perfect Date Question (200 words)
15. Quote ?
```

1. Users
2. Matches
3. Chats

### 1. User Model Schema
```
```
### 2. Matches Model Schema
```

```
### 3. Chats Model Schema
```

```

## SMS Gateway
`Afilnet SMS` API can be used 

https://rapidapi.com/linkses/api/afilnet-sms/

In this, we enter different params like this
```js
const axios = require("axios");

const encodedParams = new URLSearchParams();
encodedParams.append("user", "<REQUIRED>");
encodedParams.append("from", "<REQUIRED>");
encodedParams.append("to", "<REQUIRED>");
encodedParams.append("sms", "<REQUIRED>");
encodedParams.append("method", "sendsms");
encodedParams.append("class", "sms");
encodedParams.append("password", "<REQUIRED>");

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
```
We want to `customize` this api call to send `OTP` to phone numbers.
## TODO
1. Work on User Profile Model Schema to add to the MongoDB Database when signup is done
2. Search for an SMS Gateway API to send `OTP` to Phone Numbers via `SMS` 
3. Geolocation based Indexing and recommendation of users
4. `Location` based Users mapping `Geolocation API`.
5. `PM2` Clustering to optimize API.
6. `Redis` to Cache App and reduce `Latency`.
7. Using `HTTP/2` instead of `HTTP`.
8. Query Indexing for `MongoDB`.

## Updates
1. User Profile for a registered User
- https://blog.loginradius.com/engineering/guest-post/nodejs-authentication-guide/
- https://stackoverflow.com/questions/50092125/creating-a-profile-for-a-registered-user-in-node-js
- https://github.com/haydanu/user-profile
- https://technotip.com/3832/fetch-individual-user-data-from-mongodb-node-js/

2. Bulk SMS Gateway API
- https://rapidapi.com/linkses/api/afilnet-sms/
- https://www.smsgatewayhub.com/free-sms-gateway-developer-api#single_sms
- https://rapidapi.com/kapsystem/api/bulksmsapi/
## References
1. https://stackoverflow.com/questions/66602407/how-to-use-firebase-only-for-authentication
2. https://firebase.google.com/docs/auth/web/phone-auth#send-a-verification-code-to-the-users-phone
3. freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
4. https://medium.com/google-developer-experts/verifying-phone-numbers-with-firebase-phone-authentication-on-your-backend-for-free-7a9bef326d02
5. mongodb.com/docs/atlas/app-services/authentication/custom-jwt/?_ga=2.93458714.643182044.1667548308-253402785.1665956341
6. https://www.cometchat.com/tutorials/tinder-clone-dating-website-node-js
7. https://gist.github.com/rtt/10403467
8. https://stackoverflow.com/questions/7848093/find-nearby-users-of-an-app-iphone-and-android
9. https://www.youtube.com/watch?v=LYaPY7Tzeo4&ab_channel=ToThePointCode [2FA with NodeJS and MongoDB]
10. https://dev.to/harshmangalam/mobile-otp-based-authentication-and-authorization-api-using-nodejs-and-mongodb-2hpk