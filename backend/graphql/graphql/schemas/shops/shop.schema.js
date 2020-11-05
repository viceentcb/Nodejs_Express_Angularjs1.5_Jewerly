const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        shop(slug: String!): Shop
        shops: [Shop]
    }
    extend type Mutation {
        createShop(input: ShopInput): Shop
        updateCityinShop(input:Shopcity):Shop

    }
    type Shop {
        id: ID!
        slug: String!
        name: String
        brand: String
        city: [City]

    }
    input ShopInput {
        name: String!
        brand: String
    }
    input Shopcity {
        name:String
        city: [String]
    }
`;

module.exports = typeDefs;