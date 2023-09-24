// server.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const { authmiddleware } = require('./middleware/auth.middleware')
const myDb = require('./db')
require('dotenv').config();
const cors = require('cors')
const secret_key = process.env.secret_key;
const app = express();


app.use(
    session({
        secret: secret_key,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
            httpOnly: true,
            sameSite: 'strict',
        },
    })
);



app.use(cors())
app.use(bodyParser.json());
myDb.myDb()
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/post', postRoutes);



