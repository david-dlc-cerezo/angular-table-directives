(function() {
    'use strict';

    const path = require('path');

    module.exports = function(ngModule) {
        ngModule.directive('groupTables', groupTablesDirective);
    };

    /**
     * Group Table Directive
     * @return {Object} Directive configuration object for <group-table> directive
     */
    function groupTablesDirective() {
        return {
            restrict: 'E',
            transclude: {
                'buttons': '?groupTableButtons'
            },
            scope: {
                tableData: '=',
                groupByField: '@',
                columns: '=',
                groupByLabelText: '@?',
                groupByLabelValue: '@?',
                reloadEvent: '=?',
                actions: '=?',
                admin: '=?',
                showFilter: '=?',
                filterData: '=?filter',
                disableOrder: '=?',
                sort: '=?',
                notFound: '=?',
                showExport: '=?'
            },
            templateUrl: path.resolve(__dirname, 'src/groupTables/group-tables.html'),
            controller: [
                '$scope',
                GroupTablesCtrl
            ],
            controllerAs: 'vm'
        };
    }

    function GroupTablesCtrl($scope) {
        var vm = this;

        $scope.filterData = $scope.filterData || {};

        // Before continue check if 'tableData' and 'groupBy' are defined
        if (!$scope.groupByField) {
            console.error('GroupTables: groupByField not defined', $scope.groupByField);
        }

        $scope.showExport = ($scope.showExport === undefined) ? true : $scope.showExport;

        /**
         * Obtain the value to show as header of the group
         * @param  {String} groupValue [description]
         * @param  {Object} groupData  [description]
         * @return {String}            Value to show as a header of the group
         */
        vm.getGroupByValue = function(groupValue, groupData) {
            var value;
            if ($scope.groupByLabelValue) {
                value = groupData[0][$scope.groupByLabelValue];
                if (angular.isFunction(value)) {
                    value = groupData[0][$scope.groupByLabelValue]();
                }
            } else {
                value = groupValue;
            }
            return value;
        };
    }
})();
