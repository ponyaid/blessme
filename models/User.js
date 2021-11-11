const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    space: { type: Types.ObjectId, ref: 'Space' },
    following: [{ type: Types.ObjectId, ref: 'Space' }],
    googleId: { type: String, unique: false },
    imageUrl: { type: String },
})

module.exports = model('User', schema)