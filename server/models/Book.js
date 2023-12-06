const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name:{
        type: String
    },
    genre:{
        type: String
    },
    authorId:{
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Book', bookSchema)