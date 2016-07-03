/**
 * Created by Aditya on 6/29/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['portfolioService','fundService','$stateParams','$state',
    function(portfolioService,fundService,$stateParams,$state) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/utils/navigator.html',
            link: function ($scope) {

                $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams) {
                    $scope.isFundState = _.includes(toState.name,'fund');
                    if(_.includes(toState.name,'fund')) {
                        fundService.getAllFunds().then(function(res) {
                            $scope.fundList = res;
                        })
                    }

                    if(_.has(toParams,'clientName')) {
                        var clientName = toParams.clientName;
                        portfolioService.getClientPortfolios(clientName).then(function(res) {
                            $scope.clientPortfolios = res;
                        });
                    }
                });

                $scope.goToFund = function() {
                    var schemeCode = $scope.selectedScheme.schemeCode;
                    $scope.selectedScheme = null;
                    $state.go('funds.detail',{schemeCode: schemeCode});
                };
            }
        }
    }
];