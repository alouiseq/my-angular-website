define(['angular'], function (angular) {

	'use strict';

	angular.module('pieChartsApp.services.pieCharts', [])
		.factory('PieCharts', function ($http, urls) {
			return {
				createPie: function (newChart) {
					return $http.post(urls.baseUrl + urls.apiPath + '/createChart', JSON.stringify(newChart)).then(
					    function (data) {
					        return data.data;				       
					    }
					);   
				},
				deletePie: function (chartId) {
					return $http.delete(urls.baseUrl + urls.apiPath + '/deleteChart/' + chartId).then(
						function (data) {
							return data.status;
						}
					);
				},
				listPies: function () {
					return $http.get(urls.baseUrl + urls.apiPath + '/getCharts').then(
						function (data) {
							return data.data;
						}
					);
				},
				showPieInfo: function (chartId) {
					return $http.get(urls.baseUrl + urls.apiPath + '/displayChart/' + chartId).then(
						function (data) {
							return data.data;
						}
					);
				},
				updatePie: function (chartId, modifiedChart) {
					return $http.put(urls.baseUrl + urls.apiPath + '/updateChart/' + chartId, modifiedChart).then(
						function (data) {
							return data.status;
						}
					);
				},
			};
		});
});