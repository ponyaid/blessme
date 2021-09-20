const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


const createToken = userId => {
    const token = jwt.sign(
        { userId: userId },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
    )
    return token
}


router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum password length 8 characters').isLength({ min: 8 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const { name, email, password } = req.body
            const condidate = await User.findOne({ email })

            if (condidate) {
                return res.status(400).json({ message: 'This user already exists' })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ name, email, password: hashPassword })

            await user.save()

            const token = createToken(user.id)

            res.status(201).json({ token, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.post('/login',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Enter password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password. Please try again' })
            }

            const token = createToken(user.id)

            res.json({ token, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


module.exports = router