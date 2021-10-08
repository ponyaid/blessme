const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    space: { type: Types.ObjectId, ref: 'Space' },
    following: [{ type: Types.ObjectId, ref: 'Space' }]
})


module.exports = model('User', schema)