const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());

// Connect
mongoose.connect(process.env.MONGO_URI, {
}).then(() => 
    console.log("Connected to Database")
).catch((err) =>
    console.log('MongoDB Connection Failed')
);

// Server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})