
const resolvers = {
    Query: {
        books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),

        book: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getBookById(args.id),

        author: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAuthorById(args.id),

        authors: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllAuthors()
    },
    Book: {
        author: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAuthorById(parent.authorId)
    },
    Author: {
        books: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.getAllBooksByAuthorId(parent.id)
    },

    Mutation: {
        createAuthor: async (parent, args, {mongoDataMethods}) => {
            return await mongoDataMethods.createAuthor(args)
        },
        createBook: async (parent, args, {mongoDataMethods}) => {
            return await mongoDataMethods.createBook(args)
        }
    }
}

module.exports = resolvers