/**
 * Created by Aditya on 6/23/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['$http','dataService',
    function($http,dataService) {
        var factory = {};

        factory.getPortfolioMetaData = function(portfolioId) {
            return dataService.getData(_.join(['portfolio-data',portfolioId,'metadata'],'/'));
        };

        factory.getPortfolioTransactions = function(portfolioId) {
            return dataService.getData(_.join(['portfolio-data',portfolioId,'transactions'],'/'));
        };

        factory.addNewTransactionToPortfolio = function(portfolioId,transaction) {
            return dataService.postData(_.join(['portfolio-data',portfolioId,'transaction/new'],'/'),transaction);
        };

        factory.updateTransactionInPortfolio = function(portfolioId,transactionId,transaction) {
            return dataService.putData(_.join(['portfolio-data',portfolioId,'transaction',transactionId],'/'),transaction);
        };

        factory.deleteTransactionFromPortfolio = function(portfolioId,transactionId) {
            return dataService.deleteData(_.join(['portfolio-data',portfolioId,'transaction',transactionId],'/'));
        };

        factory.getPortfolioNAV = function(portfolioId) {
            return dataService.getData(_.join(['portfolio-data',portfolioId,'nav'],'/'), true);
        };

        factory.getPortfolioReturn = function(portfolioId,period) {
            return dataService.getData(_.join(['portfolio-data',portfolioId,'return',period],'/'),true);
        };

        return factory;
    }
];
