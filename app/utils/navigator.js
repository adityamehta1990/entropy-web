/**
 * Created by Aditya on 6/29/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['clientService','fundService','$stateParams','$state',
    function(clientService,fundService,$stateParams,$state) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/utils/navigator.html',
            link: function ($scope) {

                $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams) {
                    $scope.isFundState = _.includes(toState.name,'fund');
                    if($scope.isFundState) {
                        fundService.getAllFunds().then(function(res) {
                            $scope.fundList = res;
                        })
                    }

                    $scope.isLoggedIn = clientService.isLoggedIn();
                    if($scope.isLoggedIn) {
                        clientService.getClientPortfolios(clientService.getClientName()).then(function(res) {
                            $scope.clientPortfolios = res;
                        });
                    } else {
                        $state.go('home');
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