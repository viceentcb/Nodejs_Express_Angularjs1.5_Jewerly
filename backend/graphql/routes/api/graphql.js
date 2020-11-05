var { ApolloServer}  = require('apollo-server-express');
var { AuthenticationError } = require('apollo-server-express');
var typeDefs = require('../../graphql/schemas/shema');
var resolvers = require('../../graphql/resolvers/resolver');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

const SERVERAUTH = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        
        if (req.payload) {
            user = await User.findById(req.payload.id);
        } 
        
        return { user, AuthenticationError };
    }
});

const SERVERS = {
    graphql: SERVER,
    graphqlauth :SERVERAUTH
};

module.exports = SERVERS;