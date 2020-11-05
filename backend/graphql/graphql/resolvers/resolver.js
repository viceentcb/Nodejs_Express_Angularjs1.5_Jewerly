import { merge } from 'lodash';

// .exec() is used at the end of the GET mongoose queries so it doesn't run twice

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

let CityResolvers = require ('./cities/city.resolvers');
let ShopResolvers  = require ('./shops/shop.resolvers');
let UserResolvers  = require ('./users/users.resolvers');

const resolvers = merge(
  QueryResolvers,
  CityResolvers,
  ShopResolvers,
  UserResolvers
);

module.exports = resolvers;