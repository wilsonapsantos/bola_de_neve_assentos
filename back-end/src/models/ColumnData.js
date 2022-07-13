const mongoose = require('mongoose');

const ColumnData = new mongoose.Schema({
    columnName: String,
    amountRow: Number,
    seat: [
        {
            id: String,
            number: Number,
            filled: Boolean
        }
    ]
})

module.exports = mongoose.model('columns', ColumnData);