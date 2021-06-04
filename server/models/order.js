const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
    id: Number,
    ownerId: String,
    date: Date,
    clientDetails: Object,
    total: Number,
    items: [
        {
            product_id: String,
            name: String,
            price: Number,
            quantity: Number,
            size: String
        }
    ]
}, {collection: 'orders'})

module.exports = mongoose.model('Order', orderShema)