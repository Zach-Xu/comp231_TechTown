const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    res.json(posts)
})

const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params
    if (!postId) {
        res.status(400)
        throw new Error('Unknown post id')
    }
    const post = await Post.findById(postId).populate('user', '-password').populate({
        path: 'answers',
        populate: {
            path: 'user',
            select: '-password'
        }
    })
    res.status(200).json(post)
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

const getPostsForUser = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user._id })
    res.status(200).json(posts)
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

    if (!req.user._id.equals(post.user)) {
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

    if (!req.user._id.equals(post.user)) {
        res.status(403)
        throw new Error('Not the author of the post')
    }

    post = await Post.findByIdAndDelete(postId)
    res.status(200).json(post)
})

const answerPost = asyncHandler(async (req, res) => {
    const { content } = req.body
    if (!content) {
        throw new Error('Please provide your answer!')
    }
    const { postId } = req.params

    let post = await Post.findById(postId)
    if (!post) {
        throw new Error('Post not found')
    }
    const { user: { _id } } = req

    if (post.user.equals(_id)) {
        throw new Error('Not allowed to answer own question')
    }

    const answer = {
        user: _id,
        content
    }
    post.answers = [answer, ...post.answers]
    await post.save()

    post = await Post.findById(postId).populate('user', '-password').populate({
        path: 'answers',
        populate: {
            path: 'user',
            select: '-password'
        }
    })
    res.status(201).json(post.answers)
})

module.exports = { getAllPosts, createPost, getPostById, getPostsForUser, updateContentAndCategory, deletePost, answerPost }