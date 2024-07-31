// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('../routes/users');
const taskRoutes = require('../routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:something@cluster0.ievdotz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Export the Express app
module.exports = app;
