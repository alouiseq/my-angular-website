define(['angular'], function (angular) {

    'use strict';

    angular.module('pieChartsApp.services.pieSlices', [])
        .factory('PieSlices', function ($http, urls) {
            var url = urls.baseUrl + urls.pieChartsAPI;
            return {
                addSlice: function (newSlice) {
                    return $http.post(url + '/addSlice', JSON.stringify(newSlice)).then(
                        function (data) {
                            return data.data;                      
                        }
                    );   
                },
                deleteSlice: function (chartId) {
                    return $http.delete(url + '/deleteSlice/' + chartId).then(
                        function (data) {
                            return data.status;
                        }
                    );
                },
                updateSlice: function (chartId, modifiedSlice) {
                    return $http.put(url + '/updateSlice/' + chartId, modifiedSlice).then(
                        function (data) {
                            return data.status;
                        }
                    );
                },
            };
        });
});