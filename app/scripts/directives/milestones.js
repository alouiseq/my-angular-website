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
 			templateUrl: '../partials/milestones.html',
 			scope: {},
 			link: function (scope) {

                /*** Defaults ***/

                scope.expand = false;

 				scope.milestones = [
 					{ year: 1983, expand: false, event: 'I was born' },
 					{ year: 2012, expand: false, event: 'MS/BS Computer Engineering; Married high school sweetheart' },
 					{ year: 2013, expand: false, event: 'Alyssa was born' },
 					{ year: 2014, expand: false, event: 'First software developer role at GE' },
 					{ year: 2015, expand: false, event: 'Currently a Site Reliability Engineer @ Shutterfly' }
 				];


                /*** Methods ***/

                scope.expandEvent = function (milestone, set) {
                    if (set === 'true') {
                        milestone.expand = true;
                    } else {
                        milestone.expand = false;
                    }
                };
 			}
 		};
 	});