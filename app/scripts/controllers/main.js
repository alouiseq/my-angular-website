define(['angular', 'controllers/about', 'controllers/contact', 'controllers/home', 
	'controllers/projects', 'controllers/resume'], function () {
		
		'use strict';

		angular.module('mywebsiteApp.controllers', [
			'mywebsiteApp.controllers.AboutCtrl',
			'mywebsiteApp.controllers.ContactCtrl',
			'mywebsiteApp.controllers.HomeCtrl',
			'mywebsiteApp.controllers.ProjectsCtrl',
			'mywebsiteApp.controllers.ResumeCtrl'
		]);
});