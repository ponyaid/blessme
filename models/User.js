const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    imageUrl: { type: String },
    space: { type: Types.ObjectId, ref: 'Space' },
    following: [{ type: Types.ObjectId, ref: 'Space' }],
    registeredAt: { type: Date, default: Date.now }
})

module.exports = model('User', schema)