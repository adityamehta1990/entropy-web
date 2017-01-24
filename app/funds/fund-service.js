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
                return dataService.getData('fund-data/funds/' + moment(navDate).format('YYYY-MM-DD'));
            }
            if(!latestFundListPromise) {
                latestFundListPromise = dataService.getData('fund-data/funds');
            }
            return latestFundListPromise;
        };

        factory.getFundData = function(_id) {
            return dataService.getData('fund-data/fund/' + _id);
        };

        factory.getFundNAV = function(_id) {
            return dataService.getData('fund-data/nav/' + _id, true);
        };

        factory.getFundReturn = function(_id,period) {
            return dataService.getData(_.join(['fund-data/return',_id,period],'/'),true);
        };

        return factory;
    }
];
