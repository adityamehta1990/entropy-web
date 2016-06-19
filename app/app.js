'use strict';

var $ = require('jquery'); // jquery must be loaded before angular to use angular wrappers
var angular = require('angular');
require('angular-animate');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('./funds/funds');
require('./utils/utils');
require('../dist/js/templateCache.js');

// Declare app level module
// inject dependencies including controllers, directives and services
var app = angular.module('myCio', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'myCio.funds',
    'myCio.utils',
    'myCio.templates' // this gets populated from templateCache set by gulp
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
