const express = require('express')
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth');
const User = require('../../models/User')

//@route GET api/auth
//@desc  get profile of current loggedin user
//@access Public

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ data: user })

    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')


    }

});

module.exports = router;