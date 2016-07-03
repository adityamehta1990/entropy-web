/**
 * Created by Aditya on 6/26/2016.
 */
'use strict';

var _ = require('lodash');
var moment = require('moment');

module.exports = ['portfolioService','$stateParams',
    function(portfolioService,$stateParams) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/portfolio/portfolio-transactions.html',
            link: function ($scope) {
                var portfolioId = $stateParams.portfolioId;
                $scope.showNewTransactionRow = false;
                $scope.newTxn = {};

                $scope.reloadTransactionList = function() {
                    portfolioService.getPortfolioTransactions(portfolioId).then(function (res) {
                        $scope.transactionList = res;
                    });
                };

                $scope.clearNewTransaction = function() {
                    $scope.showNewTransactionRow = false;
                    $scope.newTxn = {}
                };

                $scope.addTransaction = function() {
                    portfolioService.addNewTransactionToPortfolio(portfolioId,$scope.newTxn);
                    $scope.newTxn = {};
                    $scope.reloadTransactionList();
                };

                $scope.deleteTransaction = function(txnId) {
                    portfolioService.deleteTransactionFromPortfolio(portfolioId,txnId);
                    $scope.reloadTransactionList();
                };

                // initialize transactions
                $scope.reloadTransactionList();
            }
        }
    }
];