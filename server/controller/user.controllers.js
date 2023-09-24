const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')


// Login route
const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            res.status(401).json({ message: 'All fields are required' });
            return
        }

        const user = await User.findOne({ email: email })

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            res.status(401).json({ message: 'invalid credentials' });
            return
        }

        console.log(user)
        if (user) {
            req.session.user = user._id;
            res.status(200).json({ user: user, message: 'Logged in successfully' });
        } else {
            res.status(401).json({ message: 'User Not Found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error occurred' });
    }
};


// Logout route
const logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
};
// Check if the user is authenticated

const isAuthenticated = (req, res) => {
    if (req.session.user) {
        console.log("User is authenticated with session ID:", req.session.user);
        res.status(200).json({ auth: true, message: 'Authenticated' });
    } else {
        console.log("User is not authenticated.");
        res.status(401).json({ message: 'Unauthenticated' });
    }
};


// Register route

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(401).json({ message: 'All fields are required' });
            return
        }

        const ExistingUser = await User.findOne({ email: email })

        if (ExistingUser) {
            res.status(401).json({ message: 'User already exists' });
            return
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashedpassword });
        req.session.user = user._id;
        res.status(201).json({ user: user, userId: req.session.userId, message: 'User created successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error occurred' });
    }
}

module.exports = {
    login,
    logout,
    isAuthenticated,
    register
}