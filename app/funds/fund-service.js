/**
 * Created by Aditya on 5/29/2016.
 */
'use strict';

// A RESTful factory for retrieving fund data
module.exports = ['$http',
    function($http) {
        var factory = {};
        var path = 'http://' + window.location.hostname + ':8081/';

        var funds = $http.get(path + 'fund-data/schemes').then(function(res) {
            return res.data;
        });

        factory.getAllFunds = function () {
            return funds;
        };

        factory.getFundData = function(schemeCode) {
            return $http.get(path + 'fund-data/scheme/' + schemeCode).then(function(res) {
                return res.data;
            })
        };

        factory.getFundNAV = function(schemeCode) {
            return $http.get(path + 'fund-data/returns/' + schemeCode).then(function(res) {
                return res.data;
            })
        };

        return factory;
    }
];
