const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')

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

        await User.create({
            name,
            email,
            password,
            avatar
        });
        res.status(200).json('User Registered!')


    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')

    }




});





module.exports = router;