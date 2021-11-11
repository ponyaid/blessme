const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')
const Space = require('../models/Space')
const User = require('../models/User')
const router = Router()


router.post('/create', auth,
    async (req, res) => {
        try {

            const { direction, alias, onlyAdult, title } = req.body
            const condidate = await Space.findOne({ alias })

            if (condidate) {
                return res.status(400).json({ message: 'This alias already exists' })
            }

            const space = new Space({ title, direction, alias, onlyAdult, owner: req.userId })
            await space.save()

            const user = await User.findByIdAndUpdate(req.userId, { space: space.id }, { new: true }).populate('space')
            res.status(201).json({ space, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.get('/:alias',
    async (req, res) => {
        try {
            const space = await Space.findOne({ alias: req.params.alias })
            res.status(200).json(space)

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.get('/:alias/follow', auth,
    async (req, res) => {
        try {
            const space = await Space.findOneAndUpdate(
                { 'alias': req.params.alias },
                { "$push": { "followers": req.userId } },
                { new: true },
            )
            const user = await User.findByIdAndUpdate(
                req.userId,
                { "$push": { "following": space._id } },
                { new: true },
            ).populate('space')
            res.status(201).json({ space, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.get('/:alias/unfollow', auth,
    async (req, res) => {
        try {
            const space = await Space.findOneAndUpdate(
                { 'alias': req.params.alias },
                { "$pull": { "followers": req.userId } },
                { new: true },
            )
            const user = await User.findByIdAndUpdate(
                req.userId,
                { "$pull": { "following": space._id } },
                { new: true },
            ).populate('space')
            res.status(201).json({ space, user })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.post('/:alias/upload/:field', upload.single('file'),
    async (req, res) => {
        try {
            const space = await Space.findOneAndUpdate(
                { 'alias': req.params.alias },
                { [req.params.field]: req.file.path },
                { new: true },
            )
            res.status(201).json({ space })
        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/:alias/general', auth,
    async (req, res) => {
        try {
            const { alias, title, cover, avatar, tagline, about } = req.body
            const space = await Space.findOneAndUpdate(
                { 'alias': req.params.alias },
                { alias, title, about, cover, avatar, tagline },
                { new: true },
            )
            res.status(201).json(space)

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/:alias/social', auth,
    async (req, res) => {
        try {
            const { instagram, facebook, telegram, youtube } = req.body
            const space = await Space.findOneAndUpdate(
                { 'alias': req.params.alias },
                { instagram, facebook, telegram, youtube },
                { new: true },
            )
            res.status(201).json(space)

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


module.exports = router
