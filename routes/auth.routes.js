const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


const createToken = userId => {
    const token = jwt.sign(
        { userId },
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
            const { name, email, password, googleId, imageUrl } = req.body

            if (!googleId && !errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const condidate = await User.findOne({ email })

            if (condidate) {
                return res.status(400).json({ message: 'This user already exists' })
            }

            if (googleId) {
                const user = new User({ name, email, googleId, imageUrl })
                await user.save()

                const token = createToken(user.id)
                return res.status(201).json({ token, user })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ name, email, password: hashPassword })
            await user.save()

            const token = createToken(user.id)
            res.status(201).json({ token, user })

        } catch (e) {
            console.log(e.message)
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.post('/login',
    [check('email', 'Invalid email').isEmail()],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const { email, password, googleId } = req.body
            const user = await User.findOne({ email }).populate('space')

            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }

            if (!googleId) {
                try {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if (!isMatch) throw Error
                } catch (error) {
                    return res.status(400).json({ message: 'Invalid password. Please try again' })
                }
            }

            const token = createToken(user.id)
            res.json({ token, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/update', auth,
    async (req, res) => {
        try {
            const { name, email } = req.body
            const user = await User.findByIdAndUpdate(
                req.userId,
                { name, email },
                { new: true },
            ).populate('space')
            res.status(201).json(user)

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/upload', auth, upload.single('file'),
    async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.userId,
                { imageUrl: req.file.path },
                { new: true },
            )
            res.status(201).json(user)

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

module.exports = router