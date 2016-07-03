/**
 * Created by Aditya on 6/29/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['portfolioService','$state',
    function(portfolioService,$state) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/utils/login-page.html',
            link: function ($scope) {
                // we can add encryption and authentication here
                $scope.clientName = null;
                $scope.loginMode = true;
                $scope.loggedIn = false;

                $scope.loginToClient = function () {
                    // check if we get any client portfolios after which go to client page
                    // this is a proxy for "authentication" right now
                    portfolioService.getClientPortfolios($scope.clientName).then(function (portfolioList) {
                        if (portfolioList) {
                            $scope.invalidClient = false;
                            $scope.loggedIn = true;
                            $state.go('portfolio.overview', {
                                portfolioId: portfolioList[0].portfolioId
                            });
                        } else {
                            $scope.invalidClient = true;
                        }
                    }, function() {
                        $scope.invalidClient = true;
                    })
                }
            }
        }
    }
];