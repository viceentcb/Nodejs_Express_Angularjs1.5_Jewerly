const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        city(slug: String!): City
        cities: [City]
    }
    extend type Mutation {
        createCity(input: CityInput): City
        updateShopinCity(input: Cityshop):City
    }
    type City {
        id: ID!
        slug: String!
        name: String
        shop: [Shop]
    }
    input CityInput {
        name: String
        shop: [String]
    }
    input Cityshop {
        name:String
        shop: [String]
    }
`;

module.exports = typeDefs;