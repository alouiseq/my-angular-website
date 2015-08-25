define(['./connectFour'], function () {
    'use strict';

    /**
     * @ngdoc function
     * @name connectFourApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the connectFourApp
     */
    angular.module('connectFourApp.features', [
        'connectFourApp.directives.connectFour'
    ]);
    
});
