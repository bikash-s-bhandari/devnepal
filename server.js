const express = require('express');
const connectDB = require('./config/db');
const app = express();
const connectDb = require('./config/db');
const PORT = process.env.PORT || 5000;
connectDB();

//Init Middleware
app.use(express.json({ extended: false }))//same as bodyparser.json()


//Routes
const users = require('./router/api/users');
const auth = require('./router/api/auth');
const posts = require('./router/api/posts');

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

});