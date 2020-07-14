const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = new Router()

router.post(
    '/register',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('username', 'Uncorrect username').isLength({min:3, max:12}),
        check('password', 'Uncorrect password').isLength({min:3, max:12}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                res.status(400).json({message: "Uncorrect user data", errors: errors})
            }

            const {username, email, password} = req.body
            const candidateEmail = await User.findOne({email:email})
            const candidateUsername = await User.findOne({username:username})

            if(candidateEmail ) {
                return res.status(400).json({message:`User with email ${email} already exist`})
            }

            if(candidateUsername ) {
                return res.status(400).json({message:`User with username ${username} already exist`})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({username, email, password:hashedPassword})
            await user.save()

            res.json({user: user, message: 'User was created'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Server error"})
        }
    })



module.exports = router