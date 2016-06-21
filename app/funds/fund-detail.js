/**
 * Created by Aditya on 6/12/2016.
 */
'use strict';

var _ = require('lodash');
var moment = require('moment');
var Highcharts = require('highcharts/highstock');

module.exports = ['fundService','$stateParams',
    function(fundService,$stateParams) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/funds/fund-detail.html',
            link: function ($scope) {
                var schemeCode = $stateParams.schemeCode;
                // meta data
                fundService.getFundData(schemeCode).then(function(res) {
                    $scope.fundData = _.mapKeys(res,function(val,key) {
                        return _.startCase(key);
                    });
                });

                // nav chart
                var navChartOptions = {
                    chart: {
                        renderTo: 'nav-chart-container'
                    },
                    rangeSelector: {
                        selected: 1
                    }
                };
                var navChart = new Highcharts.StockChart(navChartOptions);

                fundService.getFundNAV(schemeCode).then(function(res) {
                    navChart.addSeries({
                        name: 'Fund NAV',
                        data: res,
                        tooltip: {
                            valueDecimals: 2,
                            xDateFormat: '%e %b %Y'
                        }
                    })
                });

                // returns chart
                var returnChartOptions = {
                    chart: {
                        renderTo: 'return-chart-container'
                    },
                    rangeSelector: {
                        selected: 1
                    }
                };
                var returnChart = new Highcharts.StockChart(returnChartOptions);

                $scope.periods = {
                    'Daily': '1d',
                    'Monthly': '1m',
                    'Yearly': '1y'
                };
                $scope.chosenPeriod = '1m';
                $scope.changePeriod = function() {
                    while(returnChart.series.length) {
                        returnChart.series[0].remove(false);
                    }
                    returnChart.colorCounter = 0;
                    returnChart.symbolCounter = 0;
                    fundService.getFundReturn(schemeCode,$scope.chosenPeriod).then(function (res) {
                        returnChart.addSeries({
                            name: 'Fund Returns',
                            data: _.map(res,function(val) {
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