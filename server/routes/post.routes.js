const express = require('express')
const router = express.Router()

const { createPost, getAllPosts, postViews } = require('../controller/post.controllers')
const { isAuthenticated } = require('../controller/user.controllers')
const upload = require('../middleware/upload.middleware')

router.post('/createPost', upload.single('media'), createPost)
router.get('/getAllPosts', getAllPosts)
router.get('/postViews/:id', postViews)


module.exports = router

