const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.status(200).send('Api running')

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

});