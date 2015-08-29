define(['angular', './pieCharts', './pieChartsService', './pieSlicesService'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name pieChartsApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the pieChartsApp
     */
    angular.module('pieChartsApp.features', [
        'pieChartsApp.directives.pieCharts',
        'pieChartsApp.services.pieCharts',
        'pieChartsApp.services.pieSlices'
    ]);
    
});
