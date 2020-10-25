import angular from 'angular';

// Create the module where our functionality can attach to
let jewelsModule = angular.module('app.jewels', []);

// Include our UI-Router config settings
import JewelsConfig from './jewels.config';
jewelsModule.config(JewelsConfig);

// Controllers
import JewelsCtrl from './jewels.controller';
jewelsModule.controller('JewelsCtrl', JewelsCtrl);


// Details Jewels
import Jewels_det_Ctrl from './jewelsdetails.controller';
jewelsModule.controller('Jewels_det_Ctrl', Jewels_det_Ctrl);


// Actions Jewels
import JewelActions from './jewels-actions.component';
jewelsModule.component('jewelsActions', JewelActions);

// import Comment from './comment.component';
// newsModule.component('comment', Comment)

export default jewelsModule;
