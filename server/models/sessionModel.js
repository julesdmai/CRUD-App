const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, index: {expires: '60s'} }
})

module.exports = mongoose.model('Session', sessionSchema);