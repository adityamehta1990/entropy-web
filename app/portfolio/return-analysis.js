/**
 * Created by Aditya on 10/24/2016.
 */

'use strict';

var _ = require('lodash');
var moment = require('moment');
var Highcharts = require('highcharts/highstock');

module.exports = ['portfolioService','$stateParams','dataService',
    function(portfolioService,$stateParams,dataService) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/portfolio/return-analysis.html',
            link: function ($scope) {
                // return and risk analysis
                var portfolioId = $stateParams.portfolioId;
                portfolioService.getPortfolioReturnStats(portfolioId).then(function(res) {
                    $scope.returnStats = _.mapKeys(res,function(val,key) {
                        return _.startCase(key);
                    });
                });

                var defaultChartOptions = {
                    rangeSelector: {
                        selected: 1
                    },
                    yAxis: {
                        plotLines: [{
                            color: 'black',
                            width: 2,
                            value: 0
                        }]
                    }
                };
                // nav chart
                var navChartOptions = angular.copy(defaultChartOptions);
                _.set(navChartOptions,'chart.renderTo','portfolio-nav-chart');
                var navChart = new Highcharts.StockChart(navChartOptions);

                portfolioService.getPortfolioNAV(portfolioId).then(function(res) {
                    navChart.addSeries({
                        name: 'Portfolio NAV',
                        data: dataService.curveDataForChart(res),
                        tooltip: {
                            valueDecimals: 2,
                            xDateFormat: '%e %b %Y'
                        }
                    })
                });

                // returns chart
                var returnChartOptions = angular.copy(defaultChartOptions);
                _.set(returnChartOptions,'chart.renderTo','portfolio-return-chart');
                var returnChart = new Highcharts.StockChart(returnChartOptions);

                $scope.periods = {
                    'Daily': '1D',
                    'Monthly': '1M',
                    'Yearly': '1Y'
                };
                $scope.chosenPeriod = '1M';
                $scope.changePeriod = function() {
                    while(returnChart.series.length) {
                        returnChart.series[0].remove(false);
                    }
                    returnChart.colorCounter = 0;
                    returnChart.symbolCounter = 0;
                    portfolioService.getPortfolioReturn(portfolioId,$scope.chosenPeriod).then(function (res) {
                        returnChart.addSeries({
                            name: 'Portfolio Returns',
                            data: _.map(dataService.curveDataForChart(res),function(val) {
                                return [val[0], val[1]*100];
                            }),
                            tooltip: {
                                valueDecimals: 2,
                                valueSuffix: '%',
                                xDateFormat: '%e %b %Y'
                            }
                        })
                    });
                };
                $scope.changePeriod();
            }
        }
    }
];