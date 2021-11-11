const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')
const Level = require('../models/Level')
const router = Router()


router.post('/create', auth,
    async (req, res) => {
        try {
            const { name, space } = req.body

            const level = new Level({ name, owner: req.userId, space })
            await level.save()

            res.status(201).json({ level })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.get('/',
    async (req, res) => {
        try {
            const levels = await Level.find({ ...req.query })
            res.status(200).json({ levels })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


router.get('/:id',
    async (req, res) => {
        try {
            const level = await Level.findById(req.params.id)
            res.status(200).json({ level })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/:id',
    async (req, res) => {
        try {
            const { name, price, description } = req.body
            const level = await Level.findByIdAndUpdate(
                req.params.id,
                { name, price, description },
                { new: true },
            )
            res.status(201).json({ level })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.delete('/:id', auth,
    async (req, res) => {
        try {
            await Level.deleteOne({ _id: req.params.id })
            res.status(200).json({ message: 'Deleted!' })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.post('/:id/upload', upload.single('file'),
    async (req, res) => {
        try {
            const level = await Level.findByIdAndUpdate(
                req.params.id,
                { picture: req.file.path },
                { new: true },
            )
            res.status(201).json({ level })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


module.exports = router