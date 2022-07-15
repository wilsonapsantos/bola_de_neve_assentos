const mongoose = require('mongoose');

const ColumnData = new mongoose.Schema({
    columnName: String,
    rows: [{
        rowNumber: Number,
        seats: [{
            number: Number,
            filled: Boolean
        }]
    }
    ]
})

module.exports = mongoose.model('columns', ColumnData);