const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await PostModel.find()
    res.json(posts)
})


const createPost = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body
    if (!title || !content || !category) {
        res.status(400)
        throw new Error('Please provide all the fields')
    }

    const post = await Post.create({
        user: req.user._id,
        title,
        content,
        category
    })

    if (post) {
        return res.status(201).json(post)
    }
    res.status(400)
    throw new Error('Fail to create the post')
})

const updateContentAndCategory = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const { content, category } = req.body
    if (!content || !category) {
        res.status(400)
        throw new Error('Please provide the content and category')
    }

    let post = await Post.findById(postId)
    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    if (req.user._id !== post.user) {
        res.status(403)
        throw new Error('Not the author of the post')
    }

    post = await Post.findByIdAndUpdate(postId, {
        content,
        category
    }, { new: true })
    res.status(200).json(post)
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params

    let post = await Post.findById(postId)
    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    if (req.user._id !== post.user) {
        res.status(403)
        throw new Error('Not the author of the post')
    }

    post = await Post.findByIdAndDelete(postId)
    res.status(200).json(post)
})

module.exports = { getAllPosts, createPost, updateContentAndCategory, deletePost }