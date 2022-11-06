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

## TODO
1. Work on User Profile Model Schema to add to the MongoDB Database when signup is done
2. Search for an SMS Gateway API to send `OTP` to Phone Numbers via `SMS` 
3. Not using `firebaseConfig.js` right now, `Firebase Auth` as a middleware is not efficient

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