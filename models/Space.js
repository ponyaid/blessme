const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    title: { type: String },
    directions: [{ type: String }],
    alias: { type: String, required: true },
    currency: { type: String },
    onlyAdult: { type: Boolean, required: true },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    fans: [{ type: Types.ObjectId, ref: 'User' }],
})


module.exports = model('Space', schema)