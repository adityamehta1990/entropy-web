/**
 * Created by Aditya on 5/29/2016.
 */
'use strict';

var _ = require('lodash');
var moment = require('moment');

// A RESTful factory for retrieving fund data
module.exports = ['$http','dataService',
    function($http,dataService) {
        var factory = {};
        var latestFundListPromise = null;

        factory.getAllFunds = function (navDate) {
            if(navDate) {
                return dataService.getData('fund-data/schemes/' + moment(navDate).format('YYYY-MM-DD'));
            }
            if(!latestFundListPromise) {
                latestFundListPromise = dataService.getData('fund-data/schemes');
            }
            return latestFundListPromise;
        };

        factory.getFundData = function(schemeCode) {
            return dataService.getData('fund-data/scheme/' + schemeCode);
        };

        factory.getFundNAV = function(schemeCode) {
            return dataService.getData('fund-data/nav/' + schemeCode, true);
        };

        factory.getFundReturn = function(schemeCode,period) {
            return dataService.getData(_.join(['fund-data/return',schemeCode,period],'/'),true);
        };

        return factory;
    }
];
