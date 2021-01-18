const express = require('express');
const connectDB = require('./config/db');
const app = express();
const connectDb = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();
app.get('/', (req, res) => {
    res.status(200).send('Api running')

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

});