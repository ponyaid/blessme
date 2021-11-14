const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    body: { type: String },
    title: { type: String },
    cover: { type: String },
    space: { type: Types.ObjectId, ref: 'Space' },
    level: { type: Types.ObjectId, ref: 'Level' },
    owner: { type: Types.ObjectId, ref: 'User' },
    likes: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
})


module.exports = model('Post', schema)