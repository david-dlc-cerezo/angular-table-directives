(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.filter('filterStandartTable', [
            '$filter',
            'StandardTableUtilities',
            filterStandartTable
        ]);
    };

    /**
     * Does the string contains substring
     * @param  {Mixed}  value     Value to check
     * @param  {String} substring Substring to search
     * @return Boolean            TRUE = yes, FALSE = no
     */
    function contains(value, substring) {
        if (value && substring) {
            var regexp = new RegExp(substring,'gi');
            if(angular.isString(value)){
                return (value.match(regexp) !== null);
            } else if (angular.isNumber(value)){
                return (value.toString().match(regexp) !== null);
            }
        } else {
            return false;
        }
    }

    /**
     * Format Table data as text.
     */
    function filterStandartTable($filter, StandardTableUtilities) {

        /**
         * Is there an active filter for columns?
         * @param  {Object} filter Filter object
         * @return {Boolean}       TRUE = yes, FALSE = no
         */
        function isThereActiveFilterColums(filter) {
            var isThereActiveFilterColums = false;

            for (var columnName in filter.columns) {
                if (filter.columns[columnName]) {
                    isThereActiveFilterColums = true;
                    break;
                }
            }

            return isThereActiveFilterColums;
        }

        /**
         * Filter Row By Text
         * @param  {Object} row               Row to check
         * @param  {String} textFilter        Text to search
         * @param  {Object} columnsDefinition Column definition object
         * @return {Boolean}                  TRUE = pass the filter, FALSE = doesn't pass the filter
         */
        function filterRowByText(row, textFilter, columnsDefinition) {
            for (var i = 0; i < columnsDefinition.length; i++) {
                var value = StandardTableUtilities.getValue(row, columnsDefinition[i].field);
                if (value && textFilter && contains(value, textFilter)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Filter Row By Column Filter
         * @param  {Object} row               Row to check
         * @param  {String} columnFilter      Column filter value
         * @param  {Object} columnsDefinition Column definition object
         * @return {Boolean}                  TRUE = pass the filter, FALSE = does NOT pass the filter
         */
        function filterRowByColumnFilters(row, columnFilter, columnsDefinition) {
            for (var i = 0; i < columnsDefinition.length; i++) {
                var column = columnsDefinition[i];
                var columnFilterValue = columnFilter[column.field];
                if (columnFilterValue) {
                    var value = StandardTableUtilities.getValue(row, column.field);
                    if (!filterValueColumn(value, columnFilterValue, column.filter)) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * Filter Value By Column Filter
         * @param  {String} value          Value to check
         * @param  {String} valueToCompare Value to search
         * @param  {String} filterType     Filter type
         * @return {Boolean}                  TRUE = pass the filter, FALSE = does NOT pass the filter
         */
        function filterValueColumn(value, valueToCompare, filterType) {
            var passFilter;
            if (valueToCompare && filterType) {
                switch (filterType) {
                    case 'select':
                        passFilter = (value === valueToCompare);
                        break;
                        //case 'text':
                    default:
                        passFilter = (value && contains(value, valueToCompare));
                }
            } else {
                passFilter = true;
            }
            return passFilter;
        }


        /**
         * Filter function
         * @param  {Array}  table             Table to filter
         * @param  {Object} filter            Filter object
         * @param  {Object} columnsDefinition Column definition
         * @return {Array}                    Filtered table
         */
        return function(table, filter, columnsDefinition) {

            var outputTable = [];
            if (table && filter && columnsDefinition) {
                // Check if there is any column filter to apply
                var filterColumns = isThereActiveFilterColums(filter);

                // Apply filter to each row
                angular.forEach(table, function(row) {
                    var passFilter = true;
                    if (filter.textFilter || filterColumns) {
                        // 1. Text filter (any columns)
                        if (filter.textFilter) {
                            passFilter = filterRowByText(row, filter.textFilter, columnsDefinition);
                        }
                        // 2. column filter
                        if (passFilter && filterColumns) {
                            passFilter = passFilter && filterRowByColumnFilters(row, filter.columns, columnsDefinition);
                        }
                    }

                    if (passFilter) {
                        outputTable.push(row);
                    }
                });
            } else {
                if (table && filter && filter.textFilter){
                    outputTable = $filter('filter')(table, filter.textFilter);
                } else {
                    //console.warn('To apply "filterStandartTable" filter, you have to pass a table, and a filter and a columnsDefinition objects', table, filter, columnsDefinition);
                    outputTable = table;
                }
            }

            return outputTable;
        };
    }
})();
