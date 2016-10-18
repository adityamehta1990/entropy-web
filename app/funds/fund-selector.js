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
                    if ($scope.selectedSchemeType === '') {
                        $scope.filteredList = fundList;
                    } else {
                        $scope.filteredList = _.filter(fundList, {schemeType: $scope.selectedSchemeType});
                    }
                    $scope.managerNames = _.uniq(_.map($scope.filteredList, 'managerName'));
                    if(!_.includes($scope.managerNames, $scope.selectedManagerName)) {
                        // if the already selected fund is not under selectedSchemeType, reset it to any
                        $scope.selectedManagerName = '';
                    }
                    if($scope.selectedManagerName) {
                        // otherwise filter by selected managerName
                        $scope.filteredList = _.filter($scope.filteredList, {
                            schemeType: $scope.selectedSchemeType,
                            managerName: $scope.selectedManagerName
                        })
                    }
                };

                $scope.goToFund = function() {
                    $state.go('funds.detail',{schemeCode: $scope.selectedScheme.schemeCode});
                };

                // initialize the filter
                fundService.getAllFunds().then(function(res) {
                    fundList = res;
                    $scope.filteredList = fundList;
                    $scope.schemeTypes = _.uniq(_.map(fundList, 'schemeType'));
                    $scope.selectedSchemeType = '';
                    $scope.selectedManagerName = '';

                    $scope.filterFundList();
                });
            }
        }
    }
];