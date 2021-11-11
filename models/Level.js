const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    space: { type: Types.ObjectId, ref: 'Space' },
    owner: { type: Types.ObjectId, ref: 'User' },
    description: { type: String },
    picture: { type: String },
})


module.exports = model('Level', schema)