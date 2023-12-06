const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
const http = require('http')
const mongoose = require('mongoose')

const app = express()
const mongoDataMethods = require('./data/db')
const httpServer = http.createServer(app)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods})
})

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://tattu2705:nosexnolife123@cluster0.zvdjjox.mongodb.net/BookShop')
        console.log('MongoDB connected')
    }
    catch(err) {
        process.exit(1)
    }
}

const start = async () => {
    await server.start();
    connectDB()
    server.applyMiddleware({ app });
}

start();

httpServer.listen({ port: 4000 }, () => {
    console.log(`Server is running on http://localhost:4000${server.graphqlPath}`)
})

