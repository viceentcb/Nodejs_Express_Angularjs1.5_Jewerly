const { gql } = require('apollo-server-express');

const Query = gql`
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
`;

let City = require ('./cities/city.schemas');
let Shop = require ('./shops/shop.schema');
let User = require ('./users/user.shema');


const typeDefs = [
    Query,
    City,
    Shop,
    User
];

module.exports = typeDefs;