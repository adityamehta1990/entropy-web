/**
 * Created by Aditya on 5/29/2016.
 */

require('angular-ui-router');
var angular = require('angular');

var app = angular.module('myCio.funds',['ui.router']);
app.factory('fundService', require('./fund-service'));
app.directive('fundSelector', require('./fund-selector'));
app.directive('fundDetail', require('./fund-detail'));

// setup routes within the fund state
app.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('funds', {
                abstract: true,
                url: '/funds',
                template: '<div ui-view></div>',
                resolve: {
                    fundList: ['fundService',
                        function(fundService){
                            return fundService.getAllFunds();
                        }]
                },
                controller: ['$scope','fundList',
                    function($scope,fundList) {
                        $scope.fundList = fundList;
                    }]
            })
            // since this is a child state, it inherits scope from the above abstract state
            // which we can directly use inside the directive!
            .state('funds.selector', {
                url: '',
                template: '<fund-selector fund-list="fundList"></fund-selector>'
            })
            .state('funds.detail', {
                url: '/:schemeCode',
                template: '<fund-detail></fund-detail>'
            });
        }
    ]
);

module.exports = app;