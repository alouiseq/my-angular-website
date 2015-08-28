define(['./pieCharts', './pieChartsService'], function () {
    'use strict';

    /**
     * @ngdoc function
     * @name connectFourApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the connectFourApp
     */
    angular.module('pieChartsApp.features', [
        'pieChartsApp.directives.pieCharts'
        'pieChartsApp.services.pieCharts'
    ]);
    
});
