const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    title: { type: String },
    directions: [{ type: String }],
    alias: { type: String, required: true },
    avatar: { type: String },
    tagline: { type: String },
    cover: { type: String },
    about: { type: String },
    currency: { type: String },
    onlyAdult: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    owner: { type: Types.ObjectId, ref: 'User', required: true },

    posts: [{ type: Types.ObjectId, ref: 'Post' }],

    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    telegram: { type: String, default: '' },
    youtube: { type: String, default: '' }
    
}, { timestamp: true })


module.exports = model('Space', schema)