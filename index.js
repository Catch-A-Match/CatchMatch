const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');

dotenv.config();
const port = process.env.PORT;
const userRoutes = require('./controllers/userController');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');
const matchRoutes = require('./routes/matchRoutes');
const { User } = require('./models/User');
const app = express();
app.use(express.json());

// Set MaxListeners
process.setMaxListeners(15);

// API Router
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/match', matchRoutes);

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