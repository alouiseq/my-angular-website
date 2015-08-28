define(['angular', 'text!./pieCharts.html', 'text!./pieCharts.css'], function (angular, template, css) {

    'use strict';

    /**
     * @ngdoc function
     * @name pieChartsApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the pieChartsApp
     */
    angular.module('pieChartsApp.directives.pieCharts', [])
        .directive('pieCharts', function ($http, PieCharts) {

            return {
                restrict: 'EA',
                template: template,
                scope: {},
                link: function (css) {
                    scope.showCreateForm = false;
                    scope.showError = false;
                    scope.showChartForm = false;
                    scope.pieCharts = [];
                    scope.newChart = {
                        year: '',
                        title: '',
                        description: ''
                    };
                    scope.showChart = {};


                    /*** METHODS ***/

                    // Set config options for highchart instances
                    var setChartConfig = function (title, year, data, expenses) {
                        var dataSeries = [];

                        // Get average expense           
                        var totalExpense = 0;
                        var count = 0;

                        var configs = {
                            options: {
                                chart: {
                                    type: 'pie',
                                    // plotBackgroundColor: null,
                                    // plotBorderWidth: null,
                                    plotShadow: false
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            style: {
                                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                            },
                                            formatter: function () {
                                                if (this.series.name == 'Visits') {
                                                    return this.point.name + ': ' + this.point.y + 'x';
                                                } else {    // Expenses
                                                    totalExpense += this.point.y;
                                                    count++;
                                                    return this.point.name + ': $' + this.point.y;
                                                }
                                            }
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: function () {
                                        if (this.series.name == 'Visits') {
                                            return this.series.name + ': ' + this.point.percentage + '%';
                                        } else {    // Expense
                                            return this.series.name + ': $' + this.point.y + '   AVG: $' + totalExpense / count;
                                        }
                                    }
                                }
                                // drilldown: expenses
                            },             
                            title: {
                                text: title
                            },
                            subtitle: {
                                text: year
                            },
                            series: [{
                                type: 'pie',
                                name: 'Visits',
                                data: data
                                // data: [
                                //     ['No Slice',   100.0],
                                // ]
                            }]
                        };

                        if (expenses) {
                            configs.options.drilldown = expenses;
                        }
                        return configs;
                    };

                    var clear = function () {
                        scope.newChart.title = '';
                        scope.newChart.description = '';
                    };

                    scope.fillChartInfo = function (chart) {
                        scope.showError=false;
                        scope.showChart.id = chart.id || scope.showChart.id;
                        scope.newChart.year = chart.year;
                        scope.newChart.title = chart.title;
                        scope.newChart.description = chart.description;
                    };

                    scope.createChart = function () {
                        PieCharts.createPie(scope.newChart).then(
                            function (data) {
                                var chart = data;                     
                                scope.showError = false;
                                chart.chartConfig = setChartConfig(chart.title, chart.year, chart.data, chart.expenses);
                                scope.pieCharts = [chart];
                                $('#create-chart').modal('hide');
                                clear();
                            },
                            function () {
                                scope.showError = true;
                            }
                        );
                        
                    };

                    scope.listCharts = function () { 
                        PieCharts.listPies().then(
                            function (data) {
                                scope.pieCharts = data.charts;
                                scope.showError = false;
                                _.forEach(scope.pieCharts, function(pieChart) {
                                    pieChart.chartConfig = setChartConfig(pieChart.title, pieChart.year, pieChart.data, pieChart.expenses);
                                });
                            },
                            function () {
                                scope.showError = true;
                            }
                        );
                    };

                    scope.showChartInfo = function () {
                        PieCharts.showPieInfo(scope.showChart.id).then(
                            function (data) {
                                var chartInfo = data;
                                scope.showError = false;
                                chartInfo.chartConfig = setChartConfig(chartInfo.title, chartInfo.year, chart.data, chart.expenses);
                                scope.pieCharts = [chartInfo];
                                scope.showChart.id = '';
                                $('#show-chart').modal('hide');
                            },
                            function () {
                                scope.showError = true;
                            }
                        );
                    };

                    scope.deleteChart = function (chartId) {
                        PieCharts.deletePie(chartId).then(                
                            function (status) {
                                if (status >= 200 && status < 400) {
                                    scope.showError = false;
                                    var foundChart = _.findWhere(scope.pieCharts, {id: chartId});
                                    if (foundChart) {
                                        var chartIndex = _.indexOf(scope.pieCharts, foundChart);
                                        if (chartIndex > -1) {
                                            scope.pieCharts.splice(chartIndex, 1);
                                        }            
                                    }    
                                }                   
                            },
                            function () {
                                scope.showError = true;
                            }
                        );        
                    };

                    scope.updateChart = function () {
                        PieCharts.updatePie(scope.showChart.id, scope.newChart).then(
                            function (status) {
                                if (status >= 200 && status < 400) {
                                    scope.showError = false;
                                    // update the modal with updated chart info
                                    scope.fillChartInfo(scope.newChart);
                                    var foundChart = _.findWhere(scope.pieCharts, {id: scope.showChart.id});
                                    if (foundChart) {
                                        var chartIndex = _.indexOf(scope.pieCharts, foundChart);
                                        if (chartIndex > -1) {
                                            scope.pieCharts[chartIndex].chartConfig = setChartConfig(scope.newChart.title, scope.newChart.year, scope.newChart.data, scope.newChart.expenses);
                                        }            
                                    }    
                                    $('#update-chart').modal('hide');
                                    clear();
                                }
                            },
                            function () {
                                scope.showError = true;
                                scope.showCharts = true;
                            }
                        );
                    };
                }
            };
        });
});