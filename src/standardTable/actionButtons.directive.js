(function() {
    'use strict';

    const path = require('path');

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
            templateUrl: path.resolve(__dirname, 'src/standardTable/action-buttons.html')
        };
    }
})();
