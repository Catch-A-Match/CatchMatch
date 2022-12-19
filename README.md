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
```

1. Users
2. Matches
3. Chats

### 1. Profile Model Schema
```
1. Username
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
### 2. Matches Model Schema
```

```
### 3. Chats Model Schema
```

```

## SMS Gateway
Using `Twilio SMS` API for sending OTP.

- https://www.twilio.com/docs/sms/quickstart/node
- https://console.twilio.com/us1/develop/phone-numbers/manage/incoming

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

## ChatGPT Content 
Endpoints:
```
/users: This endpoint will allow you to create new users, retrieve information about existing users, and update user information.

/messages: This endpoint will allow you to send and receive messages. It could include the following sub-endpoints:

POST /messages: Send a new message
GET /messages?sender={user_id}&receiver={user_id}: Retrieve all messages between two users
GET /messages?user={user_id}: Retrieve all messages sent or received by a specific user
/match: This endpoint will allow users to express interest in each other and create a "match" between them. It could include the following sub-endpoints:

POST /match/{user_id}: Express interest in another user
GET /match: Retrieve a list of all matches for the authenticated user
Data formats:

Request bodies (e.g. for creating a new user or sending a message) and response bodies (e.g. for retrieving user information or a list of messages) will likely be in JSON format.

Query parameters (e.g. sender and receiver in the /messages endpoint) will be included in the URL as key-value pairs.

Authentication and authorization:

You will need to include an Authorization header with each request to the API, with the value being a JSON web token (JWT). The JWT will contain information about the authenticated user, such as their user ID.

You will need to implement a system for verifying the JWT and ensuring that the authenticated user has the appropriate permissions to access the requested resource.
```
#### Authentication with OTP PhoneNumber
```
When a user signs up for the app, they will provide their phone number.

The app will send an OTP to the user's phone via SMS.

The user will enter the OTP into the app to verify their phone number.

Once the phone number is verified, the app will generate a JSON web token (JWT) and send it to the user. The JWT will contain information about the user, such as their user ID.

The user will include the JWT in the Authorization header of each request to the API.

The server will verify the JWT to ensure that it is valid and belongs to the authenticated user.

If the JWT is valid, the server will allow the request to proceed. If the JWT is invalid or has expired, the server will return an error.
```

#### SMS Service
```
Install a package for generating OTPs and sending SMS messages: There are several packages available that can help you generate OTPs and send SMS messages. Some popular options include twilio and nexmo.

Configure your OTP and SMS settings: You will need to sign up for an account with a service like Twilio or Nexmo and obtain an API key and secret. You will also need to configure your OTP length, expiration time, and other settings as needed.

Generate the OTP: You can use the crypto module in Node.js to generate a random OTP. Here is an example of how you might do this:
```
```js
const crypto = require('crypto');

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};
```

```
Send the OTP via SMS: You can use the twilio or nexmo package to send the OTP to the user's phone via SMS. Here is an example of how you might do this using Twilio:
```
```js
const twilio = require('twilio');

const sendSMS = (to, body) => {
  const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  client.messages
    .create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    })
    .then(message => console.log(message.sid))
    .done();
};
```