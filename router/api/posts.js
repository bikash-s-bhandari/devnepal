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
const commentValidation = [
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

        return next(new ErrorResponse(`Post not found!`, 404));

    }
    res.status(200).json({ data: post })
}));


//@route Delete api/posts/:id
//@desc  Delete post 
//@access Private
router.delete('/:id', authMiddleware, asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {

        return next(new ErrorResponse(`Post not found!`, 404));
    }

    //check user

    if (post.user.toString() !== req.user.id) {

        return next(new ErrorResponse(`User not authorized!`, 404));

    }
    await post.remove();
    res.status(200).json({ msg: 'Post deleted successfully!' })
}));

//@route PUT api/posts/like/:id
//@desc  Like a post
//@access Private
router.put('/like/:id', authMiddleware, asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorResponse(`Post not found!`, 404));
    }

    //check if user has already like the post
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

        return next(new ErrorResponse(`User has already like the post`, 400));

    }

    post.likes.unshift({ user: req.user.id });
    await post.save();


    res.status(200).json({ msg: 'Like success' })
}));

//@route PUT api/posts/unlike/:id
//@desc  Unlike a post
//@access Private
router.put('/unlike/:id', authMiddleware, asyncHandler(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {

        return next(new ErrorResponse(`Post not found!`, 404));
    }

    //check if user has already like the post
    if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {

        return next(new ErrorResponse(`Post has not been liked!`, 400));

    }

    //find remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    if (removeIndex !== -1) {
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.status(200).json({ msg: 'Unlike success' })

    }



}));

//@route POST api/posts/comment/:id
//@desc  Create a comment
//@access Private
router.post('/comment/:id', [authMiddleware, commentValidation], asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,//posted by
        avatar: user.avatar

    }

    post.comments.unshift(newComment);
    await post.save();

    return res.status(201).json({ data: post })
}));

//@route DELETE api/posts/comment/:id/:comment_id
//@desc  Create a comment
//@access Private
router.delete('/comment/:id/:comment_id', authMiddleware, asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    //pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    //make sure comment exist
    if (!comment) {
        return res.status(404).json({ msg: 'Comment not exist!' })
    }

    //make sure only user who commented allow to delete comment
    if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized!' })
    }

    //find remove index
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    if (removeIndex !== -1) {
        post.comments.splice(removeIndex, 1);
        await post.save();
        return res.status(200).json({ data: post.comments })

    }






}));

module.exports = router;