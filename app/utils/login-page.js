/**
 * Created by Aditya on 6/29/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['clientService','$state',
    function(clientService,$state) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/utils/login-page.html',
            link: function ($scope) {
                // we can add encryption, authentication and login timeouts here
                $scope.loginMode = true;
                $scope.loggedIn = clientService.isLoggedIn();
                $scope.clientName = clientService.getClientName();

                $scope.loginToClient = function () {
                    // check if we get any client portfolios after which go to client page
                    // this is a proxy for "authentication" right now
                    clientService.getClientPortfolios($scope.clientName,true).then(function (portfolioList) {
                        if (portfolioList) {
                            $scope.invalidClient = false;
                            clientService.setLoggedInClient($scope.clientName);
                            // change this to client overview once ready
                            $state.go('portfolio.overview', {
                                portfolioId: portfolioList[0].portfolioId
                            });
                        } else {
                            $scope.invalidClient = true;
                        }
                    }, function() {
                        $scope.invalidClient = true;
                    })
                };

                // if already logged in, client name will be set, so redirect
                if(clientService.isLoggedIn()) {
                    $scope.loginToClient($scope.clientName);
                }
            }
        }
    }
];