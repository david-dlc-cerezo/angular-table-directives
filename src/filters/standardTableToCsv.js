(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.filter('standartTableToCsv', [
            '$filter',
            standartTableToCsvFilter
        ]);
    };

    /**
     * Convert a Standard table data into a CSV
     */
    function standartTableToCsvFilter($filter) {
        /**
         * Filter function
         * @param  {Array}  table             Table to convert
         * @param  {Object} columnsDefinition Column definition
         * @param  {Object} filter            Filter object to apply
         * @return {Array}                    Filtered table
         */
        return function(table, columnsDefinition, filter) {

            // 1. Apply filter (if defined)
            var filteredTable = [];
            if (table && filter) {
                filteredTable = $filter('filterStandartTable')(table, filter, columnsDefinition);
            } else {
                filteredTable = table;
            }

            // 2. Show only the columns on column definition
            var outputTable = [];
            if (columnsDefinition){
                angular.forEach(filteredTable, function(row) {
                    var newRow = {};
                    angular.forEach(columnsDefinition, function(column) {
                        newRow[column.fieldName] = angular.isFunction(row[column.fieldName]) ? row[column.fieldName]() : row[column.fieldName];
                    });
                    outputTable.push(newRow);
                });
            } else {
                outputTable = filteredTable;
            }

            return outputTable;
        };
    }
})();
