const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Space = require('../models/Space')
const User = require('../models/User')
const router = Router()


router.post('/create', auth,
    async (req, res) => {
        try {

            const { direction, alias, onlyAdult } = req.body
            const condidate = await Space.findOne({ alias })

            if (condidate) {
                return res.status(400).json({ message: 'This alias already exists' })
            }

            const space = new Space({ direction, alias, onlyAdult, owner: req.user.userId })
            await space.save()

            const user = await User.findByIdAndUpdate(req.user.userId, { space: space.id }, { new: true }).populate('space')
            res.status(201).json({ space, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

module.exports = router