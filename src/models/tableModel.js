const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    topic: {
        type: String,
        trim: true,
        required: true
    },
    ranking: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Topic_rank", tableSchema);