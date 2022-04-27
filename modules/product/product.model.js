const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    category: {
        type: String,
        required: true
    },
    photo: String,
    price: Number,
},{
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);