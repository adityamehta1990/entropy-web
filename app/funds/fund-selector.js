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
                $scope.selectedManagerName = '';

                $scope.filterFundList = function () {
                    if ($scope.selectedSchemeType === '') {
                        $scope.filteredList = $scope.fundList;
                    } else {
                        $scope.filteredList = _.filter($scope.fundList, {schemeType: $scope.selectedSchemeType});
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
                $scope.filterFundList();
            }
        }
    }
];