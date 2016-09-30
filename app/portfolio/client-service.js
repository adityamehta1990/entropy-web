/**
 * Created by Aditya on 7/4/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['dataService','$q',
    function(dataService,$q) {
        var factory = {};
        var _clientName = null;
        var _portfolioList = [];
        var _loggedIn = false;

        factory.setLoggedInClient = function(clientName) {
            _clientName = clientName;
            _loggedIn = true;
        };

        factory.isLoggedIn = function() {
            return _loggedIn;
        };

        factory.getClientName = function() {
            return _clientName;
        };

        var _portfolioListPromise = null;
        factory.getClientPortfolios = function (clientName,refresh) {
            if(!_portfolioListPromise || refresh) {
                _portfolioListPromise = dataService.getData('portfolio-data/client/' + clientName).then(function (res) {
                    _portfolioList = res;
                    return res;
                }, function () {
                    return [];
                });
            }
            return _portfolioListPromise;
        };

        factory.createNewPortfolio = function(portfolio) {
            return dataService.postData(_.join(['portfolio-data','new'],'/'),portfolio);
        };

        return factory;
    }
];