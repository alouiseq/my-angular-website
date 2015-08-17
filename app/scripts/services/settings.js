define(['angular'], function (angular) {
	'use strict';

	angular.module('mywebsiteApp.services.Settings', [])
		.factory('Settings', function () {

			return {
				stickyNavMenu: function () {
					// $(window).on('scroll', function () {
		   //              if ($(this).scrollTop() > 155) {
		   //                  $('#nav-title1').addClass('sticky-title1');
		   //                  $('#nav-title2').addClass('sticky-title2');
		   //              } else {
		   //                  $('#nav-title1').removeClass('sticky-title1');
		   //                  $('#nav-title2').removeClass('sticky-title2');
		   //              }
		   //              if ($(this).scrollTop() > 366) {
		   //                  $('.header-wrapper').addClass('sticky-navbar');
		   //                  $('#nav-title2').removeClass('sticky-title2');
		   //              } else {
		   //                  $('.header-wrapper').removeClass('sticky-navbar');

		   //              }
     //        		});
				}
			};
		});
});