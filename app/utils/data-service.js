/**
 * Created by Aditya on 6/19/2016.
 */
'use strict';

var _ = require('lodash');
var moment = require('moment');

// A RESTful factory for retrieving fund data
module.exports = ['$http',
    function($http) {
        var factory = {};
        var path = 'http://' + window.location.hostname + ':5000/';

        factory.curveDataForChart = function(data) {
            var curveData = [];
            _.map(data.dates, function (val,idx) {
                curveData.push([moment(val).valueOf(), parseFloat(data.values[idx])]);
            });
            return curveData;
        };

        factory.getData = function(url) {
            return $http.get(path + url).then( function(res) {
                return res.data.data;
            });
        };

        factory.postData = function(url,data) {
            return $http.post(path + url,data).then( function(res) {
                return res.data.data;
            });
        };

        factory.putData = function(url,data) {
            return $http.put(path + url,data).then( function(res) {
                return res.data.data;
            });
        };

        factory.deleteData = function(url) {
            return $http.delete(path + url).then( function(res) {
                return res.data.data;
            });
        };

        return factory;
    }
];
