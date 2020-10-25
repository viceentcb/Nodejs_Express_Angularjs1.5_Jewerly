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

import JewelsList from './jewels-helpers/jewels-list.component';
componentsModule.component('jewelsList', JewelsList);

import JewelPreview from './jewels-helpers/jewel-preview.component';
componentsModule.component('jewelPreview', JewelPreview);

import JewelDetail from './jewels-helpers/jewel_detail.component';
componentsModule.component('jewelDetail', JewelDetail);

import JewelsFilters from './jewels-helpers/jewels_filters.component';
componentsModule.component('jewelsFilters', JewelsFilters);

import Slider from './slider-helpers/slider.component';
componentsModule.component('slider', Slider);

import ListPagination from './jewels-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

export default componentsModule;
