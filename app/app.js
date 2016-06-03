'use strict';

var angular = require('angular');
require('angular-animate');
require('angular-ui-router');
require('angular-bootstrap');
require('./funds/funds');

// Declare app level module
// inject dependencies including controllers, directives and services
var app = angular.module('myCio', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'myCio.funds'
]);

app.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url: '/',
                template: '<div>Landing Page</div>'
            });
    }
]);
