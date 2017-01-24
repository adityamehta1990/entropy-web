/**
 * Created by Aditya on 6/5/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['$state','fundService',
    function($state,fundService) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/templates/funds/fund-selector.html',
            link: function ($scope) {
                var fundList = [];

                $scope.filterFundList = function () {
                    if ($scope.selectedFundType === '') {
                        $scope.filteredList = fundList;
                    } else {
                        $scope.filteredList = _.filter(fundList, {fundType: $scope.selectedFundType});
                    }
                    $scope.fundHouses = _.uniq(_.map($scope.filteredList, 'fundHouse'));
                    if(!_.includes($scope.fundHouses, $scope.selectedFundHouse)) {
                        // if the already selected fund is not under selectedFundType, reset it to any
                        $scope.selectedFundHouse = '';
                    }
                    if($scope.selectedFundHouse) {
                        // otherwise filter by selected fundHouse
                        $scope.filteredList = _.filter($scope.filteredList, {
                            fundType: $scope.selectedFundType,
                            fundHouse: $scope.selectedFundHouse
                        })
                    }
                };

                $scope.goToFund = function() {
                    $state.go('funds.detail',{_id: $scope.selectedFund._id});
                };

                // initialize the filter
                fundService.getAllFunds().then(function(res) {
                    fundList = res;
                    $scope.filteredList = fundList;
                    $scope.fundTypes = _.uniq(_.map(fundList, 'fundType'));
                    $scope.selectedFundType = '';
                    $scope.selectedFundHouse = '';

                    $scope.filterFundList();
                });
            }
        }
    }
];