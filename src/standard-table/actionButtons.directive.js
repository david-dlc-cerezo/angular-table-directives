(function() {
    'use strict';

    module.exports = function(ngModule) {
        ngModule.directive('actionButtons', [
            actionButtons
        ]);
    };

    /**
     * Action Buttons Directive
     * @return {Object} Directive configuration object for <action-buttons> directive
     */
    function actionButtons() {
        return {
            restrict: 'E',
            scope: {
                actions: '=',
                rowData: '='
            },
            templateUrl: '/src/standard-table/action-buttons.html'
        };
    }
})();
