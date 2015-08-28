define(['angular'], function (angular) {

	'use strict';

	angular.module('pieChartsApp.services.pieCharts', [])
		.factory('PieCharts', function ($http, urls) {
			var url = urls.baseUrl + urls.pieChartsAPI;
			return {
				createPie: function (newChart) {
					return $http.post(url + '/createChart', JSON.stringify(newChart)).then(
					    function (data) {
					        return data.data;				       
					    }
					);   
				},
				deletePie: function (chartId) {
					return $http.delete(url + '/deleteChart/' + chartId).then(
						function (data) {
							return data.status;
						}
					);
				},
				listPies: function () {
					return $http.get(url + '/getCharts').then(
						function (data) {
							return data.data;
						}
					);
				},
				showPieInfo: function (chartId) {
					return $http.get(url + '/displayChart/' + chartId).then(
						function (data) {
							return data.data;
						}
					);
				},
				updatePie: function (chartId, modifiedChart) {
					return $http.put(url + '/updateChart/' + chartId, modifiedChart).then(
						function (data) {
							return data.status;
						}
					);
				},
			};
		});
});