const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')
const Post = require('../../models/Post')
const { authMiddleware } = require('../../middleware/auth');

const ErrorResponse = require('../../utils/error_response')
const asyncHandler = require('../../middleware/async_handler')

const postValidation = [
    check('text', 'Text field is required').not().isEmpty(),


];



//@route POST api/posts
//@desc  Create a post
//@access Private
router.post('/', [authMiddleware, postValidation], asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user.id).select('-password');
    const newPost = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,//posted by
        avatar: user.avatar

    }
    const post = await Post.create(newPost);
    return res.status(201).json({ data: post })





}));

//@route GET api/posts
//@desc  Get all posts
//@access Private
router.get('/', authMiddleware, asyncHandler(async (req, res, next) => {

    const posts = await Post.find().sort({ date: -1 })//sortng post in latest order
    return res.status(200).json({ data: posts })

}));


//@route GET api/posts/:id
//@desc  Get post by id
//@access Private
router.get('/:id', authMiddleware, asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found!' })
    }
    res.status(200).json({ data: post })
}));


//@route Delete api/posts/:id
//@desc  Delete post 
//@access Private
router.delete('/:id', authMiddleware, asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found!' })
    }

    //check user

    if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized!' })

    }
    await post.remove();
    res.status(200).json({ msg: 'Post deleted successfully!' })
}));

module.exports = router;