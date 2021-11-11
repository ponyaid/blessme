const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: Types.ObjectId, ref: 'User', required: true },
    space: { type: Types.ObjectId, ref: 'Space', required: true },
    level: { type: Types.ObjectId, ref: 'Level' },
}, { timestamp: true })


module.exports = model('Subscription', schema)