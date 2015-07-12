'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
