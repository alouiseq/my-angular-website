define(['angular'], function (angular) {
	'use strict';

	angular.module('mywebsiteApp.services.Settings', [])
		.factory('Settings', function ($timeout) {

			return {
				customizeHeader: function (title, info, pageName, pageClass) {
					// Hide canvas element outside home
		            $('#canv').css('display', 'none');    

		            // Activate selected page header 
		            $('.nav').find('a').removeClass('active');
		            $('.'+pageName).children('a').addClass('active');     

		            // Add specific data to nav area
		            $('#nav-title1').find('em').text(title);
		            $('#nav-title2').find('h2').text(info);
		            $('#titles').removeClass('titles-animate');
		            $timeout(function () {
		                $('#titles').addClass('titles-animate');
		            });

		            // Custom nav header background
		            $('.navbar').removeClass(function () {
		                return $(this).attr('class');
		            });
		            $('#navbar').addClass('navbar custom-navbar ' + pageClass);
				},
				getProjectLinks: function () {

					return {
						newSite: {
			                link: 'home',
			                github: 'https://github.com/alouiseq/my-angular-website'
		            	},
			            todos: {
			                link: 'https://my-website-express.herokuapp.com/todos',
			                github: 'https://github.com/alouiseq/to-dos'
			            },
			            oldSite: {
			                link: 'https://my-website-express.herokuapp.com',
			                github: 'https://github.com/alouiseq/my-ko-node-website'
			            },
			            pieCharts: {
			                link: 'sandbox',
			                github: 'https://github.com/alouiseq/pie-charting'
			            },
			            connectFour: {
			                link: 'sandbox',
			                github: 'https://github.com/alouiseq/connectFour'
			            },
			            spaceDuelGame: {
			                github: 'https://github.com/alouiseq/space-duel'
			            }
			        };
				}
			};
		});
});