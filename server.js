const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();



//Init Middleware
app.use(express.json())//same as bodyparser.json()
app.use(cors());


//error middleware 
const errorHandler = require('./middleware/error')


//Routes
const users = require('./router/api/users');
const auth = require('./router/api/auth');
const posts = require('./router/api/posts');

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts)

//error handler
app.use(errorHandler);







app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

});
