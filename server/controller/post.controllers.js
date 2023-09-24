const Post = require('../models/post.models');
const AWS = require('aws-sdk');
require('dotenv').config();

// Create a post
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
});

const s3 = new AWS.S3();

const createPost = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let media = '';

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}-${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        const uploadImage = await s3.upload(params).promise();
        media = uploadImage.Location;


        const post = await Post.create({
            title,
            description,
            media,
            postedBy: req.session.userId,
        });

        return res
            .status(200)
            .json({ post, message: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error occurred' });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('postedBy').sort({ createdAt: -1 })
        return res
            .status(200)
            .json({ posts, message: 'Posts fetched successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error occurred' });
    }
};

const postViews = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        post.views = post.views + 1
        await post.save()
        return res.status(200).json({ message: "view added" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error occurred' });
    }
}


module.exports = {
    createPost,
    getAllPosts,
    postViews   
};
