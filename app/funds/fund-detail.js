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
                // setup the highcharts options
                var chartOptions = {
                    chart: {
                        renderTo: 'nav-chart-container'
                    },
                    rangeSelector: {
                        selected: 1
                    }
                };

                var navChart = new Highcharts.StockChart(chartOptions);

                fundService.getFundData(schemeCode).then(function(res) {
                    $scope.fundData = _.mapKeys(res,function(val,key) {
                        return _.startCase(key);
                    });
                    navChart.setTitle({text: res.schemeName});
                });

                fundService.getFundNAV(schemeCode).then(function(res) {
                    var fundNavData = res;
                    var navToPlot = [];
                    // we need to format the data to show on highstocks
                    _.map(fundNavData.navDates,function(val,idx) {
                        navToPlot.push([ moment(val).valueOf(),parseFloat(fundNavData.nav[idx]) ]);
                    });

                    navChart.addSeries({
                        name: 'Fund NAV',
                        data: navToPlot,
                        tooltip: {
                            valueDecimals: 2
                        }
                    })
                });
            }
        }
    }
];