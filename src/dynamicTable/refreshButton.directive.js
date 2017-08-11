(function() {
    'use strict';

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
            template: require('html-loader!./refresh-button.html')
        };
    }
})();
