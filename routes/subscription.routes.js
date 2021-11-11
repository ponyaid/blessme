const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Subscription = require('../models/Subscription')
const router = Router()


router.post('/', auth,
    async (req, res) => {
        try {
            const { space, level } = req.body

            const subscription = new Subscription({ user: req.userId, space, level })
            await subscription.save()

            res.status(201).json({ subscription })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.get('/',
    async (req, res) => {
        try {
            const subscriptions = await Subscription.find({ ...req.query })
            res.status(200).json({ subscriptions })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/:id', auth,
    async (req, res) => {
        try {
            const { level } = req.body
            const subscription = await Subscription.findByIdAndUpdate(
                req.params.id,
                { level, updatedAt: new Date() },
                { new: true },
            )
            res.status(201).json({ subscription })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.delete('/:id', auth,
    async (req, res) => {
        try {
            await Subscription.deleteOne({ _id: req.params.id })
            res.status(200).json('Deleted')

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.get('/populate', auth,
    async (req, res) => {
        try {
            const subscriptions = await Subscription.find({ user: req.userId })
                .populate('space')
                .populate('level')
            res.status(200).json({ subscriptions })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


module.exports = router