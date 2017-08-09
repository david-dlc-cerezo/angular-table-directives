(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('standardTableFilterField', standardTableFilterFieldDirective);
    };

    function standardTableFilterFieldDirective() {
        return {
            restrict: 'E',
            scope: {
                filterData: '=filter',
            },
            templateUrl: '/src/standardTable/filter-field.html',
            controller: [
                '$scope',
                StandardTableFilterFieldController
            ],
            controllerAs: 'vm'
        };
    }

    function StandardTableFilterFieldController($scope) {
        if (!$scope.filterData) {
            $scope.filterData = {
                textFilter: ''
            };
        } else if (angular.isString($scope.filterData)) {
            $scope.filterData = {
                textFilter: $scope.filterData
            };
        }
    }
})();
