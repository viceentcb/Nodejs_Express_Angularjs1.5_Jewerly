import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import JewelsList from './jewels-helpers/jewels_list.component';
componentsModule.component('jewelsList', JewelsList);

import JewelDetail from './jewels-helpers/jewel_detail.component';
componentsModule.component('jewelDetail', JewelDetail);

export default componentsModule;
