require.config({
	baseUrl: '/scripts',
	paths: {
		'angular': '/bower_components/angular/angular',
		'app': 'app',
		'ngAnimate': '/bower_components/angular-animate/angular-animate',
        'ngAria': '/bower_components/angular-aria/angular-aria',
        'ngCookies': '/bower_components/angular-cookies/angular-cookies',
        'ngMessages': '/bower_components/angular-messages/angular-messages',
        'ngResource': '/bower_components/angular-resource/angular-resource',
        'ngRoute': '/bower_components/angular-route/angular-route',
        'ngSanitize': '/bower_components/angular-sanitize/angular-sanitize',
        'ngTouch': '/bower_components/angular-touch/angular-touch',
        'ui.router': '/bower_components/angular-ui-router/release/angular-ui-router',
        'jquery': '/bower_components/jquery/dist/jquery',
        'underscore': '/bower_components/underscore/underscore',
        'lodash': '/bower_components/lodash/lodash',
        'text': '/bower_components/text/text',
        'connectFour': '/bower_components/connectFour/src',
        'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap',
        'ngHighcharts': '/bower_components/highcharts-ng/dist/highcharts-ng',
        'highcharts': '/bower_components/highcharts/highcharts',
        'highcharts-more': '/bower_components/highcharts/highcharts-more',
        'exporting': '/bower_components/highcharts/modules/exporting',
	},
	shim: {
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'ngAnimate': ['angular'],
        'ngAria': ['angular'],
        'ngCookies': ['angular'],
        'ngMessages': ['angular'],
        'ngResource': ['angular'],
        'ngRoute': ['angular'],
        'ngSanitize': ['angular'],
        'ngTouch': ['angular'],
        'ui.router': ['angular'],
        'bootstrap': ['jquery'],
        'ngHighcharts': ['highcharts', 'angular'],
        'highcharts-more': ['highcharts'],
        'exporting': ['highcharts']
	}
});

window.name = 'NG_DEFER_BOOTSTRAP!';
	
require([
	'angular',
	'app',
	'jquery',
	'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
	'lodash',
	'underscore',
    'text',
    'bootstrap',
    'ngHighcharts',
    'highcharts',
    'highcharts-more',
    'exporting'
], function (angular, app) {
	'use strict';

	// jshint ignore: start
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	// jshint ignore: end

	angular.element().ready(function () {
		angular.resumeBootstrap([app.name]);
	});
});	