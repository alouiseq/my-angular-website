'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.directive:milestonesTimeline
 * @description
 * # milestonesTimeline
 * Directive of the mywebsiteApp
 */

 angular.module('mywebsiteApp')
 	.directive('milestonesTimeline', function () {
 		return {
 			restrict: 'E',
 			templateUrl: '../views/milestones.html',
 			scope: {},
 			link: function (scope) {
 				scope.milestones = [
 					{ year: 1983, event: 'I was born' },
 					{ year: 2012, event: 'MS/BS Computer Engineering; Married high school sweetheart' },
 					{ year: 2013, event: 'Alyssa was born' },
 					{ year: 2014, event: 'First software developer role at GE' },
 					{ year: 2015, event: 'Currently a Site Reliability Engineer @ Shutterfly' }
 				];
 			}
 		};
 	});