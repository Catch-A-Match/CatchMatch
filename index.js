const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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