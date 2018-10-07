const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    id: String,
    author: String,
    content: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('message', messageSchema);