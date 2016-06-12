/**
 * Created by Aditya on 6/5/2016.
 */
'use strict';

var _ = require('lodash');

module.exports = ['$state',
    function($state) {
        return {
            restrict: 'E',
            scope: {
                fundList: '='
            },
            templateUrl: '/templates/funds/fund-selector.html',
            link: function ($scope) {
                $scope.filteredList = $scope.fundList;
                $scope.schemeTypes = _.uniq(_.map($scope.fundList, 'schemeType'));
                $scope.selectedSchemeType = '';
                $scope.selectedFundName = '';

                $scope.filterFundList = function () {
                    if ($scope.selectedSchemeType === '') {
                        $scope.filteredList = $scope.fundList;
                    } else {
                        $scope.filteredList = _.filter($scope.fundList, {schemeType: $scope.selectedSchemeType});
                    }
                    $scope.fundNames = _.uniq(_.map($scope.filteredList, 'fundName'));
                    if(!_.includes($scope.fundNames, $scope.selectedFundName)) {
                        // if the already selected fund is not under selectedSchemeType, reset it to any
                        $scope.selectedFundName = '';
                    }
                    if($scope.selectedFundName) {
                        // otherwise filter by selected fundName
                        $scope.filteredList = _.filter($scope.filteredList, {
                            schemeType: $scope.selectedSchemeType,
                            fundName: $scope.selectedFundName
                        })
                    }
                };

                $scope.goToFund = function() {
                    $state.go('funds.detail',{schemeCode: $scope.selectedScheme.schemeCode});
                };

                // initialize the filter
                $scope.filterFundList();
            }
        }
    }
];