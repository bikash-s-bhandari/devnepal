const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('request');
const { authMiddleware } = require('../../middleware/auth');

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

const profileValidation = [
    check('status').not().isEmpty(),
    check('skills', 'Skills is required!').not().isEmpty(),

];

const experienceValidation = [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required!').not().isEmpty(),
    check('from', 'From Date is required!').not().isEmpty(),

];

const educationValidation = [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required!').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required!').not().isEmpty(),
    check('from', 'From Date is required!').not().isEmpty(),

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
        return next(new ErrorResponse(`The user doesn't exist with provided email`, 400));

    }

    //check if password is correct and matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`The password is incorrect`, 400));

    }

    const message = 'You are successfully logged in!';

    sendTokenResponse(user, 200, message, res);




}));

//@route POST api/profile/me
//@desc  Get users profile
//@access Private
router.get('/profile/me', authMiddleware, asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
        return next(new ErrorResponse(`There is no profile for this user`, 404));

    }
    res.status(200).json({ data: profile })




}));


//@route POST api/profile
//@desc  Update or Create users profile
//@access Private
router.post('/profile', [authMiddleware, profileValidation], asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //build a profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    const { company, website, location, bio, status, githubusername, skills } = req.body;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
        //if profile exist then update
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        )
        return res.status(201).json({ data: profile })

    } else {
        //creating new profile
        profile = new Profile(profileFields);
        await profile.save();
        res.status(201).json({ data: profile })




    }

}));

//@route GET api/profile
//@desc  Get all profiles
//@access Public
router.get('/profile', asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.status(200).json({ data: profiles })

}));

//@route GET api/profile/user/:user_id
//@desc  Get Profile by user_id
//@access Public
router.get('/profile/user/:user_id', asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.user_id });

    res.status(200).json({ data: profile })

}));


//@route DELETE api/profile
//@desc  Delete Profile,User and Post
//@access Private
router.delete('/profile', authMiddleware, asyncHandler(async (req, res, next) => {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.status(200).json({ msg: "User deleted" })

}));



//@route PUT api/profile/experience
//@desc  Add experience in profile
//@access Private
router.put('/profile/experience', [authMiddleware, experienceValidation], asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, company, from, to, location, current, description } = req.body;
    const newExperience = {
        title,
        company,
        from,
        to,
        location,
        current,
        description
    }

    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExperience);
    await profile.save();
    res.status(200).json({ data: profile });


}));






//@route PUT api/profile/experience/:exp_id
//@desc  Delete experience from profile
//@access Private
router.delete('/profile/experience/:exp_id', authMiddleware, asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
    if (removeIndex == -1) {
        return res.status(400).json({ msg: 'Experience doesnt exist with provided id' })

    } else {
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.status(200).json({ data: profile })

    }




}));


//@route PUT api/profile/education
//@desc  Add education in profile
//@access Private
router.put('/profile/education', [authMiddleware, educationValidation], asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEducation);
    await profile.save();
    res.status(200).json({ data: profile });


}));

//@route PUT api/profile/education/:edu_id
//@desc  Delete education from profile
//@access Private
router.delete('/profile/education/:edu_id', authMiddleware, asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
    if (removeIndex == -1) {
        return res.status(400).json({ msg: 'Education doesnt exist with provided id' })

    } else {
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.status(200).json({ data: profile })

    }




}));

//@route GET api/profile/github/username
//@desc  Get github repositories of users
//@access Private
router.get('/profile/github/:username', authMiddleware, asyncHandler(async (req, res, next) => {
    const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecrete')}`,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };

    request(options, (err, response, body) => {
        if (err) console.log(err)
        if (response.statusCode !== 200) {
            return next(new ErrorResponse(`No github profile found!`, 404));

        }
        res.status(200).json(JSON.parse(body))


    });


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