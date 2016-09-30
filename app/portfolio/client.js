/**
 * Created by Aditya on 7/5/2016.
 */
'use strict';

require('angular-ui-router');
var angular = require('angular');

var app = angular.module('myCio.client',['ui.router']);
app.factory('clientService', require('./client-service'));

// setup routes within the fund state
app.config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider) {

            $urlRouterProvider.when('/client/','/home');

            $stateProvider
                .state('client', {
                    abstract: true,
                    url: '/client/:clientName',
                    templateUrl: '/templates/portfolio/client.html'
                })
                .state('client.overview', {
                    url: '',
                    template: 'Show portfolio list and summary here'
                });
        }
    ]
);

module.exports = app;