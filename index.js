const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');

dotenv.config();
const port = process.env.PORT;
const userRouter = require('./routes');
const { User } = require('./models/User');
const app = express();
app.use(express.json());

// API Router
app.use('/api/user', userRouter);
// Add Profile Data
app.patch('/api/user/update/:username', async (req, res) => {
    const { Instagram, Age, Gender, Abstract, Interests, Zodiac, Pets, Company, Drinking, Smoking, PerfectDateQuestion, Quote } = req.body;
    const { username } = req.params;
    const filter = { username: username };

    const updatedUser = await User.findOneAndUpdate(filter, req.body, { new: true }).catch(err => {
        return res.status(400).send(err);
    });

    return res.status(200).json({
        message: "Added Details",
        data: updatedUser
    });
});

/**
 * Love Calculator API Added
 */
app.use('/api/calculate', async (req, res) => {
    const options = {
        method: 'GET',
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
        console.log(err);
    })
})


// Connect to DB
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