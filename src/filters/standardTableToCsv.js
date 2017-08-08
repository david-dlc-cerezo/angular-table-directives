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

            // 2. Export only the columns on column definition
            var outputTable = [];
            if (columnsDefinition){
                angular.forEach(filteredTable, function(row) {
                    var newRow = {};
                    angular.forEach(columnsDefinition, function(column) {
                        newRow[column.field] = _getValue(row, column.field);
                    });
                    outputTable.push(newRow);
                });
            } else {
                outputTable = filteredTable;
            }

            return outputTable;
        };
    }

    function _getValue(row, field){
        if (angular.isObject(row) && angular.isString(field)) {
            var dotIndex = field.indexOf('.');
            if (dotIndex !== -1) {
                return _getValue(row[field.substr(0, dotIndex)], field.substr(dotIndex + 1));
            } else {
                // If the result is a fuction -> run it
                return angular.isFunction(row[field]) ? row[field]() : row[field];
            }
        } else {
            return '';
        }
    }
})();
