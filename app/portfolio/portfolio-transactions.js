/**
 * Created by Aditya on 6/26/2016.
 */
'use strict';

var _ = require('lodash');
var moment = require('moment');

module.exports = ['portfolioService','fundService','$stateParams',
    function(portfolioService,fundService,$stateParams) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/portfolio/portfolio-transactions.html',
            link: function ($scope) {
                var portfolioId = $stateParams.portfolioId;
                $scope.showNewTransactionRow = false;
                $scope.newTxn = {};
                $scope.openDatePicker = false;

                $scope.getFundsForDate = function(navDate) {
                    $scope.newTxn.date = moment(navDate).format();
                    $scope.fundList = [];
                    fundService.getAllFunds(navDate).then(function (res) {
                        $scope.fundList = res;
                    });
                };

                $scope.getSelectedSchemeNAV = function() {
                    fundService.getFundNAV($scope.selectedScheme.schemeCode).then(function(navData) {
                        var idx = _.indexOf(navData.dates,$scope.newTxn.date);
                        $scope.newTxn.price = navData.values[idx];
                    })
                };

                $scope.reloadTransactionList = function() {
                    portfolioService.getPortfolioTransactions(portfolioId).then(function (res) {
                        $scope.transactionList = res;
                    });
                };

                $scope.clearNewTransaction = function() {
                    $scope.showNewTransactionRow = false;
                    $scope.newTxn = {};
                    $scope.selectedScheme = null;
                };

                $scope.addTransaction = function() {
                    $scope.newTxn.schemeCode = $scope.selectedScheme.schemeCode;
                    $scope.newTxn.schemeName = $scope.selectedScheme.schemeName;
                    $scope.newTxn.quantity = $scope.newTxn.cashflow / $scope.newTxn.price;
                    portfolioService.addNewTransactionToPortfolio(portfolioId,$scope.newTxn).then(function() {
                        $scope.clearNewTransaction();
                        $scope.reloadTransactionList();
                    });
                };

                $scope.deleteTransaction = function(txnId) {
                    portfolioService.deleteTransactionFromPortfolio(portfolioId,txnId).then(function() {
                        $scope.reloadTransactionList();
                    });
                };

                // initialize transactions
                $scope.reloadTransactionList();
            }
        }
    }
];