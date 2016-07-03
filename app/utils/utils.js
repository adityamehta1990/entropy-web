/**
 * Created by Aditya on 6/19/2016.
 */
var angular = require('angular');

// we can add any general utility services here
var app = angular.module('myCio.utils',[]);
app.factory('dataService', require('./data-service'));
app.directive('navigator', require('./navigator'));
app.directive('loginPage',require('./login-page'));
