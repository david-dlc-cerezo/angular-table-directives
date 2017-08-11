(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('dynamicTable', dynamicTableDirective);
    };

    /**
     * Dynamic Table Directive
     * @return {Object} Directive configuration object for <dynamic-table> directive
     */
    function dynamicTableDirective() {
        return {
            restrict: 'E',
            scope: {
                loadDataFn: '=',
                reloadEvent: '=?',
                columns: '=',
                actions: '=?',
                admin: '=?',
                showFilter: '=?',
                filterData: '=?filter',
                disableOrder: '=?',
                sort: '=?',
                groupBy: '=?',
                notFound: '=?',
                showExport: '=?'
            },
            template: require('html-loader!./dynamic-table.html'),
            controller: [
                '$scope',
                DynamicTableCtrl
            ],
            controllerAs: 'vm'
        };
    }

    function DynamicTableCtrl($scope) {
        var vm = this;

        $scope.filterData = $scope.filterData || {};

        // Before continue check if 'loadDataFn' is a function
        if (!angular.isFunction($scope.loadDataFn)) {
            console.error('DynamicTable: loadDataFn is not a function', $scope.loadDataFn);
        } else {
            /**
             * Runs the function to load the data
             */
            vm.loadData = function() {
                vm.loadingData = true;
                $scope.loadDataFn()
                    .then(function(newTableData) {
                        vm.tableData = newTableData;
                    })
                    .catch(function() {
                        vm.tableData = [];
                    })
                    .finally(function() {
                        vm.loadingData = false;
                    });
            };

            // Load 1st time
            // vm.loadData();

            // Watch for changes
            $scope.$watch('loadDataFn', vm.loadData);

            // Reload data on event
            if ($scope.reloadEvent) {
                $scope.$on($scope.reloadEvent, function() {
                    vm.loadData();
                });
            }
        }
    }
})();
