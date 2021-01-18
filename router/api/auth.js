const express = require('express')
const router = express.Router();

//@route GET api/auth
//@desc  get all users
//@access Public

router.get('/', (req, res) => {
    res.send('Users route')

});

module.exports = router;