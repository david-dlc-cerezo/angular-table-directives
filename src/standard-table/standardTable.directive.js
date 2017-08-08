(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('standardTable', standardTableDirective);
    };

    /**
     * Standard Table Directive
     * @return {Object} Directive configuration object for <standard-table> directive
     */
    function standardTableDirective() {
        return {
            restrict: 'E',
            transclude: {
                'buttons': '?standardTableButtons'
            },
            scope: {
                tableData: '=',
                columns: '=',
                actions: '=?',
                admin: '=?',
                showFilter: '=?',
                filterData: '=?filter',
                disableOrder: '=?',
                sort: '=?',
                notFound: '=?',
                showExport: '=?'
            },
            templateUrl: '/src/standard-table/standard-table.html',
            controller: [
                '$scope',
                '$filter',
                'StandardTableUtilities',
                StandardTableController
            ],
            controllerAs: 'vm'
        };
    }

    function StandardTableController($scope, $filter, StandardTableUtilities) {
        var vm = this;

        $scope.filterData = $scope.filterData || {};
        $scope.showExport = ($scope.showExport === undefined) ? true : $scope.showExport;
        $scope.sort = angular.extend({
            field: '',
            reverse: false
        }, $scope.sort);


        angular.extend(vm, {

            /**
             * Change sort order to the given 'fildName'
             * @param  {Object} column Selected column for new ordering
             */
            changeOrder(column) {
                // If is the active sort => reverse order
                if (vm.isActiveSort(column)) {
                    $scope.sort.reverse = !$scope.sort.reverse;
                }
                // Change the sorting field to column.field on ascending order
                else {
                    $scope.sort.field = column.field;
                    $scope.sort.reverse = false;
                }
            },

            /**
             * Get the classes to show if the current field is ordered on ascending or descending mode
             * @param  {Object} column Column to check
             * @return {String}        Class or classes for showing the ordenation mode
             */
            chevronClassesFor(column) {
                return (vm.isActiveSort(column)) ?
                    ($scope.sort.reverse ? 'fa fa-fw fa-sort-desc' : 'fa fa-fw fa-sort-asc') :
                    '';
            },

            /**
             * Get the value for the order row
             * @param  {Object} row     Row Data
             * @param  {Object} columns Columns config
             * @return {String}         Value to display
             */
            getOrderValue(row) {
                return angular.isFunction(row[$scope.sort.field]) ? row[$scope.sort.field]() : row[$scope.sort.field];
            },

            /**
             * Get a colection with unique values for the column
             * @param  {Object} column Column config
             * @return {String[]}      Array
             */
            getUniqueColumnValues(column) {
                var uniqueColumnValues = [];

                angular.forEach($scope.tableData, row => {
                    var newValue = this.getValue(row, column.field);
                    if (uniqueColumnValues.indexOf(newValue) === -1) {
                        uniqueColumnValues.push(newValue);
                    }
                });

                // Order alphabetichaly;
                uniqueColumnValues.sort();

                return uniqueColumnValues;
            },

            /**
             * Get the class set for a row and columb
             * @param  {Object} row    Row Data
             * @param  {Object} column Column config
             * @return {String}        Class value to display
             */
            getClass(row, column) {
                var classes = '';
                classes += column.class || '';
                classes += this.getValue(row, column.ngClass);
                classes += angular.isFunction(column.onClick) ? ' clickable' : '';
                return classes;
            },

            /**
             * Get the value to show for a row and a field name
             * @param  {Object} row   Data onject for the row
             * @param  {String} field Field name to show
             * @return {String}       Value to show
             */
            getValue(row, field) {
                return StandardTableUtilities.getValue(row, field);
            },
            
            /**
             * Is field the current sorting field?
             * @param  {Object}  column Column to check
             * @return {Boolean}        TRUE = Yes, it is; FALSE = No, it's not
             */
            isActiveSort(column) {
                return (column.field === $scope.sort.field);
            },

            isThereColumnsWithFilter: function() {
                var columsWithFilter = $filter('filter')($scope.columns, function(column) {
                    return (!angular.isUndefined(column.filter));
                });
                return (angular.isArray(columsWithFilter) && columsWithFilter.length > 0);
            },

            /**
             * Is there data to show?
             * @return {Boolean} TRUE if the tableData from the scope is empty or has 0 items, otherwise FALSE
             */
            noData() {
                return (!$scope.tableData || !$scope.tableData.length);
            }
        });

        // Order by first column
        if (!$scope.disableOrder) {
            vm.changeOrder($scope.columns[0]);
        }
    }

})();
