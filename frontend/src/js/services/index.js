import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

// GRAPHQL CLIENT SERVICE
import GraphQLClientService from './graphql.service';
servicesModule.service('GraphQLClient', GraphQLClientService);

//cities Service
import CitiesService from './cities.service';
servicesModule.service('Cities',CitiesService)

//shops Service
import ShopsService from './shops.service';
servicesModule.service('Shops',ShopsService)

import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import JewelsService from './jewels.service';
servicesModule.service('Jewels', JewelsService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);


import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);


export default servicesModule;
