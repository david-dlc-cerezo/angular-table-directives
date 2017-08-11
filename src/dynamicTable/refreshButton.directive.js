(function() {
    'use strict';

    const path = require('path');

    module.exports = function(ngModule) {
        ngModule.directive('dynamicTableRefreshButton', dynamicTableRefreshButtonDirective);
    };

    /**
     * Dynamic Table Refresh Button Directive
     * @return {Object} Directive configuration object for <dynamic-table-refresh-button> directive
     */
    function dynamicTableRefreshButtonDirective() {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: path.resolve(__dirname, 'src/dynamicTable/refresh-button.html')
        };
    }
})();
