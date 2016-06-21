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

        factory.getData = function(url,isCurve) {
            return $http.get(path + url).then( function(res) {
                var data = res.data.data;

                if(isCurve) {
                    var curveData = [];
                    _.map(data.dates, function (val,idx) {
                        curveData.push([moment.utc(val).valueOf(), parseFloat(data.values[idx])]);
                    });
                    return curveData;
                } else {
                    return data;
                }
            });
        };

        return factory;
    }
];
