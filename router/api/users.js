const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const config = require('config');

const ErrorResponse = require('../../utils/error_response')
const asyncHandler = require('../../middleware/async_handler')

const registerValidation = [
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password').isLength({ min: 5, max: 16 }).withMessage('Password must be between 5 to 16 characters'),
    check('confirmPassword').trim().custom(async (confirmPassword, { req }) => {
        const password = req.body.password
        if (password !== confirmPassword) {
            throw new Error('Confirm Password did not match!')
        }
    }),
];

const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password').isLength({ min: 5 }).withMessage('Password must be between 5 characters'),

];

//@route POST api/users
//@desc  Register Users
//@access Public

router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        //see if user already exist
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exist!' }] })
        }

        //get users gravatar

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = await User.create({
            name,
            email,
            password,
            avatar
        });

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,
            config.get('jwtSecrete'), {
            expiresIn: 36000

        }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token: token })


        })



    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')

    }




});

router.post('/login', loginValidation, asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(401).json({ msg: "The user doesn't exist with provided email" })

    }

    //check if password is correct and matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ msg: "The password is incorrect!" })

    }

    const message = 'You are successfully logged in!';

    sendTokenResponse(user, 200, message, res);




}));



const sendTokenResponse = async (user, statusCode, message, res) => {
    const token = await user.getSignedJwtToken();

    //cookie options
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),//1 day
        httpOnly: true,//access through only client side
    }
    if (process.env.NODE_ENV === 'production') {
        options.secure = true

    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, message, data: user, token })



}









module.exports = router;