const Book = require('../models/Book')
const Author = require('../models/Author')

const mongoDataMethods = {
    getAllBooks: async () => {
        return await Book.find()
    },
    createAuthor: async (args) => {
        const author = new Author(args)
        return await author.save()
    },
    createBook: async (args) => {
        const book = new Book(args)
        return await book.save()
    },
    getBookById: async (id) => {
        return await Book.findById(id)
    },
    getAuthorById: async (id) => {
        return await Author.findById(id)
    },
    getAllAuthors: async () => {
        return await Author.find()
    },
    getAllBooksByAuthorId: async (authorId) => {
        return await Book.find({authorId})
    } 
}

module.exports = mongoDataMethods