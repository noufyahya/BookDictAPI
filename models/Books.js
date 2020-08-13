const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    isbn: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    published: {
        type: String,
    },
    publisher: {
        type: String,
    },
    pages: {
        type: Number,
    },
    description: {
        type: String,

    },
    website: {
        type: String,

    }

});
//             mongoose.model('name',NameofSchema)
module.exports = mongoose.model("Books", bookSchema);