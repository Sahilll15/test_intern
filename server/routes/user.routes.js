const express = require('express')
const router = express.Router()


const { login, logout, isAuthenticated, register } = require('../controller/user.controllers')

router.post('/login', login)
router.get('/logout', logout)
router.get('/isAuthenticated', isAuthenticated)
router.post('/register', register)

module.exports = router