import angular from 'angular';

// Create the module where our functionality can attach to
let jewelsModule = angular.module('app.jewels', []);

// Include our UI-Router config settings
import JewelsConfig from './jewels.config';
jewelsModule.config(JewelsConfig);

// Controllers
import JewelsCtrl from './jewels.controller';
jewelsModule.controller('JewelsCtrl', JewelsCtrl);


export default jewelsModule;
