const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    dishes:Array
});

const SaleSchema = mongoose.model('SaleSchema', saleSchema);

module.exports = SaleSchema;
