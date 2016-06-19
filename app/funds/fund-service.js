/**
 * Created by Aditya on 5/29/2016.
 */
'use strict';

var _ = require('lodash');

// A RESTful factory for retrieving fund data
module.exports = ['$http','dataService',
    function($http,dataService) {
        var factory = {};

        var funds = dataService.getData('fund-data/schemes');

        factory.getAllFunds = function () {
            return funds;
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
