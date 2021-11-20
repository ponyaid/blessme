const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Post = require('../models/Post')
const router = Router()


router.post('/', auth,
    async (req, res) => {
        try {
            const post = new Post({
                ...req.body,
                level: req.body.level || null,
            })
            await post.save()

            res.status(201).json({ post })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

router.get('/',
    async (req, res) => {
        try {
            const filter = { ...req.query }
            if (req.query.spaces) {
                const spaces = req.query.spaces.split(',')
                filter.space = { $in: spaces }
            }
            const posts = await Post.find({ ...filter })
                .sort({ createdAt: 'desc' })
                .populate('level')
                .populate('space')

            res.status(200).json({ posts })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })


// router.get('/:id',
//     async (req, res) => {
//         try {
//             const level = await Level.findById(req.params.id)
//             res.status(200).json({ level })

//         } catch (e) {
//             res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
//         }
//     })

// router.post('/:id',
//     async (req, res) => {
//         try {
//             const { name, price, description } = req.body
//             const level = await Level.findByIdAndUpdate(
//                 req.params.id,
//                 { name, price, description },
//                 { new: true },
//             )
//             res.status(201).json({ level })

//         } catch (e) {
//             res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
//         }
//     })

router.delete('/:id', auth,
    async (req, res) => {
        try {
            await Post.deleteOne({ _id: req.params.id })
            res.status(200).json({ message: 'Deleted!' })

        } catch (e) {
            res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
        }
    })

// router.post('/:id/upload', upload.single('file'),
//     async (req, res) => {
//         try {
//             const level = await Level.findByIdAndUpdate(
//                 req.params.id,
//                 { picture: req.file.path },
//                 { new: true },
//             )
//             res.status(201).json({ level })

//         } catch (e) {
//             res.status(500).json({ message: e.message || 'Something went wrong. Try again' })
//         }
//     })


module.exports = router