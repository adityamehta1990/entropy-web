/**
 * Created by Aditya on 6/22/2016.
 */

require('angular-ui-router');
var angular = require('angular');

var app = angular.module('myCio.portfolio',['ui.router']);
app.factory('portfolioService', require('./portfolio-service'));
app.directive('portfolioTransactions', require('./portfolio-transactions'));
app.directive('returnAnalysis', require('./return-analysis'));

// setup routes within the fund state
app.config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider) {

            $urlRouterProvider.when('/portfolio/','/home');

            $stateProvider
                .state('portfolio', {
                    abstract: true,
                    url: '/portfolio/:portfolioId',
                    templateUrl: '/templates/portfolio/portfolio.html'
                })
                // since this is a child state, it inherits scope from the above abstract state
                // which we can directly use inside the directive!
                .state('portfolio.overview', {
                    url: '',
                    template: 'Add this'
                })
                .state('portfolio.transactions', {
                    url: '/transactions',
                    template: '<portfolio-transactions></portfolio-transactions>'
                })
                .state('portfolio.analysis', {
                    url: '/analysis',
                    template: '<return-analysis></return-analysis>'
                });
        }
    ]
);

module.exports = app;